import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const easing = [0.175, 0.85, 0.42, 0.96];
const backVariants = {
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: easing,
    },
  },
};

function Post({ pokemon, pokemonSpecies }) {
  const bgc = pokemonSpecies
    ? "bg-" + pokemonSpecies.color.name + "-400"
    : "bg-gray-400"; // background-color
  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : pokemon.name;

  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={backVariants}
    >
      <div className="h-screen w-full">
        <div className="fixed inset-0 flex w-full justify-between h-20 px-4 items-center">
          <Link href="/" scroll={false}>
            <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl bg-gray-700">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </Link>
          <h2 className="font-mono text-2xl capitalize">{pokemon.name}</h2>
          <div className="font-mono text-lg">#{pokemon.paddedId}</div>
        </div>

        <div className="h-full flex justify-center items-center">
          {pokemon.id === 1 ? (
            <button
              disabled
              className="rounded-full h-10 w-10 flex items-center justify-center text-white bg-gray-700 opacity-50 cursor-not-allowed"
            >
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
            </button>
          ) : (
            <Link href={`/${pokemon.id - 1}`}>
              <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white bg-gray-700">
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
              </a>
            </Link>
          )}

          <div className="pokemon w-full sm:w-1/2 max-w-lg mx-8">
            <div
              className={`poke-img rounded-t-md text-center pt-32 pb-4 ${bgc} relative`}
            >
              <div className="absolute left-1/2 -top-16 transform -translate-x-1/2 w-40 h-40 m-auto">
                <Image
                  src={pokemon.officialArtwork}
                  alt={pokemon.name}
                  width="475"
                  height="475"
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
            <div className="poke-data rounded-b-md bg-white px-4 py-2 divide-y-2 divide-gray-500 divide-dotted">
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

          {pokemon.id === 200 ? (
            <button
              disabled
              className="rounded-full h-10 w-10 flex items-center justify-center text-white bg-gray-700 opacity-50 cursor-not-allowed"
            >
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
            </button>
          ) : (
            <Link href={`/${pokemon.id + 1}`}>
              <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white bg-gray-700">
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
              </a>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
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
  pokemon.paddedId = ("00" + pokemon.id).slice(-3);
  pokemon.officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const res2 = await fetch(pokemon.species.url);
  const pokemonSpecies = await res2.json();

  // Pass data to the page via props
  return { props: { pokemon, pokemonSpecies } };
}

export default Post;
