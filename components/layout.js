import useSWR from "swr";

function Layout({ name, children }) {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

  return (
    <div className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <article
        className={`rounded-md shadow-md w-full px-2 bg-${
          data ? data.color.name : "gray"
        }-500`}
      >
        {children}
      </article>
    </div>
  );
}

export default Layout;
