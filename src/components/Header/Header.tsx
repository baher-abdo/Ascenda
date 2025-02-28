import { motion } from "framer-motion";

const mainTitle = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
const descriptiom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function Header() {
  return (
    <header className="w-full h-[70vh] flex flex-col justify-center bg-cover_img bg-cover bg-no-repeat">
      <div className="container text-center md:text-left">
        <div className="md:w-2/5">
          <motion.h2 variants={mainTitle} initial="hidden" animate="visible" className="h2 text-white font-semibold">
            Chase elegance. Reserve your dream stay now.
          </motion.h2>
          <motion.h4 variants={descriptiom} initial="hidden" animate="visible" className="text-white font-light text-xl my-3">
            Discover the finest hotels from all over the world.
          </motion.h4>
        </div>
      </div>
    </header>
  );
}
