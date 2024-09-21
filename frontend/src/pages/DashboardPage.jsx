import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <motion.div
      className="w-full h-full min-h-screen flex items-center justify-center mx-auto p-4 md:p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        <h2
          className="text-2xl md:text-3xl w-full font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Welcome to BemyEyes
        </h2>
        <h1
          className="text-2xl md:text-4xl text-white mb-4"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Turn on the sound, turn off the worries.{" "}
          <Link to={"./ocr"}>
            <span className="text-blue-500">Let's get started</span>
          </Link>
        </h1>
      </div>
    </motion.div>
  );
};
export default DashboardPage;
