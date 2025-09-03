import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
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
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Loading...</SheetTitle>
                </SheetHeader>
            </SheetContent>
        )
    }

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="capitalize">{moveName}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Type</h4>
                    <Badge variant="outline" className="capitalize">
                        {(moveData?.type as { name: string })?.name}
                    </Badge>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Power</h4>
                    <p>{(moveData?.power as number) || 'N/A'}</p>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Accuracy</h4>
                    <p>{(moveData?.accuracy as number) || 'N/A'}%</p>
                </div>

                <div>
                    <h4 className="font-medium mb-2">PP</h4>
                    <p>{(moveData?.pp as number) || 'N/A'}</p>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600">
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
                {selectedMove && (
                    <MoveDetails
                        moveName={selectedMove}
                    />
                )}
            </Sheet>
        </>
    )
}
