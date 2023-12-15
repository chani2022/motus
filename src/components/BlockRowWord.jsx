import BlockWord from "./BlockWord";
import DivRow from "./DivRow";

export function BlockRowWord({ word, max_essai, charToShow, essai, wordTape, wordsSaved }) {
    let container = []
    let className = "btn btn-danger col-2 m-1"

    for (let ess = 0; ess < max_essai; ess++) {
        let row = []
        for (let i = 0; i < word.length; i++) {
            let char = "*"
            className = "btn btn-primary col-2 m-1"
            let isTape = false;

            if (essai == ess) {
                for (let k = 0; k < charToShow.length; k++) {
                    if (i == charToShow[k]) {
                        char = word[i]
                        className = "btn btn-danger col-2 m-1"
                    }
                }

                if (wordTape.length > 0) {
                    for (let j = 0; j < wordTape.length; j++) {
                        if (i == j) {
                            isTape = true
                            char = wordTape[j]
                            className = "btn btn-secondary col-2 m-1"
                        }
                    }
                }

            } else {
                char = "*"
                className = "btn btn-primary col-2 m-1"
            }
            row.push(<BlockWord key={i} char={char} className={className} />)
        }
        container.push(<DivRow key={ess}>{row}</DivRow>)
    }
    /**
     * reafficher les mots precedents tapé par l'utilisateur
     */
    for (let i = 0; i < essai; i++) {
        let block = []
        for (let j = 0; j < wordsSaved[i].length; j++) {
            for (let k = 0; k < wordsSaved[i][j].length; k++) {
                const char = wordsSaved[i][j][k]
                if (word.includes(char)) {
                    className = "btn btn-warning col-2 m-1"
                    if (char === word[j]) {
                        className = "btn btn-danger col-2 m-1"
                    }

                } else {
                    className = "btn btn-primary col-2 m-1"
                }
                block.push(<BlockWord key={i + j + k} char={char} className={className} />)
            }

        }
        container[i] = <DivRow key={i}>{block}</DivRow>
    }
    return (
        container
    )
}