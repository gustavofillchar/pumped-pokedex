import { Link } from '@tanstack/react-router'
import { Plus, X } from 'lucide-react'
import { useCompare } from '@/contexts/CompareContext'
import { usePokemonDetail } from '@/hooks/usePokemonDetail'
import { Button } from '@/components/ui/button'

export default function PokemonList({ data: pokemons, loading }: { data: { results: { name: string; url: string }[] }, loading: boolean | undefined }) {

    function PokemonCard({ name, url }: { name: string; url: string }) {
        const pokemonId = url.split('/').filter(Boolean).pop()
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
        const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare()

        const { data: pokemonDetail } = usePokemonDetail(name)

        const inCompare = isInCompare(parseInt(pokemonId || '0'))
        const canAdd = compareList.length < 3 && pokemonDetail

        const handleToggleCompare = (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            if (inCompare) {
                removeFromCompare(parseInt(pokemonId || '0'))
            } else {
                if (!pokemonDetail || compareList.length >= 3) return

                const pokemonData = pokemonDetail as {
                    id: number
                    name: string
                    sprites: { front_default: string }
                    stats: Array<{ base_stat: number; stat: { name: string } }>
                    types: Array<{ type: { name: string } }>
                }

                addToCompare({
                    id: pokemonData.id,
                    name: pokemonData.name,
                    sprites: { front_default: pokemonData.sprites.front_default },
                    stats: pokemonData.stats,
                    types: pokemonData.types
                })
            }
        }

        return (
            <div className="relative group">
                <Link
                    to="/p/$name"
                    params={{ name }}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg block"
                >
                    <div
                        className="aspect-square rounded-lg border border-gray-100 p-4 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center gap-2"
                        role="button"
                        tabIndex={0}
                    >
                        <img
                            src={spriteUrl}
                            alt={`${name} sprite`}
                            className="w-16 h-16 object-contain"
                            loading="lazy"
                            width={64}
                            height={64}
                        />
                        <span className="text-xs font-medium text-gray-700 capitalize text-center">{name}</span>
                    </div>
                </Link>

                <Button
                    size="sm"
                    variant={inCompare ? "destructive" : "outline"}
                    className={`absolute top-2 right-2 transition-opacity p-1 h-8 w-8 ${inCompare
                        ? 'opacity-100'
                        : compareList.length > 0
                            ? 'opacity-100' + (!canAdd ? ' opacity-50 cursor-not-allowed' : '')
                            : 'opacity-0 group-hover:opacity-100' + (!canAdd ? ' opacity-50 cursor-not-allowed' : '')
                        }`}
                    onClick={handleToggleCompare}
                    disabled={!inCompare && !canAdd}
                    aria-label={inCompare ? `Remove ${name} from compare` : `Add ${name} to compare`}
                >
                    {inCompare ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full">
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
                    {pokemons.results.map((pokemon: { name: string; url: string }) => (
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}