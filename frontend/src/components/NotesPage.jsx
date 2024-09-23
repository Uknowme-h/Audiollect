import { BookAudio, Library, Stars } from "lucide-react";
import { AudioPlayer } from "react-audio-play";
import fetchAudioStream from "../utils/speech";
import { useEffect, useState, useContext } from "react";
import { useAuthStore } from "../store/authStore";
import { SelectedContext } from "../pages/OcrPage";

import chatBot from "../utils/chatbot";

const NotesPage = () => {
  const [inputText, setInputText] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [, setError] = useState(null);
  const [, , text] = useContext(SelectedContext);

  const [, setQuestion] = useState("");
  const [, setAnswer] = useState("");

  const aiRun = async (question) => {
    try {
      setLoadingSummary(true);
      const processedResponse = await chatBot(question);
      setAnswer(processedResponse);
      setInputText(processedResponse); // Set the summarized text to the inputText state
      setLoadingSummary(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setLoadingSummary(false);
    }
  };

  const { uploadFile, isLoading, error: fetcherror, user } = useAuthStore();
  const [disabled, setDisabled] = useState(false);
  const [audiostream, setAudioStream] = useState(null);

  const handleFetchAudio = async () => {
    setLoadingAudio(true);
    setError(null);
    try {
      const audioStream = await fetchAudioStream(inputText);
      console.log(audioStream);
      setAudioStream(audioStream);
      const audioUrl = URL.createObjectURL(audioStream);
      setAudioSrc(audioUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAudio(false);
    }
  };

  const handleAddtoLibrary = async () => {
    try {
      setLoading(true);
      await uploadFile(user._id, audiostream);
      alert("Book added successfully!");
      setLoading(false);

      setDisabled(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (text) {
      setInputText(text);
    }
  }, [text]);

  return (
    <div className="flex flex-col  items-center justify-center h-70vh">
      <div className="w-full max-w-4xl p-4 bg-[#012136] rounded-xl shadow-md">
        <h1 className="text-2xl text-white font-bold mb-4">
          Type your Text here
        </h1>
        <textarea
          className="w-full h-64 p-2 text-white bg-inherit border rounded"
          placeholder={text ? text : "Write your notes here..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className="mt-4 p-4  cursor-pointer rounded bg-blue-500 text-white font-20 py-2"
          onClick={handleFetchAudio}
          disabled={loadingAudio}
          style={{
            borderRadius: "10px",
            background: "#012136",
            boxShadow: " 5px 5px 10px #011421,-5px -5px 10px #012e4b",
          }}
        >
          {loadingAudio ? (
            "Loading..."
          ) : (
            <>
              Convert to AudioBook <BookAudio className="inline-block ml-2" />
            </>
          )}
        </button>
        <button
          className="mt-4 p-4  cursor-pointer rounded bg-blue-500 text-white font-20 ml-2 py-2"
          disabled={loadingSummary}
          onClick={() => {
            const newQuestion =
              inputText + " summarize this text in 100 words or less";
            setQuestion(newQuestion);
            aiRun(newQuestion);
          }}
          style={{
            borderRadius: "10px",
            background: "#012136",
            boxShadow: " 5px 5px 10px #011421,-5px -5px 10px #012e4b",
          }}
        >
          {loadingSummary ? (
            "Loading..."
          ) : (
            <>
              Summarize <Stars className="inline-block ml-2" />
            </>
          )}
        </button>
        {audioSrc && (
          <>
            <button
              className="mt-4 cursor-pointer rounded bg-green-500 text-white font-20 py-2 px-4 ml-4 mr-4 mb-4"
              onClick={() => {
                const link = document.createElement("a");
                link.href = audioSrc;
                link.download = "audio.mp3";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              style={{
                borderRadius: "10px",
                background: "#012136",
                boxShadow: " 5px 5px 10px #011421,-5px -5px 10px #012e4b",
              }}
            >
              Download Audio
            </button>
            <button
              className="mt-4 cursor-pointer rounded bg-blue-500 text-white font-20 py-2 px-4 mb-4"
              onClick={handleAddtoLibrary}
              disabled={disabled}
              style={{
                borderRadius: "10px",
                background: "#012136",
                boxShadow: " 5px 5px 10px #011421,-5px -5px 10px #012e4b",
              }}
            >
              {loading ? (
                "loading . . . "
              ) : (
                <>
                  Add to Library <Library className="inline ml-2" />{" "}
                </>
              )}
            </button>
          </>
        )}
      </div>
      <div className="w-full max-w-4xl mt-4 flex justify-center">
        <AudioPlayer
          src={audioSrc}
          className="w-[800px]"
          style={{
            backgroundColor: "#000000",
            backgroundImage: "linear-gradient(147deg, #000000 0%, #04619f 74%)",
            color: "aliceblue",
          }}
          customAdditionalStyles={{
            ".rap-pp-icon path, .rap-volume-btn path": {
              fill: "white",
            },
            ".rap-slider .rap-progress": {
              backgroundColor: "#daecff",
            },
            ".rap-volume .rap-volume-controls": {
              backgroundColor: "#000000",
              backgroundImage:
                "linear-gradient(147deg, #000000 0%, #04619f 74%)",
            },
            ".rap-slider .rap-progress .rap-pin": {
              backgroundColor: "#c3d5ff",
              boxShadow: "0 0 9px 7px #269eff52",
            },
            "svg.rap-pp-icon:hover, .rap-volume-btn svg:hover": {
              filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.9))",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NotesPage;
