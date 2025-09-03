import { BarChart3 } from 'lucide-react'
import { useCompare } from '@/contexts/CompareContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CompareFloatingButton() {
    const { compareList, setIsDrawerOpen } = useCompare()

    if (compareList.length === 0) return null

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={() => setIsDrawerOpen(true)}
                className="relative shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
                aria-label={`Compare ${compareList.length} Pokémon`}
            >
                <BarChart3 className="w-5 h-5 mr-2" />
                Compare
                <Badge
                    className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[1.5rem] h-6 flex items-center justify-center"
                    variant="secondary"
                >
                    {compareList.length}
                </Badge>
            </Button>
        </div>
    )
}
