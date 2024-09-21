import { BookAudio } from "lucide-react";
import { AudioPlayer } from "react-audio-play";
import fetchAudioStream from "../utils/speech";
import { useState } from "react";

const NotesPage = () => {
  const [inputText, setInputText] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchAudio = async () => {
    setLoading(true);
    setError(null);
    try {
      const audioStream = await fetchAudioStream(inputText);
      console.log(audioStream);
      const audioUrl = URL.createObjectURL(audioStream);
      setAudioSrc(audioUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-70vh">
      <div className="w-full max-w-4xl p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Type your Text here</h1>
        <textarea
          className="w-full h-64 p-2 border rounded"
          placeholder="Write your notes here..."
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className="mt-4 p-4  cursor-pointer rounded bg-blue-500 text-white font-20 py-2"
          onClick={handleFetchAudio}
          disabled={loading}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              Convert to AudioBook <BookAudio className="inline-block ml-2" />
            </>
          )}
        </button>
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

        {audioSrc && (
          <div className="flex justify-center">
            <button
              className="mt-4 cursor-pointer rounded bg-green-500 text-white font-20 py-2"
              onClick={() => {
                const link = document.createElement("a");
                link.href = audioSrc;
                link.download = "audio.mp3";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Audio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
