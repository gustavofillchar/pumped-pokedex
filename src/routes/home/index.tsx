import { useState } from 'react'
import { pokemonService } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import PokemonPagination from './-components/pagination'
import PokemonList from './-components/pokemon-list'

export const Route = createFileRoute('/home/')({
    component: RouteComponent,
})

const usePokemons = (page: number, limit = 20) => {
    const offset = (page - 1) * limit
    const { data, isLoading: loading, error } = useQuery({
        queryKey: ['pokemons', page, limit],
        queryFn: () => pokemonService.getPokemons(limit, offset),
    })
    return {
        data: data as { count: number; results: unknown[] },
        loading,
        error
    }
}

function RouteComponent() {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 20
    const { data, loading } = usePokemons(currentPage, limit)

    const totalPages = data ? Math.ceil(data.count / limit) : 0

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto">
            <PokemonList loading={loading} data={data as { results: { name: string }[] }} />

            <PokemonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
