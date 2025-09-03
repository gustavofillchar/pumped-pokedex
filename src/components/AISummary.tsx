import { Sparkles } from 'lucide-react'

type ComparePokemon = {
    id: number
    name: string
    sprites: {
        front_default: string
    }
    stats: Array<{
        base_stat: number
        stat: {
            name: string
        }
    }>
    types: Array<{
        type: {
            name: string
        }
    }>
}

interface AISummaryProps {
    compareList: ComparePokemon[]
}

function generateSummary(pokemons: ComparePokemon[]): string {
    if (pokemons.length === 0) return ""

    if (pokemons.length === 1) {
        const pokemon = pokemons[0]
        const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
        return `${pokemon.name} has ${totalStats} total base stats.`
    }

    const pokemonTotals = pokemons.map(pokemon => ({
        name: pokemon.name,
        total: pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
    }))

    const strongest = pokemonTotals.reduce((max, current) =>
        current.total > max.total ? current : max
    )

    return `${strongest.name} has the highest total stats (${strongest.total}).`
}

export default function AISummary({ compareList }: AISummaryProps) {
    if (compareList.length === 0) return null

    const summary = generateSummary(compareList)

    return (
        <div className="bg-gray-50 border rounded-lg p-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{summary}</p>
            </div>
        </div>
    )
}