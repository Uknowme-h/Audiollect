import React, { useRef, useState } from "react";

const ScanImage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scannedText, setScannedText] = useState("");

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: useFrontCamera ? "user" : "environment",
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setCapturedImage(url);
      // Simulate scanning text from image
      setScannedText(
        "Scanned text from the captured image will be displayed here."
      );
    }, "image/jpeg");
  };

  const toggleCamera = () => {
    setUseFrontCamera((prev) => !prev);
    startCamera();
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setScannedText("");
    startCamera();
  };

  const confirmCapture = () => {
    console.log("Image confirmed:", capturedImage);
    // Add your confirmation logic here
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh] md:h-[70vh]">
      <div className="flex-1 flex justify-center items-center bg-gray-600 rounded-sm">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="block w-full max-w-lg h-auto transform scale-x-[-1]"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            className="block w-full max-w-lg h-full transform scale-x-[-1]"
          ></video>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center md:justify-center md:items-center md:pl-4">
        <div className="w-full max-w-lg p-4 h-full bg-gray-200 rounded-sm mb-4">
          <h3 className="text-lg font-bold mb-2">Scanned Text</h3>
          <p>{scannedText}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center w-full">
          {!capturedImage ? (
            <>
              <button
                className="px-4 py-2 m-2 text-lg cursor-pointer rounded bg-blue-500 text-white"
                onClick={startCamera}
              >
                Open Camera
              </button>
              <button
                className="md:hidden px-4 py-2 m-2 text-lg cursor-pointer rounded bg-blue-500 text-white"
                onClick={toggleCamera}
              >
                Switch Camera
              </button>
              <button
                className="px-4 py-2 m-2 text-lg cursor-pointer rounded bg-blue-500 text-white"
                onClick={captureImage}
              >
                Capture Image
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 m-2 text-lg cursor-pointer rounded bg-green-500 text-white"
                onClick={confirmCapture}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 m-2 text-lg cursor-pointer rounded bg-red-500 text-white"
                onClick={resetCapture}
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="hidden"
        width="640"
        height="480"
      ></canvas>
    </div>
  );
};

export default ScanImage;
