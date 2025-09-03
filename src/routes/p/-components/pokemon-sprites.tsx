type PokemonSprites = {
    front_default: string
    front_shiny: string
    back_default: string
    back_shiny: string
}

type PokemonSpritesProps = {
    sprites: PokemonSprites
    name: string
}

export default function PokemonSprites({ sprites, name }: PokemonSpritesProps) {
    const spriteList = [
        { src: sprites.front_default, label: 'Front' },
        { src: sprites.front_shiny, label: 'Front Shiny' },
        { src: sprites.back_default, label: 'Back' },
        { src: sprites.back_shiny, label: 'Back Shiny' },
    ].filter(sprite => sprite.src)

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sprites</h3>
            <div className="flex flex-wrap gap-4">
                {spriteList.map(({ src, label }) => (
                    <div key={label} className="text-center">
                        <div className="w-24 h-24 border border-gray-200 rounded flex items-center justify-center">
                            <img
                                src={src}
                                alt={`${name} ${label.toLowerCase()}`}
                                className="w-20 h-20 object-contain"
                                width={80}
                                height={80}
                                loading="lazy"
                            />
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
