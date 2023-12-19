import BlockWord from "./BlockWord"
import DivRow from "./DivRow"

export function BlockWordCurrent({ posWordToShow, word, wordTape }) {
    let row = []
    let div = null
    for (let i = 0; i < word.length; i++) {
        let char = "*"
        let className = "btn btn-primary col-2 m-1"
        /**
         * affichage d'indice sur le mot à rechercher
         */
        for (let j = 0; j < posWordToShow.length; j++) {
            if (i == posWordToShow[j]) {
                char = word[posWordToShow[j]]
                className = "btn btn-danger col-2 m-1"
            }
        }

        row.push(
            <BlockWord key={i} className={className}>
                {char}
            </BlockWord>
        )
    }
    /**
     * modification du style lorsqu'on tape sur le clavier
     * et affichage du lettre tape
     */
    for (let k = 0; k < wordTape.length; k++) {
        const char = wordTape[k]
        const className = "btn btn-secondary col-2 m-1"
        row[k] = <BlockWord key={k} className={className}>
            {char}
        </BlockWord>
    }


    div = <DivRow>
        {row}
    </DivRow>
    return (
        <>{div}</>
    )
}