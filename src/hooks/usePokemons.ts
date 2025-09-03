import { useQuery } from '@tanstack/react-query'
import { pokemonService } from '@/services/api'

type PokemonResult = {
    name: string
    url: string
}

type PokemonResponse = {
    count: number
    results: PokemonResult[]
}

export const usePokemons = (page: number, query?: string, limit = 20) => {
    const offset = (page - 1) * limit

    return useQuery({
        queryKey: ['pokemons', { page, limit, query: query?.trim() || null }],
        queryFn: async (): Promise<PokemonResponse> => {
            if (query?.trim()) {
                const searchResult = await pokemonService.searchPokemons(query.trim())
                const results = (searchResult as PokemonResponse).results
                const paginatedResults = results.slice(offset, offset + limit)
                return {
                    count: results.length,
                    results: paginatedResults
                }
            }
            return pokemonService.getPokemons(limit, offset) as Promise<PokemonResponse>
        },
    })
}

export const usePokemonSearch = (query: string) => {
    return useQuery({
        queryKey: ['pokemon-search', query.trim()],
        queryFn: () => pokemonService.searchPokemons(query.trim()),
        enabled: query.trim().length > 0,
    })
}
