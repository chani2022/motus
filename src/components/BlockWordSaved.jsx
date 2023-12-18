import BlockWord from "./BlockWord"
import DivRow from "./DivRow"

export function BlockWordSaved({ max_essai, wordsSaved, word }) {
    console.log(wordsSaved)
    let div = []

    if (wordsSaved.length < max_essai) {
        for (let i = 0; i < wordsSaved.length; i++) {
            const mot = wordsSaved[i]
            let row = []

            for (let j = 0; j < mot.length; j++) {
                let charSaved = mot[j]
                let className = "btn btn-primary col-2 m-1"

                if (word.includes(charSaved)) {
                    className = "btn btn-warning col-2 m-1"
                    if (charSaved === word[j]) {
                        className = "btn btn-danger col-2 m-1"
                    }
                }
                row.push(
                    <BlockWord className={className}>
                        {charSaved}
                    </BlockWord>
                )
            }
            div.push(<DivRow>{row}</DivRow>)
        }
    }
    return (
        <>{div}</>
    )
}