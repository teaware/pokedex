import useSWR from "swr";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import Link from "next/link";

function Pokemon({ name }) {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { data: pokemonSpecies } = useSWR(() => pokemon.species.url);

  const bgc = pokemonSpecies ? pokemonSpecies.color.name : "gray"; // background-color
  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : name;

  return (
    <div className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <article className={`rounded-md shadow-md w-full p-2 bg-${bgc}-500`}>
        {pokemon ? (
          <>
            <div className="poke-name flex justify-between items-center px-1">
              <div>
                <h2 className="text-lg capitalize mb-2">{theName}</h2>
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
              <div className="w-24 h-24 ml-1">
                <Link href={`/${name}`} scroll={false}>
                  <a>
                    <img src={pokemon.sprites.front_default} alt={name} />
                  </a>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="font-bold text-l capitalize">Loading {name}...</p>
        )}
      </article>
    </div>
  );
}

export default Pokemon;
