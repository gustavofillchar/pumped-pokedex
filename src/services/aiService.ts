import OpenAI from 'openai';

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

export async function generatePokemonComparison(pokemons: ComparePokemon[]): Promise<string> {
    if (pokemons.length === 0) return "";

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });

        const pokemonData = pokemons.map(pokemon => ({
            name: pokemon.name,
            types: pokemon.types.map(t => t.type.name),
            stats: pokemon.stats.reduce((acc, stat) => ({
                ...acc,
                [stat.stat.name]: stat.base_stat
            }), {} as Record<string, number>),
            totalStats: pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
        }));

        const prompt = pokemons.length === 1
            ? `Analyze this Pokémon and provide an interesting and short summary (maximum 2 sentences):
               Name: ${pokemonData[0].name}
               Types: ${pokemonData[0].types.join(', ')}
               Total Stats: ${pokemonData[0].totalStats}
               Detailed Stats: ${JSON.stringify(pokemonData[0].stats)}
               
               Be creative and mention strengths or interesting characteristics.`
            : `Compare these ${pokemons.length} Pokémon and provide an interesting and short summary (maximum 2 sentences):
               ${pokemonData.map((p, i) => `
               ${i + 1}. ${p.name}
                  - Types: ${p.types.join(', ')}
                  - Total Stats: ${p.totalStats}
                  - Stats: ${JSON.stringify(p.stats)}
               `).join('')}
               
               Identify which is better in what aspect, interesting differences or tactical advantages.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
            temperature: 0.7
        });

        return response.choices[0]?.message?.content?.trim() || 'No response generated.';
    } catch (error) {
        console.warn('Error generating AI comparison, using fallback:', error);
        return generateFallbackSummary(pokemons);
    }
}

function generateFallbackSummary(pokemons: ComparePokemon[]): string {
    if (pokemons.length === 0) return "";

    if (pokemons.length === 1) {
        const pokemon = pokemons[0];
        const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
        const types = pokemon.types.map(t => t.type.name).join('/');
        return `${pokemon.name} (${types}) has ${totalStats} total base stats.`;
    }

    const pokemonTotals = pokemons.map(pokemon => ({
        name: pokemon.name,
        total: pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
        types: pokemon.types.map(t => t.type.name).join('/')
    }));

    const strongest = pokemonTotals.reduce((max, current) =>
        current.total > max.total ? current : max
    );

    const weakest = pokemonTotals.reduce((min, current) =>
        current.total < min.total ? current : min
    );

    if (strongest.total === weakest.total) {
        return `All have similar stats (${strongest.total} points).`;
    }

    return `${strongest.name} (${strongest.types}) leads with ${strongest.total} stats, while ${weakest.name} (${weakest.types}) has ${weakest.total}.`;
}
