import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../components/Container";
import { BlurImage } from "../components/BlurImage";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
  );
  const posts = await res.json();

  const paths = posts.results.map((post) => ({
    params: { id: post.url.split("pokemon/")[1].split("/")[0] },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();

  const res2 = await fetch(pokemon.species.url);
  const pokemonSpecies = await res2.json();

  // Pass data to the page via props
  return { props: { pokemon, pokemonSpecies } };
}

function Post({ pokemon, pokemonSpecies }) {
  const bgc = pokemonSpecies
    ? "bg-" + pokemonSpecies.color.name + "-400"
    : "bg-gray-400"; // background-color
  const names = pokemonSpecies ? pokemonSpecies.names : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : pokemon.name;

  return (
    <Container title={theName} description="宝可梦的描述">
      <motion.div initial="initial" animate="enter" exit="exit">
        <div className="h-screen w-full">
          <div className="fixed inset-0 flex w-full justify-between h-20 px-4 pt-safe-top items-center">
            <Link href="/" scroll={false}>
              <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-2xl">
                <HomeIcon className="w-6 h-6" />
              </a>
            </Link>
            {/* <h2 className="font-mono text-2xl capitalize">{pokemon.name}</h2> */}
            <div className="font-mono text-lg">
              #{("00" + pokemon.id).slice(-3)}
            </div>
          </div>

          <div className="h-full flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.1, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="xs:block hidden text-white ml-4"
            >
              {pokemon.id === 1 ? (
                <button
                  disabled
                  className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600 opacity-50 cursor-not-allowed"
                >
                  <LeftIcon />
                </button>
              ) : (
                <Link href={`/${pokemon.id - 1}`}>
                  <a className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600">
                    <LeftIcon />
                  </a>
                </Link>
              )}
            </motion.div>

            <motion.div
              variants={stagger}
              className="pokemon w-full sm:w-1/2 max-w-lg mx-4"
            >
              <motion.div
                className={`poke-img rounded-t-md text-center pt-28 pb-1 transition duration-75 ${bgc} relative`}
                variants={fadeInUp}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.1, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="xs:hidden absolute top-4 left-4 text-white"
                >
                  {pokemon.id === 1 ? (
                    <button
                      disabled
                      className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600 opacity-50 cursor-not-allowed"
                    >
                      <LeftIcon />
                    </button>
                  ) : (
                    <Link href={`/${pokemon.id - 1}`}>
                      <a className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600">
                        <LeftIcon />
                      </a>
                    </Link>
                  )}
                </motion.div>
                <motion.div
                  className="absolute -top-10 left-0 right-0 w-40 h-40 m-auto"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <BlurImage
                    // src={pokemon.officialArtwork}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
                      "00" + pokemon.id
                    ).slice(-3)}.png`}
                    alt={pokemon.name}
                    width="475"
                    height="475"
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.1, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="xs:hidden absolute top-4 right-4 text-white"
                >
                  {pokemon.id === 200 ? (
                    <button
                      disabled
                      className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600 opacity-50 cursor-not-allowed ml-8"
                    >
                      <RightIcon />
                    </button>
                  ) : (
                    <Link href={`/${pokemon.id + 1}`}>
                      <a className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600">
                        <RightIcon />
                      </a>
                    </Link>
                  )}
                </motion.div>
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
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="poke-data rounded-b-md bg-white px-4 py-2 divide-y-2 divide-gray-500 divide-dotted"
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
                  {pokemon.stats.map((stat, i) => (
                    <div key={stat.stat.name} className="py-1">
                      <span className="uppercase">{stat.stat.name}</span>:{" "}
                      {stat.base_stat}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${stat.base_stat / 2}%`,
                          maxWidth: "100%",
                        }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="h-1 rounded-md bg-green-500"
                      ></motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.1, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="xs:block hidden text-white mr-4"
            >
              {pokemon.id === 200 ? (
                <button
                  disabled
                  className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600 opacity-50 cursor-not-allowed ml-8"
                >
                  <RightIcon />
                </button>
              ) : (
                <Link href={`/${pokemon.id + 1}`}>
                  <a className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600">
                    <RightIcon />
                  </a>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

const easing = [0.175, 0.85, 0.42, 0.96];

const stagger = {
  enter: {
    transition: {
      staggerChildren: 0.125,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.075,
      staggerDirection: -1,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  exit: {
    y: 160,
    opacity: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

const HomeIcon = (props) => {
  return (
    <svg
      className={props.className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
};
const LeftIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
};

const RightIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
};

export default Post;
