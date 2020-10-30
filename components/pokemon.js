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
  const theName = pokemonSpecies ? lan[0].name : "未知";

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
                <img src={pokemon.sprites.front_default} />
              </div>
            </div>
            <Transition className="poke-detail fixed inset-0" show={isOpen}>
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
                  className={`poke-detail p-4 h-screen w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-${bgc}-500`}
                  style={{ maxHeight: 812 }}
                >
                  <div className="flex justify-between h-12 items-center px-1">
                    <div
                      className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl bg-gray-700"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      ←
                    </div>
                    <h2 className="font-mono text-2xl capitalize">{`${name}`}</h2>
                    <div className="font-mono text-lg">#{pokemon.id}</div>
                  </div>
                  <div className="text-center my-4">
                    <img
                      className="w-40 h-40 m-auto"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                      alt={pokemon.name}
                    />
                    <div className="text-5xl opacity-50">{theName}</div>
                    <div className="my-2">
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

                  <div className="rounded-md bg-white px-4 py-2 divide-y-2 divide-gray-500 divide-dotted">
                    <div className="grid grid-cols-2 py-2">
                      <div className="text-center">
                        <span>身高</span>: {pokemon.height / 10} m
                      </div>
                      <div className="text-center">
                        <span>體重</span>: {pokemon.weight / 10} kg
                      </div>
                    </div>
                    <div className="py-2">
                      {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name} className="py-1">
                          <span className="uppercase">{stat.stat.name}</span>:{" "}
                          {stat.base_stat}
                        </div>
                      ))}
                    </div>
                  </div>
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
