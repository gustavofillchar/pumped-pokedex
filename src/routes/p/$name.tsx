import { createFileRoute } from '@tanstack/react-router'
import { usePokemonDetail, usePokemonSpecies, useEvolutionChain } from '@/hooks/usePokemonDetail'
import PokemonTypes from './-components/pokemon-types'
import PokemonStats from './-components/pokemon-stats'
import PokemonSprites from './-components/pokemon-sprites'
import EvolutionChain from './-components/evolution-chain'

export const Route = createFileRoute('/p/$name')({
    component: RouteComponent,
})

function RouteComponent() {
    const { name } = Route.useParams()

    const { data: pokemon, isLoading: pokemonLoading } = usePokemonDetail(name)
    const { data: species } = usePokemonSpecies(name)
    const speciesData = species as any
    const evolutionChainId = speciesData?.evolution_chain?.url?.split('/').filter(Boolean).pop()
    const { data: evolutionChain } = useEvolutionChain(evolutionChainId ? parseInt(evolutionChainId) : undefined)

    if (pokemonLoading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="text-center">Loading...</div>
            </div>
        )
    }

    if (!pokemon) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="text-center">Pokémon not found</div>
            </div>
        )
    }

    const pokemonData = pokemon as any

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold capitalize mb-2">{pokemonData.name}</h1>
                <p className="text-gray-600">#{pokemonData.id.toString().padStart(3, '0')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
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
                            {pokemonData.abilities.map((ability: any) => (
                                <span
                                    key={ability.ability.name}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize"
                                >
                                    {ability.ability.name.replace('-', ' ')}
                                    {ability.is_hidden && ' (Hidden)'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <PokemonStats stats={pokemonData.stats} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PokemonSprites sprites={pokemonData.sprites} name={pokemonData.name} />

                {evolutionChain && (
                    <EvolutionChain chain={(evolutionChain as any).chain} />
                )}
            </div>
        </div>
    )
}
