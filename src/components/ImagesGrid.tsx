import useFireStore from "../hooks/useFireStore"
import { motion } from "framer-motion"

type Props = {
    setSelecctedImg: (val: string | null) => void
}

const ImagesGrid = ({ setSelecctedImg }: Props) => {

    const { docs } = useFireStore('images')
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-20">
                {
                    docs && docs.map((doc) => {
                        return <motion.div
                            whileHover={{ opacity: 1 }}
                            layout={true}
                            key={doc.id} className="h-0 py-[50%] relative overflow-hidden rounded-lg shadow-lg border-4 border-primary opacity-80"
                            onClick={() => setSelecctedImg(doc.url)}>
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                src={doc.url} alt="uploaded Pic" className="min-h-[100%] min-w-[100%] max-w-[150%] absolute top-0 object-cover" />
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}

export default ImagesGrid