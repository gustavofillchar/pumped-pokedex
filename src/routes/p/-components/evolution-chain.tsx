type EvolutionStage = {
    species: {
        name: string
        url: string
    }
    evolves_to: EvolutionStage[]
}

type EvolutionChainProps = {
    chain: EvolutionStage
}

function PokemonCard({ pokemon }: { pokemon: EvolutionStage }) {
    const speciesUrl = pokemon.species.url || ''
    const speciesId = speciesUrl.split('/').filter(Boolean).pop()
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`

    return (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <img
                    src={spriteUrl}
                    alt={pokemon.species.name}
                    className="w-16 h-16 object-contain"
                    width={64}
                    height={64}
                    loading="lazy"
                />
            </div>
            <span className="text-sm font-medium capitalize">{pokemon.species.name}</span>
        </div>
    )
}

export default function EvolutionChain({ chain }: EvolutionChainProps) {
    const evolutions = []

    let current = chain
    evolutions.push(current)

    while (current.evolves_to.length > 0) {
        current = current.evolves_to[0]
        evolutions.push(current)
    }

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold">Evolution Chain</h3>
            <div className="flex items-center justify-center gap-4">
                {evolutions.map((evolution, index) => (
                    <div key={evolution.species.name} className="flex items-center gap-4">
                        <PokemonCard pokemon={evolution} />
                        {index < evolutions.length - 1 && (
                            <div className="text-gray-400 text-xl">→</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
