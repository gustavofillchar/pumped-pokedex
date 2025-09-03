import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useMoveDetail } from '@/hooks/usePokemonDetail'

type Move = {
    move: {
        name: string
        url: string
    }
    version_group_details: Array<{
        level_learned_at: number
        move_learn_method: {
            name: string
        }
        version_group: {
            name: string
        }
    }>
}

type PokemonMovesProps = {
    moves: Move[]
}

function MoveDetails({ moveName }: { moveName: string }) {
    const { data: move, isLoading } = useMoveDetail(moveName)
    const moveData = move as Record<string, unknown>

    if (isLoading) {
        return (
            <SheetContent className="p-6">
                <SheetHeader className="pb-6">
                    <Skeleton className="h-7 w-48" />
                </SheetHeader>

                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-4 w-12 mb-3" />
                        <Skeleton className="h-6 w-16" />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Skeleton className="h-4 w-8" />
                                <Skeleton className="h-4 w-6" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>
                    </div>

                    <div>
                        <Skeleton className="h-4 w-20 mb-3" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>
            </SheetContent>
        )
    }

    const power = moveData?.power as number
    const accuracy = moveData?.accuracy as number
    const pp = moveData?.pp as number

    return (
        <SheetContent className="p-6">
            <SheetHeader className="pb-6">
                <SheetTitle className="capitalize text-xl">{moveName.replace('-', ' ')}</SheetTitle>
            </SheetHeader>

            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3">Type</h4>
                    <Badge variant="outline" className="capitalize">
                        {(moveData?.type as { name: string })?.name}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Power</h4>
                            <span className="text-sm font-medium">{power || 'N/A'}</span>
                        </div>
                        {power && (
                            <Progress value={(power / 150) * 100} className="h-2" />
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Accuracy</h4>
                            <span className="text-sm font-medium">{accuracy ? `${accuracy}%` : 'N/A'}</span>
                        </div>
                        {accuracy && (
                            <Progress value={accuracy} className="h-2" />
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500">PP</h4>
                            <span className="text-sm font-medium">{pp || 'N/A'}</span>
                        </div>
                        {pp && (
                            <Progress value={(pp / 40) * 100} className="h-2" />
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3">Description</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {((moveData?.flavor_text_entries as Array<{ flavor_text: string; language: { name: string } }>)
                            ?.find(entry => entry.language.name === 'en')?.flavor_text) || 'No description available'}
                    </p>
                </div>
            </div>
        </SheetContent>
    )
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
    const [selectedMove, setSelectedMove] = useState<string | null>(null)

    const processedMoves = moves.map(move => {
        const redBlue = move.version_group_details.find(detail =>
            detail.version_group.name === 'red-blue'
        )
        const latest = move.version_group_details[0]
        const versionDetail = redBlue || latest

        return {
            name: move.move.name,
            level: versionDetail?.level_learned_at || 0,
            method: versionDetail?.move_learn_method.name || 'unknown'
        }
    }).sort((a, b) => a.level - b.level)

    return (
        <>
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Moves</h3>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Move</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Level</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {processedMoves.map((move) => (
                                <TableRow
                                    key={move.name}
                                    className="cursor-pointer hover:bg-gray-50"
                                    onClick={() => setSelectedMove(move.name)}
                                >
                                    <TableCell className="font-medium capitalize">
                                        {move.name.replace('-', ' ')}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">
                                            {move.method.replace('-', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {move.level === 0 ? '—' : move.level}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Sheet open={!!selectedMove} onOpenChange={() => setSelectedMove(null)}>
                <MoveDetails
                    moveName={selectedMove || ''}
                />
            </Sheet>
        </>
    )
}
