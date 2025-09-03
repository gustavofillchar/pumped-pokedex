import { Link } from '@tanstack/react-router'

export default function PokemonList({ data: pokemons, loading }: { data: { results: { name: string; url: string }[] }, loading: boolean | undefined }) {

    function PokemonCard({ name, url }: { name: string; url: string }) {
        const pokemonId = url.split('/').filter(Boolean).pop()
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

        return (
            <Link to="/p/$name" params={{ name }}>
                <div className="aspect-square rounded-lg border border-gray-100 p-4 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center gap-2">
                    <img
                        src={spriteUrl}
                        alt={name}
                        className="w-16 h-16 object-contain"
                        loading="lazy"
                    />
                    <span className="text-xs font-medium text-gray-700 capitalize text-center">{name}</span>
                </div>
            </Link>
        )
    }

    return (
        <div className="w-full">
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
                    {pokemons.results.map((pokemon: { name: string; url: string }) => (
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}