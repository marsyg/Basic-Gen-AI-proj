import {  useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AudioMeter from "./components/audioSketch";
import PromptBar from "./components/promptBar";

function App() {

  const [image, setImage] = useState(null);
  const [recorsing, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [supriseVal, setSupriseVal] = useState("");
  const [response, setResponse] = useState("");
  const [imgErorr, setImgError] = useState("");
  const [volIntensity, setVolIntensity] = useState(0);
  const [barHeight, setBarHeight] = useState(Array(10).fill(1));
 


 

  const generateHeights = (volIntensity) => {
    const array = Array(10).fill(0).map(() => Math.random() * volIntensity * 5 + 1);
    console.log(array, "array");
   
    return array
  };

  useEffect(() => { 
    const intervalId = setInterval(() => {
      setBarHeight(generateHeights(volIntensity));
    }, 120);
    console.log(barHeight, "barHeight");
    console.log(intervalId, "intervalId");
    return () =>{
       
      
      return clearInterval(intervalId)};
  }, []);


  const speechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  const recognition = new speechRecognition();

  const handleOnRecord = () => {
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();
    recognition.onresult = (e) => {
      console.log(e.results[0][0].transcript);
    };
  };
  const handleOnStop = () => {
    recognition.stop();
  };
  
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  
  const surpriseOptions = [
    "Is this a car or a truck?",
    "Is this a cat or a dog?",
    "Is this a bird or a plane?",
  ];
  //
  const suprise = () => {
    let Val =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]; //randomly select a surprise (math.random selects a random number between 0 and 1 and math.floor rounds it down to the nearest whole number
    setSupriseVal(Val);
  };
  //
 
  console.log(supriseVal, "supriseVal");
  //
  const analyzeImage = async () => {
    if (!image) {
      setImgError("image not found e");
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ prompt: supriseVal }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(supriseVal, "surpriseVal");
      const Response = await fetch("http://localhost:3000/gemini", options);
      const data = await Response.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };
  //
  const uploadImage = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    if (!file || file.length === 0) {
      setSelectedFile(null);
      return;
    } else {
      setSelectedFile(file);
    }
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
        responseType: "blob",
      });
      const data = await res.json();
      setImage(file || data.imageURL);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log( "selected file=======================>", selectedFile,);
  console.log(preview, "preview");
  return (
    <>
      {/* <AudioMeter className="" vol={setVolIntensity}></AudioMeter> */}
      <div className="flex flex-row w-full h-screen">
        <div className="w-1/5 p-2 flex flex-col items-center  bg-fuchsia-300">
          <h1 className="w-full mx-4 p-1 text-xl bg-fuchsia-400 flex">
            Recent Chat
          </h1>
        </div>
        <div className="flex  flex-col   items-center  w-full h-screen bg-gray-950 ">
          <div className="text-white flex justify-center my-auto w-full">
            <div className="flex flex-row">
            {barHeight.map((height, index) => (
        <div
          key={index}
          style={{ 
            height: `${height }rem`,
            // transition: 'height 0.1s ease-in-out'
          }}
          className="w-4 mx-2 min-h-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        />
      ))}
            </div>
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hidden ">
              Welcome , Let's Chat
            </div>
          </div>
          <PromptBar
        selectedFile={selectedFile}
        preview={preview}
        setSupriseVal={setSupriseVal}
        supriseVal={supriseVal}
        handleOnRecord={handleOnRecord}
        handleOnStop={handleOnStop}
        uploadImage={uploadImage}
        suprise={suprise}
        analyzeImage={analyzeImage}
      />
    
        
        </div>
      </div>
    </>
  );
}

export default App;
