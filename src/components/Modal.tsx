import { motion } from "framer-motion"
type Props = {
    selectedImg: string,
    setSelecctedImg: (val: string | null) => void
}
const Modal = ({ selectedImg, setSelecctedImg }: Props) => {
    const handleClick = (e: any) => {
        if (e.target.id == 'ImageModal') {
            console.log('Clicked')
            setSelecctedImg(null)
        }

    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClick} id="ImageModal"
            className="fixed top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-90">
            <motion.img
                initial={{ y: "-100vh" }}
                animate={{ y: 0, }}
                transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 100
                }}
                src={selectedImg} alt="enlarged pic"
                className="block max-w-[80%] max-h-[80%] my-60 mx-auto border-8 border-secondary rounded-xl" />
        </motion.div>
    )
}

export default Modal