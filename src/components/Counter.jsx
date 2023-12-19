import { useContext, useEffect, useState } from "react"
import { CompteurContext } from "../context/CompteurContext"
import ReactModal from "react-modal"

const customStyles = {
    content: {
        top: '10%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export function Counter() {
    const [
        counterInit,
        counter,
        setCounter,
        words,
        posWordToFound,
        setPosWordToFound
    ] = useContext(CompteurContext)
    const [modalIsOpen, setIsModalOpen] = useState(false)

    function closeModal() {
        setIsModalOpen(false);
        setPosWordToFound(Math.floor(Math.random() * words.length))
        setCounter(counterInit)
    }

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCounter((c) => {
                if (c <= 0) {
                    setIsModalOpen(true)
                    window.clearInterval(timer)
                    return 0
                }
                return c - 1
            })
        }, 1000)
        return () => {
            window.clearInterval(timer)
        }
    }, [counter])

    ReactModal.setAppElement('#root')

    return (
        <>
            <h1>
                <span className="badge text-bg-warning">{counter}</span>
            </h1>

            <ReactModal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
            // contentLabel={words[posWordToFound]}
            >
                <h1>
                    Le mot a trouvé est <span className="text-success">{words[posWordToFound]}</span>
                </h1>
            </ReactModal>
        </>

    )
}