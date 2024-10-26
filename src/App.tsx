import { useState } from "react"
import ImagesGrid from "./components/ImagesGrid"
import Modal from "./components/Modal"
import Title from "./components/Title"
import UploadForm from "./components/UploadForm"

function App() {

  const [selectedImg, setSelecctedImg] = useState<string | null>(null)

  return (
    <div className="m-10 p-1">
      <Title />
      <UploadForm />
      <ImagesGrid setSelecctedImg={setSelecctedImg} />
      {
        selectedImg && <Modal selectedImg={selectedImg} setSelecctedImg={setSelecctedImg} />
      }
    </div>
  )
}

export default App
