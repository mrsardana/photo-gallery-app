import { useRef, useState } from 'react'
import ProgressBar from './ProgressBar'

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const allowedImageTypes: string[] = ["image/png", "image/jpeg", "image/jpg"]

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const changeHandler = (e: any) => {
        let selected = e.target.files[0]
        if (selected && allowedImageTypes.includes(selected.type)) {
            setFile(selected)
            setError('')
        }
        else {
            setFile(null)
            setError("Please Select a image file of type png, jpeg or jpg ")

        }

    }
    return (
        <div className='flex flex-row justify-center'>
            <form action="">
                <input onChange={changeHandler} ref={fileInputRef}
                    className="hidden " type="file" />
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        fileInputRef.current?.click()
                    }}
                    className="bg-primary text-white p-4 rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
                    aria-label="Upload File">
                    <span className='text-2xl font-bold'>+</span>
                </button>


                <div className=''>
                    {
                        error && <div className='text-xl text-error m-4'>{error}</div>
                    }
                    {
                        file && <div className='text-xl text-secondary '>{file.name}</div>
                    }
                    {
                        file && <ProgressBar file={file} setFile={setFile} />
                    }
                </div>
            </form>
        </div>

    )
}

export default UploadForm