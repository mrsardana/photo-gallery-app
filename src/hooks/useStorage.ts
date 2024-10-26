import { useState, useEffect, useRef } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { projectStorage, projectFirestore, timeStamp } from "../firebase/config"
import { v4 as uuidv4 } from 'uuid';


interface useStorageReturn {
    progress: number
    url: string | null
    error: string | null
}

const useStorage = (file: File): useStorageReturn => {
    const [progress, setProgress] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)
    const [url, setUrl] = useState<string | null>(null)
    const uploadStarted = useRef(false)

    useEffect(() => {
        if (!file || uploadStarted.current) return

        uploadStarted.current = true

        const fileName = uuidv4() + '_' + file.name
        const storageRef = ref(projectStorage, `images/${fileName}`)
        const collectionRef = collection(projectFirestore, 'images')


        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snap) => {
            let percentage: number = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
        }, (err: any) => {
            setError(err.message)
        }, async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            const createdAt = timeStamp()
            addDoc(collectionRef, { url, createdAt })
            setUrl(url)
        })

    }, [file])

    return { progress, url, error }
}

export default useStorage;