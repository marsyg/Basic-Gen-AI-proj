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

  console.log(selectedFile, "selected file");
  console.log(preview, "preview");
  return (
    <>
      <div className="flex self-center justify-center w-full h-screen bg-gray-900">
        <div className="hidden">
          <input
            onChange={uploadImage}
            id="image"
            placeholder="Click to upload image"
            accept="image*/"
            type="file"
          />
          {selectedFile && <img src={preview} alt="preview" />}
        </div>

        <div className="flex flex-col w-3/5 h-28 px-1 border-spacing-1 border-slate-200 items-center rounded-3xl fixed bottom-7    bg-slate-700 justify-center">
          <div className="w-full ">
            <input
              onChange={(e) => {
                setSupriseVal(e.target.value);
              }}
              className="border-2 w-full h-14 my-1 rounded-2xl py-1  bg-slate-300 border-stone-500"
              type="text"
              value={supriseVal}
              placeholder="What do you want to know about the image ..."
            />
          </div>
          <div className="flex flex-col w-full  ">
            <div className="flex w-full justify-between ">
              <div className="flex flex-row">
                <input
                  onChange={uploadImage}
                  id="image"
                  placeholder="Click to upload image"
                  accept="image*/"
                  type="file"
                  className="hidden"
                />
                <label className="" htmlFor="image">
                  <div className="p-2  rounded-xl mx-1 text-slate-300 bg-slate-600 hover:bg-slate-500 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                      />
                    </svg>
                  </div>
                </label>
                <button
                  className="p-2 rounded-xl text-slate-300 bg-slate-600  hover:bg-slate-500"
                  onClick={suprise}
                >
                  Suprise Me
                </button>
              </div>

              <button
                className="p-2 rounded-xl mx-1 text-slate-300 bg-slate-600 hover:bg-slate-500"
                onClick={analyzeImage}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
