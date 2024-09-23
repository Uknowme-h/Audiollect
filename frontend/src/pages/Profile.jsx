import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

export const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div className=" w-[70rem] rounded-xl h-[80vh] mx-auto p-4 md:p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-gray-800">
        <h2 className="text-2xl md:text-3xl w-full font-bold mb-4 md:mb-6 text-center text-[#433D8B]">
          Profile
        </h2>

        <div className="space-y-4 md:space-y-6">
          <motion.div
            className="p-3 md:p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#433D8B] mb-2 md:mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.name}</p>
            <p className="text-gray-300">Email: {user.email}</p>
          </motion.div>
          <motion.div
            className="p-3 md:p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#433D8B] mb-2 md:mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>
              {formatDate(user.lastLogin)}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        ></motion.div>
      </motion.div>
    </div>
  );
};
