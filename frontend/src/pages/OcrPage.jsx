import { motion } from "framer-motion";
import { Camera, Text, Upload } from "lucide-react";
import ScanImage from "../components/ScanImage";
import { createContext, useContext, useState } from "react";
import { FileUpload } from "../components/UploadImage";
import NotesPage from "../components/NotesPage";

export const SelectedContext = createContext();

const OcrPage = () => {
  const [selectedCam, setSelectedCam] = useState(null);
  const [text, setText] = useState("");

  return (
    <SelectedContext.Provider
      value={[selectedCam, setSelectedCam, text, setText]}
    >
      <motion.div className="w-full h-full min-h-screen mx-auto p-4 md:p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-gray-800">
        {selectedCam === "upload" ? (
          <FileUpload />
        ) : selectedCam === "text" ? (
          <NotesPage />
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl w-full font-bold mb-4 md:mb-6 text-center text-[#433D8B] text-transparent bg-clip-text">
              OCR PAGE
            </h2>
            <div className="flex justify-center space-x-4 h-14 mt-32 flex-wrap gap-3 ">
              {/* <button
                className="bg-[#2E236C] text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-[#5e4690] transition duration-300 ease-in-out"
                onClick={() => setSelectedCam("camera")}
              >
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <Camera className="fill-[#826afd] " />
                </div>
                <span>Capture and Scan</span>
              </button> */}
              <button
                className="bg-[#2E236C] text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-[#5e4690] transition duration-300 ease-in-out"
                onClick={() => setSelectedCam("upload")}
              >
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <Upload className="text-[#826afd]" />
                </div>
                <span>Upload Images</span>
              </button>
              <button
                className="bg-[#2E236C] text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-[#5e4690] transition duration-300 ease-in-out"
                onClick={() => setSelectedCam("text")}
              >
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <Text className=" text-[#826afd] " />
                </div>
                <span>Paste Text</span>
              </button>
            </div>
          </>
        )}
      </motion.div>
    </SelectedContext.Provider>
  );
};

export default OcrPage;
