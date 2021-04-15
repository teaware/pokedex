import { useState } from "react";
import { useSWRInfinite } from "swr";
import Pokemon from "../components/Pokemon";
import Container from "../components/Container";
import { motion } from "framer-motion";

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

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 20;

function CatchEmAll() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        PAGE_SIZE * index
      }&limit=${PAGE_SIZE}`,
    fetcher
  );

  const pokemonList = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const [open, setOpen] = useState("");

  return (
    <motion.div
      initial={isLoadingInitialData ? "initial" : false}
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
        {isLoadingInitialData ? (
          <motion.div
            variants={fadeInUp}
            className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <div className="animate-pulse">
              <SkeletonPoke type="short" />
            </div>
            <div
              className="animate-pulse"
              style={{
                animationFillMode: "backwards",
                animationDelay: "150ms",
              }}
            >
              <SkeletonPoke type="long" />
            </div>
            <div
              className="animate-pulse"
              style={{
                animationFillMode: "backwards",
                animationDelay: "150ms",
              }}
            >
              <SkeletonPoke type="long" />
            </div>
            <div
              className="animate-pulse"
              style={{
                animationFillMode: "backwards",
                animationDelay: "300ms",
              }}
            >
              <SkeletonPoke type="short" />
            </div>
            <div
              className="animate-pulse"
              style={{
                animationFillMode: "backwards",
                animationDelay: "450ms",
              }}
            >
              <SkeletonPoke type="long" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {pokemonList.map((pokemon) => {
              return pokemon.results.map((result) => (
                <Pokemon
                  key={result.name}
                  open={open}
                  setOpen={setOpen}
                  name={result.name}
                  id={result.url.split("pokemon/")[1].split("/")[0]}
                />
              ));
            })}
          </motion.div>
        )}
        <motion.div
          variants={fadeInUp}
          className="mx-auto py-8 w-1/2 text-center"
        >
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore ? (
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
            ) : isReachingEnd ? (
              <span>
                No More<span className="xs:inline hidden"> Pokémon</span>
              </span>
            ) : (
              <span>
                Load More<span className="xs:inline hidden"> Pokémon</span>
              </span>
            )}
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

export default function Home() {
  return (
    <Container title="寶可夢圖鑑" description="宝可梦的描述">
      <CatchEmAll />
    </Container>
  );
}

function SkeletonPoke({ type = "short" }) {
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
}
