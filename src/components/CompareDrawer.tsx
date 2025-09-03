import { X, Trash2 } from 'lucide-react'
import { useCompare } from '@/contexts/CompareContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'

const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
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

const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
}

export default function CompareDrawer() {
    const { compareList, removeFromCompare, clearCompare, isDrawerOpen, setIsDrawerOpen } = useCompare()

    if (compareList.length === 0) return null

    const allStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']
    const maxStats = allStats.reduce((acc, statName) => {
        const maxStat = Math.max(...compareList.map(pokemon =>
            pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0
        ))
        acc[statName] = maxStat
        return acc
    }, {} as Record<string, number>)

    const slotsToShow = Array.from({ length: 3 }, (_, index) => compareList[index] || null)

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="max-h-[90vh] flex flex-col">
                <div className="mx-auto w-full max-w-6xl">
                    <DrawerHeader className="flex-shrink-0">
                        <DrawerTitle className="flex items-center justify-between">
                            <span>Compare Pokémon ({compareList.length}/3)</span>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={clearCompare}
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove All
                            </Button>
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex-1 overflow-auto px-4 pb-4">
                        <div className="grid gap-2 md:gap-6 grid-cols-3">
                            {slotsToShow.map((pokemon, index) =>
                                pokemon ? (
                                    <div key={pokemon.id} className="bg-white border border-gray-200 rounded-lg p-2 md:p-4">
                                        <div className="flex items-center justify-between mb-2 md:mb-3">
                                            <h3 className="font-semibold capitalize text-sm md:text-base truncate">{pokemon.name}</h3>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFromCompare(pokemon.id)}
                                            >
                                                <X className="w-3 h-3 md:w-4 md:h-4" />
                                            </Button>
                                        </div>

                                        <div className="flex justify-center mb-2 md:mb-4">
                                            <img
                                                src={pokemon.sprites.front_default}
                                                alt={`${pokemon.name} sprite`}
                                                className="w-12 h-12 md:w-20 md:h-20 object-contain"
                                                width={48}
                                                height={48}
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-1 mb-2 md:mb-4 justify-center">
                                            {pokemon.types.map((type) => (
                                                <Badge
                                                    key={type.type.name}
                                                    className={`${typeColors[type.type.name]} text-white capitalize text-xs px-1 py-0.5 md:px-2 md:py-1`}
                                                >
                                                    {type.type.name}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="space-y-2 md:space-y-3">
                                            {allStats.map((statName) => {
                                                const stat = pokemon.stats.find(s => s.stat.name === statName)
                                                const value = stat?.base_stat || 0
                                                const maxValue = maxStats[statName]
                                                const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0

                                                return (
                                                    <div key={statName}>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-xs md:text-sm font-medium text-gray-700">
                                                                {statNames[statName]}
                                                            </span>
                                                            <span className="text-xs md:text-sm font-bold">{value}</span>
                                                        </div>
                                                        <Progress value={percentage} className="h-1.5 md:h-2" />
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100">
                                            <div className="text-center">
                                                <span className="text-xs md:text-sm text-gray-500">Total</span>
                                                <div className="font-bold text-sm md:text-lg">
                                                    {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={`empty-${index}`} className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2 md:p-4 min-h-[200px] md:min-h-[300px]">
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <DrawerFooter className="flex-shrink-0">
                        <DrawerClose asChild>
                            <Button variant="outline" className="mx-auto max-w-xs">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
