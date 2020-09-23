import useSWR from "swr";

function Name({ name }) {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

  const names = data ? [].concat(...data.names) : [];
  const lan = "zh-Hant";
  const cn = names.filter((obj) => {
    return obj.language.name === lan;
  });

  return (
    <>
      {cn
        ? cn.map((obj) => {
            return obj.name;
          })
        : { name }}
    </>
  );
}

export default Name;
