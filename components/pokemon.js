import useSWR from "swr";
import { Transition } from "@headlessui/react";
import { useState } from "react";

function Pokemon({ name }) {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { data: pokemonSpecies } = useSWR(() => pokemon.species.url);

  const bgc = pokemonSpecies ? pokemonSpecies.color.name : "gray"; // background-color
  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <article className={`rounded-md shadow-md w-full p-2 bg-${bgc}-500`}>
        {pokemon ? (
          <>
            <div
              className="poke-name flex justify-between items-center px-1"
              onClick={() => setIsOpen(!isOpen)}
            >
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
            <Transition
              className="poke-detail fixed inset-0"
              show={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Background overlay */}
              <Transition.Child
                className="w-full h-screen bg-black opacity-75"
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              ></Transition.Child>

              {/* Sliding sidebar */}
              <Transition.Child
                className="fixed inset-0 w-full h-screen flex justify-center items-center"
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div
                  className={`poke-detail p-2 h-screen w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-${bgc}-500`}
                  style={{ maxHeight: 812 }}
                >
                  <div className="justify-between items-center px-1">
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
              </Transition.Child>
            </Transition>
          </>
        ) : (
          <p className="font-bold text-l capitalize">Loading {name}...</p>
        )}
      </article>
    </div>
  );
}

export default Pokemon;
