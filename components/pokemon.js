import useSWR from "swr";

function Pokemon({ name }) {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { data: pokemonSpecies } = useSWR(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );

  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });

  return (
    <div className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <article
        className={`rounded-md shadow-md w-full px-2 bg-${
          pokemonSpecies ? pokemonSpecies.color.name : "gray"
        }-500`}
      >
        {pokemon ? (
          <>
            <div className="poke-name flex justify-between items-center p-1">
              <div>
                <h2 className="text-lg capitalize mb-2">
                  {pokemonSpecies ? lan[0].name : `${name}`}
                </h2>
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
                <img src={pokemon.sprites.front_default} />
              </div>
            </div>
            <div className="poke-detail hidden">
              <ul>
                <li>
                  <span>身高</span>: {pokemon.height / 10} m
                </li>
                <li>
                  <span>體重</span>: {pokemon.weight / 10} kg
                </li>
              </ul>
              <h3 className="text-lg">Stats</h3>
              <ul className="flex justify-start items-baseline flex-wrap">
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name} className="w-3/6">
                    <span className="capitalize">{stat.stat.name}</span>:{" "}
                    {stat.base_stat}
                  </li>
                ))}
              </ul>
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
