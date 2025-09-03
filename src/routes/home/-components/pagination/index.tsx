import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface PokemonPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function PokemonPagination({ currentPage, totalPages, onPageChange }: PokemonPaginationProps) {
    const canGoPrevious = currentPage > 1
    const canGoNext = currentPage < totalPages

    return (
        <div className='mt-6 flex mx-auto w-full select-none'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
                            className={!canGoPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    onClick={() => onPageChange(pageNumber)}
                                    isActive={currentPage === pageNumber}
                                    className="cursor-pointer"
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => canGoNext && onPageChange(currentPage + 1)}
                            className={!canGoNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
