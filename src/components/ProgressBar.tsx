import { useEffect } from 'react'
import useStorage from '../hooks/useStorage'

type Props = {
    file: File,
    setFile: (value: File | null) => void
}
const ProgressBar = ({ file, setFile }: Props) => {
    const { url, progress, error } = useStorage(file as File)
    if (error) {
        console.log('Error', error)
    }


    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url, setFile])

    return (

        <div className='h-5 bg-primary mt-2' style={{ width: progress + '%' }}>

        </div>
    )
}

export default ProgressBar