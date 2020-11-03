import Link from "next/link";
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
  const bgc = pokemonSpecies ? pokemonSpecies.color.name : "gray"; // background-color
  const names = pokemonSpecies ? [].concat(...pokemonSpecies.names) : [];
  const lan = names.filter((obj) => {
    return obj.language.name === "zh-Hant"; // SET the Language you want
  });
  const theName = pokemonSpecies ? lan[0].name : name;

  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={backVariants}
    >
      <div
        className={`poke-detail p-4 h-screen w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto bg-${bgc}-500`}
        style={{ maxHeight: 812 }}
      >
        <div className="flex justify-between h-12 items-center px-1">
          <Link href="/" scroll={false}>
            <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl bg-gray-700">
              ←
            </a>
          </Link>
          <h2 className="font-mono text-2xl capitalize">{pokemon.name}</h2>
          <div className="font-mono text-lg">#{pokemon.paddedId}</div>
        </div>
        <div className="text-center my-4">
          <div className="w-40 h-40 m-auto">
            <img src={pokemon.officialArtwork} alt={pokemon.name} />
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
    </motion.div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=893");
  const posts = await res.json();

  const paths = posts.results.map((post) => ({
    params: { name: post.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();
  pokemon.paddedId = ("00" + pokemon.id).slice(-3);
  pokemon.officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const res2 = await fetch(pokemon.species.url);
  const pokemonSpecies = await res2.json();

  // Pass data to the page via props
  return { props: { pokemon, pokemonSpecies } };
}

export default Post;
