const fetchAudioStream = async (inputText) => {
    try {
        const response = await fetch(`https://api.sws.speechify.com/v1/audio/stream`, {
            method: "POST",
            headers: {
                Authorization: `Bearer QFdHN96XTO-koVDMfF7mRHxnpLrfHupfLXIGOZQAL14=`,
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
            },
            body: JSON.stringify({
                input: inputText,
                voice_id: "cliff",
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const audioStream = await response.blob();
        return audioStream;
    } catch (error) {
        console.error("Failed to fetch audio stream:", error);
        throw error;
    }
};

export default fetchAudioStream;