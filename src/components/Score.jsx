import { useContext } from "react"
import { ScoreContext } from "../context/ScoreContex"

export function Score() {
    const score = useContext(ScoreContext)

    return (
        <>
            <h1 className="text-center">Score</h1>
            <h2 className="text-center">
                <span className="badge text-bg-warning">{score}</span>
            </h2>
        </>
    )
}