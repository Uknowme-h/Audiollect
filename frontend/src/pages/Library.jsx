import { useEffect, useState } from "react";
import { AudioPlayer } from "react-audio-play";

const Library = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/upload/get-file"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  console.log(files);
  return (
    <div className="flex flex-col items-center h-full mt-20">
      <h1 className="text-3xl font-bold text-[#433D8B] mb-4">
        Saved Recordings
      </h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full ml-[1100px]">
        <ul className="w-full left-44 max-w-4xl">
          {files[0]?.file_urls.map((file, index) => (
            <li key={index} className="mb-2">
              <AudioPlayer src={file} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Library;
