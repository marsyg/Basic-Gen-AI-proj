import React from 'react'

function PromptBar({selectedFile,preview,setSupriseVal,supriseVal,handleOnRecord,handleOnStop,uploadImage,suprise,analyzeImage}) {
  return (
    <div className="flex flex-col w-3/5 h-auto p-1 border-spacing-1 border-slate-200 items-start rounded-3xl fixed bottom-7   bg-slate-700">
<div className="w-40 mx-4 h-auto overflow-hidden">
  {selectedFile && (
    <img
      className="w-full shadow-md shadow-black h-auto object-cover"
      src={preview}
      alt="preview"
    />
  )}
</div>
<div className="flex flex-col w-full h-28 px-1 border-spacing-1 border-slate-200 items-center rounded-3xl     bg-slate-700 justify-center">
  <div className="w-full ">
    <input
      onChange={(e) => {
        setSupriseVal(e.target.value);
      }}
      className="border-2 p-2 w-full h-14 my-1 rounded-2xl py-1 placeholder:text-slate-500 bg-slate-300 border-stone-500"
      type="text"
      value={supriseVal}
      placeholder="What do you want to know about the image ..."
    />
  </div>
  <div className="flex flex-col w-full  ">
    <div className="flex w-full justify-between ">
      <div className="flex flex-row">
        <button
          className="p-2  rounded-xl mx-1 text-slate-300 bg-slate-600 hover:bg-slate-500 cursor-pointer"
          onClick={handleOnRecord}
        >
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
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </button>
        <button onClick={handleOnStop}>Stop</button>
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
  )
}

export default PromptBar
