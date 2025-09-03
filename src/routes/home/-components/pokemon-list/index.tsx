export default function PokemonList({ data: pokemons, loading }: { data: { results: { name: string }[] }, loading: boolean | undefined }) {
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                pokemons.results.map((pokemon: { name: string }) => (
                    <div key={pokemon.name}>{pokemon.name}</div>
                ))
            )}
        </div>
    )
}