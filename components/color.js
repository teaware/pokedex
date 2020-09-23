import useSWR from "swr";
import Pokemon from "./pokemon";

function Color({ name }) {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

  return (
    <div className="my-2 p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <article
        className={`rounded-md shadow-md w-full px-2 bg-${
          data ? data.color.name : "gray"
        }-500`}
      >
        <Pokemon name={name} />
      </article>
    </div>
  );
}

export default Color;
