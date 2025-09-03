import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useDebounce } from './useDebounce'

type SearchParams = {
    q?: string
    page?: number
}

export const usePokemonSearchParams = () => {
    const navigate = useNavigate()
    const { q, page } = useSearch({ from: '/home/' }) as SearchParams
    const [searchInput, setSearchInput] = useState(q || '')
    const debouncedSearch = useDebounce(searchInput, 300)
    const lastNavigatedRef = useRef<{ q?: string; page?: number }>({ q, page })

    const navigateToSearch = useCallback((params: SearchParams) => {
        const normalizedParams = {
            q: params.q?.trim() || undefined,
            page: params.page === 1 ? undefined : params.page
        }

        const lastNavigation = lastNavigatedRef.current
        const hasActualChanges =
            normalizedParams.q !== (lastNavigation.q || undefined) ||
            (normalizedParams.page || 1) !== (lastNavigation.page || 1)

        if (hasActualChanges) {
            lastNavigatedRef.current = { q: normalizedParams.q, page: normalizedParams.page || 1 }
            navigate({
                to: '/home',
                search: normalizedParams,
                replace: true,
            })
        }
    }, [navigate])

    useEffect(() => {
        if (debouncedSearch !== (q || '')) {
            navigateToSearch({
                q: debouncedSearch || undefined,
                page: 1
            })
        }
    }, [debouncedSearch, q, navigateToSearch])

    const handlePageChange = useCallback((newPage: number) => {
        navigateToSearch({
            q: debouncedSearch || undefined,
            page: newPage
        })
    }, [debouncedSearch, navigateToSearch])

    return {
        searchInput,
        setSearchInput,
        debouncedSearch,
        currentPage: page || 1,
        handlePageChange,
    }
}
