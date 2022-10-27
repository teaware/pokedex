import Head from "next/head";

export default function Container(props) {
  const { children, ...customMeta } = props;
  const meta = {
    title: "water 🦦 – Developer, writer, creator.",
    description: `Front-end developer, blog writer, and some kind of creator.`,
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="flex flex-col w-full min-h-screen font-sans text-base antialiased pt-safe-top text-slate-800 bg-slate-200">
        <main>{children}</main>
      </div>
    </>
  );
}
