import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { pokemonService } from '@/services/api'

export const usePokemonDetail = (name: string, options?: Partial<UseQueryOptions>) => {
    return useQuery({
        queryKey: ['pokemon-detail', name],
        queryFn: () => pokemonService.getPokemonDetails(name),
        enabled: !!name,
        ...options,
    })
}

export const usePokemonSpecies = (name: string) => {
    return useQuery({
        queryKey: ['pokemon-species', name],
        queryFn: () => pokemonService.getPokemonSpecies(name),
        enabled: !!name,
    })
}

export const useEvolutionChain = (id?: number) => {
    return useQuery({
        queryKey: ['evolution-chain', id],
        queryFn: () => pokemonService.getEvolutionChain(id!),
        enabled: !!id,
    })
}

export const useMoveDetail = (name: string) => {
    return useQuery({
        queryKey: ['move-detail', name],
        queryFn: () => pokemonService.getMoveDetails(name),
        enabled: !!name && name.length > 0,
    })
}
