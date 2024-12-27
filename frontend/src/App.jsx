import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [supriseVal, setSupriseVal] = useState("");
  const [response, setResponse] = useState("");
  const [imgErorr, setImgError] = useState("");
  //
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  //
  const surpriseOptions = [
    "Is this a car or a truck?",
    "Is this a cat or a dog?",
    "Is this a bird or a plane?",
  ];
  //
  const surprise = () => {
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

  console.log(selectedFile, "selected file");
  console.log(preview, "preview");
  return (
    <>
      <div className="">
        <label htmlFor="image">upload image</label>
        <input
          onChange={uploadImage}
          id="image"
          name=""
          accept="image*/"
          type="file"
        />
        {selectedFile && <img src={preview} alt="preview" />}
        <input
          onChange={(e) => {
            setSupriseVal(e.target.value);
          }}
          type="text"
          value={supriseVal}
          placeholder="What do you want to know about the image ..."
        />
        <button onClick={surprise}>Surprise</button>
        <button onClick={analyzeImage}>Generate</button>
      </div>
    </>
  );
}

export default App;
