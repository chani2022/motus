import BlockWord from "./BlockWord"
import DivRow from "./DivRow"

export function BlockWordMyster({ max_essai, currentPos, word }) {
    const nbLigne = max_essai - (currentPos + 1)
    let div = []
    const className = "btn btn-primary col-2 m-1"
    for (let i = 0; i < nbLigne; i++) {
        let row = []
        for (let j = 0; j < word.length; j++) {
            const char = "*"
            row.push(
                <BlockWord key={i + "" + j} className={className} >
                    {char}
                </BlockWord>)
        }
        div.push(
            <DivRow key={i}>
                {row}
            </DivRow>
        )

    }
    return (
        <>{div}</>
    )
}