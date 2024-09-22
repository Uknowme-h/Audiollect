import { motion } from "framer-motion";
import { LampContainer } from "../components/Lamps";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <LampContainer className="w-full h-full flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Turn on the sound, <br /> turn off the worries.
          <Link to={"/ocr"}>
            <span className="text-purple-900">Lets get started</span>
          </Link>
        </motion.h1>
      </LampContainer>
    </motion.div>
  );
};
export default DashboardPage;
