export default function PokemonList({ data: pokemons, loading }: { data: { results: { name: string }[] }, loading: boolean | undefined }) {
    return (
        <div className="w-full">
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-px bg-gray-200">
                    {pokemons.results.map((pokemon: { name: string }) => (
                        <div
                            key={pokemon.name}
                            className="aspect-square p-6 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center justify-center"
                        >
                            <span className="text-sm font-medium text-gray-700 capitalize text-center">
                                {pokemon.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}