import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../components/Container";
import { BlurImage } from "../components/BlurImage";

export default function Lost() {
  return (
    <Container title={404} description="404 not found">
      <motion.div initial="initial" animate="enter" exit="exit">
        <div className="h-screen w-full">
          <div className="fixed inset-0 flex w-full justify-between h-20 px-4 pt-safe-top items-center">
            <Link href="/" scroll={false}>
              <a className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center text-2xl">
                <HomeIcon className="w-6 h-6" />
              </a>
            </Link>
          </div>

          <div className="h-full flex justify-center items-center">
            <motion.div
              variants={stagger}
              className="pokemon w-full sm:w-1/2 max-w-lg mx-4"
            >
              <motion.div
                className={`poke-img rounded-t-md text-center pt-28 pb-1 transition duration-75 relative`}
                variants={fadeInUp}
              >
                <motion.div
                  className="absolute -top-10 left-0 right-0 w-40 h-40 m-auto"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <BlurImage
                    // src={pokemon.officialArtwork}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`}
                    alt=""
                    width="475"
                    height="475"
                  />
                </motion.div>
                <div>找不到了😢</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

const easing = [0.175, 0.85, 0.42, 0.96];

const stagger = {
  enter: {
    transition: {
      staggerChildren: 0.125,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.075,
      staggerDirection: -1,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  exit: {
    y: 160,
    opacity: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

const HomeIcon = (props) => {
  return (
    <svg
      className={props.className}
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
  );
};
