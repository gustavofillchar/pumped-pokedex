import { Skeleton } from '@/components/ui/skeleton'

export default function PokemonDetailLoading() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>

            <div className="mb-8">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-5 w-16" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div className="text-center">
                        <Skeleton className="w-48 h-48 mx-auto mb-4" />
                        <div className="flex justify-center gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>

                    <div>
                        <Skeleton className="h-6 w-20 mb-3" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-28" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-8 h-4" />
                            <Skeleton className="flex-1 h-2" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <Skeleton className="h-6 w-16 mb-3" />
                <div className="flex flex-wrap gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="text-center">
                            <Skeleton className="w-24 h-24 mb-2" />
                            <Skeleton className="h-4 w-16 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="flex items-center justify-start gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <Skeleton className="w-20 h-20 mb-2" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            {index < 2 && <Skeleton className="h-6 w-6" />}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Skeleton className="h-6 w-16 mb-3" />
                <div className="border rounded-lg p-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="flex justify-between py-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
