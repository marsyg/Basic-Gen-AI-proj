import { useState, useEffect, useRef } from "react";

const AudioMeter = ({ vol }) => {
  const [audioError, setAudioError] = useState(null);
  const [audioMeter, setAudioMeter] = useState(0);

  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const bufferLengthRef = useRef(null);

  const getAudio = async () => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(audioStream);

      source.connect(analyser);
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Store in refs
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      bufferLengthRef.current = bufferLength;

      // Start animation loop
      startLoop();
    } catch (error) {
      setAudioError(error);
    }
  };

  const startLoop = () => {
    if (analyserRef.current && dataArrayRef.current) {
      const loop = () => {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const average =
          dataArrayRef.current.reduce((acc, val) => acc + val, 0) /
          bufferLengthRef.current;

        setAudioMeter(average);
        if (typeof vol === "function") {
          vol(average); // Pass the audio meter value to parent
        }

        requestAnimationFrame(loop);
      };
      loop();
    }
  };

  useEffect(() => {
    // Clean up audio context on component unmount
    return () => {
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      {audioError && <p>{audioError.message}</p>}
      <meter value={audioMeter} max="255"></meter>
      <button onClick={getAudio}>Start Audio</button>
    </div>
  );
};

export default AudioMeter;
