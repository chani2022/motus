import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useMemo, useState } from 'react'
import { BlockWordSaved } from './components/BlockWordSaved'
import { BlockWordCurrent } from './components/BlockWordCurrent'
import { BlockWordMyster } from './components/BlockWordMyster'
import { Counter } from './components/Counter'
import { Score } from './components/Score'
import { CompteurContext } from './context/CompteurContext'
import { ScoreContext } from './context/ScoreContex'

let max_essai = 5
const counterInit = 30

const words = [
  "TEST",
  "XYLOPHENE",
  "THERMITHE",
  "OVALE",
  "TABLE",
  "PHYLOSOPHIE"
]

const random = (pos1, pos2, posWordToFound) => {
  do {
    pos1 = Math.floor(Math.random() * words[posWordToFound].length)
    pos2 = Math.floor(Math.random() * words[posWordToFound].length)

  } while (pos1 == pos2)

  return [pos1, pos2].sort()
}

function App() {

  const [essai, setEssai] = useState(0)
  const [wordTape, setWordTape] = useState("")
  const [wordTapeSave, setWordTapeSave] = useState([])
  const [pos1, setPos1] = useState(0)
  const [pos2, setPos2] = useState(0)
  const [posWordToFound, setPosWordToFound] = useState(0)
  const [counter, setCounter] = useState(counterInit)
  const [score, setScore] = useState(0)


  const randomPos = useMemo(() => {
    return random(pos1, pos2, posWordToFound)
  }, [posWordToFound])


  const handlekeyUpListener = (e) => {
    const keycode = e.keyCode
    const char = String.fromCharCode(keycode)
    /**
     * different de entree
     */
    if (keycode != 13) {
      /** different de ctrl shift alt */
      if (keycode != 18 && keycode != 17 && keycode != 16 && keycode != 9) {
        let wordToSave = wordTape + char

        if (wordToSave.length > words[posWordToFound].length) {
          wordToSave = wordToSave.substring(0, words[posWordToFound].length)
        }
        setWordTape((word) => wordToSave)
      }
    } else {

      setWordTapeSave((word) => [...word, wordTape])
      setEssai((ess) => ess + 1)
      setWordTape("")

      if (words[posWordToFound] === wordTape) {
        setEssai(0)
        setWordTapeSave([])
        setPosWordToFound(Math.floor(Math.random() * words.length))
        setCounter(counterInit)
        setScore((s) => s + 1)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handlekeyUpListener)

    return () => {
      window.removeEventListener('keyup', handlekeyUpListener);
    }
  }, [wordTapeSave, wordTape])

  return (
    <div className="container mt-5" >
      <div className="row">

        <div className="col-2">
          <CompteurContext.Provider
            value={[
              counterInit,
              counter,
              setCounter,
              // words[posWordToFound],
              words,
              posWordToFound,
              setPosWordToFound,
            ]}>
            <Counter />
          </CompteurContext.Provider>
        </div>
        <div className="col-8">
          <BlockWordSaved
            max_essai={max_essai}
            wordsSaved={wordTapeSave}
            word={words[posWordToFound]}
          />
          <BlockWordCurrent
            posWordToShow={randomPos}
            word={words[posWordToFound]}
            wordTape={wordTape}
          />
          <BlockWordMyster
            max_essai={max_essai}
            currentPos={essai}
            word={words[posWordToFound]}
          />
        </div>
        <div className="col-2">
          <ScoreContext.Provider value={score}>
            <Score />
          </ScoreContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default App
