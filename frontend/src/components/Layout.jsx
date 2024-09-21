// Layout.jsx
import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Dock from "./dock";
import { AuthContext } from "../App";

import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

import config from "../../config.json"; // Adjust the path as needed

const API_KEY = config.VITE_GOOGLE_API_KEY;

const Layout = () => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const { ischatvisible, setischatvisible } = useContext(AuthContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const aiRun = async () => {
    try {
      const result = await model.generateContent(question);
      const text = await result.response.text();

      // Remove unwanted characters like asterisks (*) and hashtags (#)
      const processedResponse = text
        .replace(/[*#]/g, "")
        .replace(/<[^>]*>/g, "");

      setAnswer(processedResponse);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="block md:hidden">
        <Sidebar key="sidebar" className="w-full" />
      </div>
      <div className="w-full flex flex-col min-h-screen relative">
        <div className="w-full relative bg-gray-800 text-white p-4">
          <h1 className="text-xl">Navbar</h1>
        </div>
        <Outlet />
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
            <pre className="whitespace-pre-wrap">{answer}</pre>
          </div>
          <div className="flex items-center mt-auto">
            <input
              type="text"
              className="flex-1 border-2 border-gray-200 rounded-lg mr-2 p-2 py-2"
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
