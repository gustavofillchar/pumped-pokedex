import { Progress } from '@/components/ui/progress'

type PokemonStat = {
    base_stat: number
    stat: {
        name: string
    }
}

type PokemonStatsProps = {
    stats: PokemonStat[]
}

const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed'
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
    const maxStat = 255

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                {stats.map(({ stat, base_stat }) => (
                    <div key={stat.name} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium text-right">
                            {statNames[stat.name] || stat.name}
                        </div>
                        <div className="w-8 text-sm text-center">
                            {base_stat}
                        </div>
                        <div className="flex-1">
                            <Progress
                                value={(base_stat / maxStat) * 100}
                                className="h-2"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
