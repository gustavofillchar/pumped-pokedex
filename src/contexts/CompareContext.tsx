import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type ComparePokemon = {
    id: number
    name: string
    sprites: {
        front_default: string
    }
    stats: Array<{
        base_stat: number
        stat: {
            name: string
        }
    }>
    types: Array<{
        type: {
            name: string
        }
    }>
}

type CompareContextType = {
    compareList: ComparePokemon[]
    addToCompare: (pokemon: ComparePokemon) => void
    removeFromCompare: (pokemonId: number) => void
    clearCompare: () => void
    isInCompare: (pokemonId: number) => boolean
    isDrawerOpen: boolean
    setIsDrawerOpen: (open: boolean) => void
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const STORAGE_KEY = 'pokemon-compare-list'
const MAX_COMPARE = 3

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<ComparePokemon[]>([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                setCompareList(JSON.parse(stored))
            } catch (error) {
                console.error('Failed to parse stored compare list:', error)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList))
    }, [compareList])

    const addToCompare = (pokemon: ComparePokemon) => {
        setCompareList(prev => {
            if (prev.find(p => p.id === pokemon.id)) return prev
            if (prev.length >= MAX_COMPARE) return prev
            return [...prev, pokemon]
        })
    }

    const removeFromCompare = (pokemonId: number) => {
        setCompareList(prev => prev.filter(p => p.id !== pokemonId))
    }

    const clearCompare = () => {
        setCompareList([])
    }

    const isInCompare = (pokemonId: number) => {
        return compareList.some(p => p.id === pokemonId)
    }

    return (
        <CompareContext.Provider value={{
            compareList,
            addToCompare,
            removeFromCompare,
            clearCompare,
            isInCompare,
            isDrawerOpen,
            setIsDrawerOpen
        }}>
            {children}
        </CompareContext.Provider>
    )
}

export function useCompare() {
    const context = useContext(CompareContext)
    if (context === undefined) {
        throw new Error('useCompare must be used within a CompareProvider')
    }
    return context
}
