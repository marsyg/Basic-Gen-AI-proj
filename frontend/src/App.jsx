import { useState } from 'react'


function App() {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const uploadImage = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      setImage(data.image)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className=''>
        <img src={URL.createObjectURL(image)} ></img>
        <label htmlFor="image">upload image</label>
        <input id="image" accept="image*/" type="file" />
      </div>
    </>
  )
}

export default App
