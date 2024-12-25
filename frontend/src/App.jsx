import { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile,setSelectedFile] =useState(null)
    const [preview, setPreview] = useState(null)
    useEffect(() => {
      if (!selectedFile) {
        setPreview(null)
        return
      }
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      
      return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

  const uploadImage = async (e) => {

    
   console.log(e)
   
    const file = e.target.files[0]
    console.log(file)
    if (!file || file.length === 0) {
      setSelectedFile(null)
      return
    }else{
      setSelectedFile(file)
    }
   
    const formData = new FormData()
    formData.append('image', file)
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
        responseType: 'blob'
      })
      const data = await res.json()
      setImage(file||data.imageURL)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
   
  }
  console.log(selectedFile,"selected file")
  console.log(preview,"preview")
  return (
    <>
      <div className=''>
        
        <label htmlFor="image">upload image</label>
        <input onChange={uploadImage} id="image" name='' accept="image*/" type="file" />
       {selectedFile &&  <img src={preview} alt="preview" />}
      </div>
    </>
  )
}

export default App
