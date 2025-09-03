export default function PokemonList({ data: pokemons }: { data: { results: { name: string }[] } }) {
    return (
        <div>
            {pokemons.results.map((pokemon: { name: string }) => (
                <div key={pokemon.name}>{pokemon.name}</div>
            ))}
        </div>
    )
}