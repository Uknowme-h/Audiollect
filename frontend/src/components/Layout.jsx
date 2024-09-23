// Layout.jsx
import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import Dock from "./dock";
import { AuthContext } from "../App";
import { useAuthStore } from "../store/authStore";
import chatBot from "../utils/chatbot";

const Layout = () => {
  const { logout } = useAuthStore();

  const { ischatvisible, setischatvisible } = useContext(AuthContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [setLoading] = useState(false);

  const aiRun = async () => {
    try {
      setLoading(true);
      const processedResponse = await chatBot(question);

      setAnswer(processedResponse);
      setLoading(false);
    } catch (error) {
      setAnswer("Sorry I am not able to answer that question");
      setLoading(false);
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="block md:hidden">
        <Sidebar key="sidebar" className="w-full" />
      </div>
      <div className="w-full flex flex-col min-h-screen absolute top-0">
        <div className="w-full absolute top-0 left-0 bg-[#031323] bg-opacity-50 text-white p-4 flex items-center justify-between backdrop-filter backdrop-blur-lg shadow-lg border border-gray-700 z-10">
          <h1 className="text-xl text-[#433D8B] ml-4">AudioLect</h1>
          <div className="flex items-center">
            <Link to={"/about"}>
              <h1 className="text-xl text-[#433D8B] mr-4">About Us</h1>
            </Link>
            <button
              onClick={() => {
                logout();
              }}
              className="text-xl text-red-500"
            >
              LogOut
            </button>
          </div>
        </div>
        <div className="flex-1 pt-16">
          {/* Add padding to avoid content being hidden behind the navbar */}
          <Outlet />
        </div>
      </div>
      <div className="hidden md:block fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        <Dock toggleChat={() => setischatvisible((prev) => !prev)} />
      </div>
      {ischatvisible && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-lg rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chat</h2>
            <button
              onClick={() => setischatvisible(false)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 border rounded-lg bg-gray-100 mb-2">
            <pre className="whitespace-pre-wrap">
              {answer
                ? answer
                : "Hey im your chatBot Sparky. How can I help you Today ?"}
            </pre>
          </div>
          <div className="flex items-center mt-auto">
            <input
              type="text"
              className="flex-1 border-2 border-gray-200 rounded-lg mr-2 p-2 py-2"
              placeholder="Ask a question"
              onChange={(e) =>
                setQuestion(
                  e.target.value + "please answer in 100 words or less"
                )
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={aiRun}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
