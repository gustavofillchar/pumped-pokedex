import ky from 'ky'

export const api = ky.create({
    prefixUrl: 'https://pokeapi.co/api/v2',
})

export const pokemonService = {
    async getPokemons(limit = 50, offset = 0): Promise<unknown> {
        return api.get(`pokemon?limit=${limit}&offset=${offset}`).json()
    },
}
