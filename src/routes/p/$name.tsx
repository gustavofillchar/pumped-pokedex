import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Plus, Check } from 'lucide-react'
import { usePokemonDetail, usePokemonSpecies, useEvolutionChain } from '@/hooks/usePokemonDetail'
import { useCompare } from '@/contexts/CompareContext'
import PokemonTypes from './-components/pokemon-types'
import PokemonStats from './-components/pokemon-stats'
import PokemonSprites from './-components/pokemon-sprites'
import EvolutionChain from './-components/evolution-chain'
import PokemonMoves from './-components/pokemon-moves'
import PokemonDetailLoading from './-components/pokemon-detail-loading'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type EvolutionStage = {
    species: {
        name: string
        url: string
    }
    evolves_to: EvolutionStage[]
}

export const Route = createFileRoute('/p/$name')({
    component: RouteComponent,
})

function RouteComponent() {
    const { name } = Route.useParams()
    const { addToCompare, isInCompare, compareList } = useCompare()

    const { data: pokemon, isLoading: pokemonLoading } = usePokemonDetail(name)
    const { data: species } = usePokemonSpecies(name)
    const speciesData = species as { evolution_chain?: { url?: string } }
    const evolutionChainId = speciesData?.evolution_chain?.url?.split('/').filter(Boolean).pop()
    const { data: evolutionChain } = useEvolutionChain(evolutionChainId ? parseInt(evolutionChainId) : undefined)

    if (pokemonLoading) {
        return <PokemonDetailLoading />
    }

    if (!pokemon) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="text-center">Pokémon not found</div>
            </div>
        )
    }

    const pokemonData = pokemon as {
        name: string
        id: number
        sprites: {
            front_default: string
            front_shiny: string
            back_default: string
            back_shiny: string
        }
        types: Array<{ type: { name: string } }>
        abilities: Array<{ ability: { name: string }; is_hidden: boolean }>
        stats: Array<{ base_stat: number; stat: { name: string } }>
        moves: Array<{
            move: { name: string; url: string }
            version_group_details: Array<{
                level_learned_at: number
                move_learn_method: { name: string }
                version_group: { name: string }
            }>
        }>
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/home">Pokédex</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="capitalize">{pokemonData.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold capitalize mb-2">{pokemonData.name}</h1>
                    <p className="text-gray-600">#{pokemonData.id.toString().padStart(3, '0')}</p>
                </div>

                <Button
                    variant={isInCompare(pokemonData.id) ? "default" : "outline"}
                    className={isInCompare(pokemonData.id) ? 'bg-green-500 hover:bg-green-600' : ''}
                    onClick={() => {
                        if (compareList.length >= 3 && !isInCompare(pokemonData.id)) return
                        addToCompare({
                            id: pokemonData.id,
                            name: pokemonData.name,
                            sprites: { front_default: pokemonData.sprites.front_default },
                            stats: pokemonData.stats,
                            types: pokemonData.types
                        })
                    }}
                    disabled={compareList.length >= 3 && !isInCompare(pokemonData.id)}
                    aria-label={isInCompare(pokemonData.id) ? `${pokemonData.name} added to compare` : `Add ${pokemonData.name} to compare`}
                >
                    {isInCompare(pokemonData.id) ? (
                        <>
                            <Check className="w-4 h-4 mr-2" />
                            Added to Compare
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Compare
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-48 h-48 mx-auto flex items-center justify-center mb-4">
                            <img
                                src={pokemonData.sprites.front_default}
                                alt={pokemonData.name}
                                className="w-40 h-40 object-contain"
                                width={160}
                                height={160}
                            />
                        </div>
                        <PokemonTypes types={pokemonData.types} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Abilities</h3>
                        <div className="flex flex-wrap gap-2">
                            {pokemonData.abilities.map((ability) => (
                                <Badge
                                    key={ability.ability.name}
                                    variant="secondary"
                                    className="capitalize"
                                >
                                    {ability.ability.name.replace('-', ' ')}
                                    {ability.is_hidden && ' (Hidden)'}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <PokemonStats stats={pokemonData.stats} />
                </div>
            </div>

            <div className="mb-8">
                <PokemonSprites sprites={pokemonData.sprites} name={pokemonData.name} />
            </div>

            {evolutionChain ? (
                <div className="mb-8">
                    <EvolutionChain chain={(evolutionChain as { chain: EvolutionStage }).chain} />
                </div>
            ) : null}

            <div>
                <PokemonMoves moves={pokemonData.moves} />
            </div>
        </div>
    )
}
