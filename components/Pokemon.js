import Link from "next/link";
import { BlurImage } from "./BlurImage";
import { useQuery } from "react-query";
import fetch from "../lib/fetch";

export default function Pokemon({ name, id }) {
  const { data: pokemon } = useQuery(["pokemon", id], () =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  );
  const speciesUrl = pokemon?.species.url;
  const { data: pokemonSpecies } = useQuery(
    ["pokemonSpecies", speciesUrl],
    () => fetch(speciesUrl),
    {
      // The query will not execute until the speciesUrl exists
      enabled: !!speciesUrl,
    }
  );

  const names = pokemonSpecies ? pokemonSpecies.names : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : name;

  return (
    <>
      {pokemon ? (
        <div className="rounded-md shadow-md w-full p-2 bg-white">
          <Link href={`/pokemon/${id}`} scroll={false}>
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
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
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
        <div className="rounded-md shadow-md w-full p-2 bg-gray-200">
          <div className="flex justify-between items-center px-1">
            <div>
              <div className="w-20 h-4 bg-gray-400 rounded-md mb-2"></div>
              <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
            </div>
            <div className="w-16 h-16 ml-1 bg-gray-400 rounded-sm"></div>
          </div>
        </div>
      )}
    </>
  );
}
