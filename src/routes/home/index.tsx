import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import PokemonPagination from './-components/pagination'
import PokemonList from './-components/pokemon-list'
import { Input } from '@/components/ui/input'
import { usePokemons } from '@/hooks/usePokemons'
import { usePokemonSearchParams } from '@/hooks/usePokemonSearch'

type HomeSearch = {
    q?: string
    page?: number
}

export const Route = createFileRoute('/home/')({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): HomeSearch => ({
        q: typeof search.q === 'string' ? search.q : undefined,
        page: typeof search.page === 'number' && search.page >= 1 ? search.page : 1,
    }),
})



function RouteComponent() {
    const { searchInput, setSearchInput, debouncedSearch, currentPage, handlePageChange } = usePokemonSearchParams()
    const limit = 20

    const { data, isLoading, error, isFetching } = usePokemons(currentPage, debouncedSearch, limit)

    const totalPages = useMemo(() =>
        data ? Math.ceil(data.count / limit) : 0,
        [data, limit]
    )

    const showEmptyState = useMemo(() =>
        !isLoading && data && data.results.length === 0 && debouncedSearch,
        [isLoading, data, debouncedSearch]
    )

    const showPagination = useMemo(() =>
        !isLoading && data && data.results.length > 0,
        [isLoading, data]
    )

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="text-center py-12 text-red-500">
                    Error loading Pokémon. Please try again.
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-md"
                    disabled={isFetching}
                />
                {isFetching && !isLoading && (
                    <div className="text-sm text-gray-500 mt-2">Searching...</div>
                )}
            </div>

            <PokemonList
                loading={isLoading}
                data={data || { results: [] }}
            />

            {showPagination && (
                <PokemonPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {showEmptyState && (
                <div className="text-center py-12 text-gray-500">
                    No Pokémon found for "{debouncedSearch}"
                </div>
            )}
        </div>
    )
}
