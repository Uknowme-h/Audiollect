import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-[60rem] rounded-3xl h-[90vh] mx-auto p-4 md:p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-gray-800"
        style={{
          "border-radius": "8px",
          background: "linear-gradient(145deg, #19163f, #151335)",
          "box-shadow": " 5px 5px 11px #090818,-5px -5px 11px #25225e",
        }}
      >
        <h2 className="text-6xl md:text-3xl w-full font-bold mb-4 md:mb-6 text-center text-white">
          About Us
        </h2>
        <div className="bg-green-400 mt-10 h-40 overflow-hidden">
          <img
            src="https://media.discordapp.net/attachments/752808175052259409/1287121814694264965/33.jpg?ex=66f0651a&is=66ef139a&hm=07dc4f80b55bcd1a192676017754af4837b2c5bc8481bac6530a088a8325b3cd&=&format=webp&width=847&height=565"
            alt="placeholder"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex mt-4 justify-center">
          <div>
            <h1 className="text-3xl text-black font-bold">Audio Learning,</h1>
            <h1 className="text-3xl text-[#433D8B] font-bold">Made Easy.</h1>
          </div>
          <div className="ml-4 w-1/2">
            <p className="text-white text-lg">
              Audiollect, an innovative AI-powered text-to-speech platform
              designed to make learning easier and more enjoyable. With
              Audiollect, you can turn your textbooks into interactive
              audiobooks, listen to content on the go, and even interact with a
              chatbot for personalized learning.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
