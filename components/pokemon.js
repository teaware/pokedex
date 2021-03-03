import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

function Pokemon({ name, id }) {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { data: pokemonSpecies } = useSWR(() => pokemon.species.url);

  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : name;

  return (
    <div className="rounded-md shadow-md w-full p-2 bg-white">
      {pokemon ? (
        <Link href={`/${id}`} scroll={false}>
          <a>
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
              <div className="w-16 h-16 ml-1">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={name}
                  width="64"
                  height="64"
                />
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <p className="font-bold text-l capitalize">Loading {name}...</p>
      )}
    </div>
  );
}

export default Pokemon;
