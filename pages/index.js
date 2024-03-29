import { useState } from "react";
import Pokemon from "../components/Pokemon";
import Container from "../components/Container";
import { motion } from "framer-motion";
import { QueryClient, dehydrate, useInfiniteQuery } from "react-query";

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: -60,
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.6, ease: easing },
  },
  enter: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  exit: {
    y: 120,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.5, ease: easing },
  },
};

const stagger = {
  enter: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const fetchPokemon = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
}) => {
  const request = await fetch(pageParam);
  const { results, next } = await request.json();
  return { response: results, nextPage: next };
};

const CatchEmAll = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery("pokemon", fetchPokemon, {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const [open, setOpen] = useState("");

  return (
    <motion.div
      initial={isLoading ? "initial" : false}
      animate="enter"
      exit="exit"
    >
      <motion.section
        variants={stagger}
        className="container px-4 py-8 mx-auto"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl text-center mb-8">
          寶可夢圖鑑
        </motion.h1>
        {isLoading ? (
          <motion.div
            variants={fadeInUp}
            className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <Skeletons />
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {data.pages.map((group) =>
              group.response.map((pokemon) => (
                <Pokemon
                  key={pokemon.name}
                  open={open}
                  setOpen={setOpen}
                  name={pokemon.name}
                  id={pokemon.url.split("pokemon/")[1].split("/")[0]}
                />
              ))
            )}
          </motion.div>
        )}
        <motion.div
          variants={fadeInUp}
          className="mx-auto py-8 w-1/2 text-center"
        >
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : hasNextPage ? (
              <span>Load More</span>
            ) : (
              <span>No More</span>
            )}
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery("pokemon", () => fetchPokemon());

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default function Home() {
  return (
    <Container title="寶可夢圖鑑" description="宝可梦的描述">
      <CatchEmAll />
    </Container>
  );
}

const SkeletonPoke = ({ type = "short" }) => {
  return (
    <div className="rounded-md shadow-md w-full p-2 bg-gray-200">
      <div className="flex justify-between items-center px-1">
        {type === "short" ? (
          <div>
            <div className="w-16 h-4 bg-gray-400 rounded-md mb-2"></div>
            <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
          </div>
        ) : (
          <div>
            <div className="w-20 h-4 bg-gray-400 rounded-md mb-2"></div>
            <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
          </div>
        )}
        <div className="w-16 h-16 ml-1 bg-gray-400 rounded-sm"></div>
      </div>
    </div>
  );
};

const Skeletons = () => {
  const items = [...new Array(20).keys()];
  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{
            animationFillMode: "backwards",
            animationDelay: i % 3 === 0 ? "150ms" : "350ms",
          }}
        >
          <SkeletonPoke type={i % 3 === 0 ? "long" : "short"} />
        </div>
      ))}
    </>
  );
};
