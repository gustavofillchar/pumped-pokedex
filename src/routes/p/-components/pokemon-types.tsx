import { Badge } from '@/components/ui/badge'

type PokemonType = {
    type: {
        name: string
    }
}

type PokemonTypesProps = {
    types: PokemonType[]
}

const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
}

export default function PokemonTypes({ types }: PokemonTypesProps) {
    return (
        <div className="flex gap-2">
            {types.map(({ type }) => (
                <Badge
                    key={type.name}
                    className={`${typeColors[type.name] || 'bg-gray-400'} text-white capitalize`}
                >
                    {type.name}
                </Badge>
            ))}
        </div>
    )
}
