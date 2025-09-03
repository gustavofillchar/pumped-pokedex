import ky from 'ky'

export const api = ky.create({
    prefixUrl: 'https://pokeapi.co/api/v2',
})

export const pokemonService = {
    async getPokemons(limit = 50, offset = 0): Promise<unknown> {
        return api.get(`pokemon?limit=${limit}&offset=${offset}`).json()
    },

    async searchPokemons(query: string): Promise<unknown> {
        const allPokemons = await api.get(`pokemon?limit=1500`).json() as { results: { name: string; url: string }[] }
        const filtered = allPokemons.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        )
        return {
            count: filtered.length,
            results: filtered
        }
    },

    async getPokemonDetails(nameOrId: string): Promise<unknown> {
        return api.get(`pokemon/${nameOrId}`).json()
    },

    async getPokemonSpecies(nameOrId: string): Promise<unknown> {
        return api.get(`pokemon-species/${nameOrId}`).json()
    },

    async getEvolutionChain(id: number): Promise<unknown> {
        return api.get(`evolution-chain/${id}`).json()
    },

    async getMoveDetails(nameOrId: string): Promise<unknown> {
        return api.get(`move/${nameOrId}`).json()
    }
}
