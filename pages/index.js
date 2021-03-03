import { useState } from "react";
import Head from "next/head";
import { useSWRInfinite } from "swr";
import Pokemon from "../components/Pokemon";

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
    <>
      <Head>
        <title>寶可夢圖鑑</title>
      </Head>
      <section className="container px-4 py-6 mx-auto">
        <h1 className="text-4xl text-center mb-4">寶可夢圖鑑</h1>
        {isLoadingInitialData ? (
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          </div>
        )}
        <div className="mx-auto py-10 w-1/2 text-center">
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
              "No More Pokémon"
            ) : (
              "Load More Pokémon"
            )}
          </button>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return <CatchEmAll />;
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
