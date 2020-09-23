import useSWR from "swr";
import Name from "./name";

function Pokemon({ name }) {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return (
    <>
      {data ? (
        <>
          <div className="poke-name flex justify-between items-center p-1">
            <div>
              <h2 className="text-lg capitalize mb-2">
                <Name name={name} />
              </h2>
              <div>
                {data.types.map((type) => (
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
              <img src={data.sprites.front_default} />
            </div>
          </div>
          <div className="poke-detail hidden">
            <ul>
              <li>
                <span>身高</span>: {data.height / 10} m
              </li>
              <li>
                <span>體重</span>: {data.weight / 10} kg
              </li>
            </ul>
            <h3 className="text-lg">Stats</h3>
            <ul className="flex justify-start items-baseline flex-wrap">
              {data.stats.map((stat) => (
                <li key={stat.stat.name} className="w-3/6">
                  <span className="capitalize">{stat.stat.name}</span>:{" "}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="font-bold text-l capitalize">Loading {name}...</p>
      )}
    </>
  );
}

export default Pokemon;
