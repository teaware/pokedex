import useSWR from "swr";
import Link from "next/link";
import { BlurImage } from "./BlurImage";

export default function Pokemon({ name, id }) {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { data: pokemonSpecies } = useSWR(() => pokemon.species.url);

  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : name;

  return (
    <>
      {pokemon ? (
        <div className="rounded-md shadow-md w-full p-2 bg-white">
          <Link href={`/${id}`} scroll={false}>
            <a>
              <div className="poke-name flex justify-between items-center px-1">
                <div>
                  <h2 className="text-lg capitalize mb-1">{theName}</h2>
                  <div>
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="inline-block bg-gray-400 bg-opacity-25 rounded-lg px-2 text-sm text-gray-700 mr-2 mb-2"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-16 h-16 ml-1">
                  <BlurImage
                    // src={pokemon.sprites.front_default}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
                      "00" + pokemon.id
                    ).slice(-3)}.png`}
                    alt={name}
                    width="96"
                    height="96"
                  />
                </div>
              </div>
            </a>
          </Link>
        </div>
      ) : (
        <div className="h-20" />
      )}
    </>
  );
}
