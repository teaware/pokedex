import useSWR from "swr";
import Link from "next/link";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

function Pokemon({ expanded, setExpanded, name }) {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { data: pokemonSpecies } = useSWR(() => pokemon.species.url);

  const bgc = pokemonSpecies ? pokemonSpecies.color.name : "gray"; // background-color
  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : name;

  const isOpen = name === expanded;

  return (
    <AnimateSharedLayout type="crossfade">
      <div className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <article className={`rounded-md shadow-md w-full p-2 bg-${bgc}-500`}>
          {pokemon ? (
            <div
              className="poke-name flex justify-between items-center px-1"
              onClick={() => setExpanded(isOpen ? false : name)}
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
                <img src={pokemon.sprites.front_default} alt={name} />
              </div>
            </div>
          ) : (
            <p className="font-bold text-l capitalize">Loading {name}...</p>
          )}
        </article>

        {pokemon ? (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial="exit"
                animate="enter"
                exit="exit"
                className="fixed inset-0"
              >
                <div className="w-full h-screen bg-black opacity-75"></div>
                <div className="fixed inset-0 w-full h-screen flex justify-center items-center">
                  <motion.div
                    className={`poke-detail p-4 h-screen w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto bg-${bgc}-500`}
                    style={{ maxHeight: 812 }}
                    variants={backVariants}
                  >
                    <div className="flex justify-between h-12 items-center px-1">
                      <div className="font-mono text-lg">
                        #{("00" + pokemon.id).slice(-3)}
                      </div>
                      <h2 className="font-mono text-2xl capitalize">
                        {pokemon.name}
                      </h2>
                      <div
                        className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl bg-gray-700"
                        onClick={() => setExpanded(isOpen ? false : name)}
                      >
                        x
                      </div>
                    </div>
                    <div className="text-center my-4">
                      <div className="w-40 h-40 m-auto">
                        <motion.img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                          alt={pokemon.name}
                          variants={imageVariants}
                        />
                      </div>
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
                    <motion.div
                      className="rounded-md bg-white px-4 py-2 divide-y-2 divide-gray-500 divide-dotted"
                      variants={textVariants}
                    >
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
                    </motion.div>
                    <div className="flex justify-between h-12 items-center px-1 my-4">
                      <Link href="">
                        <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl bg-gray-700">
                          ←
                        </a>
                      </Link>
                      <Link href="">
                        <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl bg-gray-700">
                          →
                        </a>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <p>We lost connection</p>
        )}
      </div>
    </AnimateSharedLayout>
  );
}

export default Pokemon;

const easing = [0.175, 0.85, 0.42, 0.96];

const imageVariants = {
  exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    delay: 0.5,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

const textVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    delay: 0.5,
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing },
  },
};

const backVariants = {
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};
