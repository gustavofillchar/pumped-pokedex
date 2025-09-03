import { useState, useEffect } from 'react'
import { generatePokemonComparison } from '../services/aiService'
import { Skeleton } from '@/components/ui/skeleton'

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

export default function AISummary({ compareList }: AISummaryProps) {
    const [summary, setSummary] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (compareList.length === 0) {
            setSummary('')
            return
        }

        const generateSummary = async () => {
            setIsLoading(true)
            try {
                const result = await generatePokemonComparison(compareList)
                setSummary(result)
            } catch (error) {
                console.error('Error generating summary:', error)
                setSummary('Error generating comparison.')
            } finally {
                setIsLoading(false)
            }
        }

        generateSummary()
    }, [compareList])

    if (compareList.length === 0) return null

    return (
        <div>
            <div className="flex items-center gap-2">
                {isLoading ? (
                    <Skeleton className="h-4 w-full" />
                ) : (
                    <p className="text-sm text-gray-600">{summary}</p>
                )}
            </div>
        </div>
    )
}