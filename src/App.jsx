import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useMemo, useState } from 'react'
import { BlockWordSaved } from './components/BlockWordSaved'
import { BlockWordCurrent } from './components/BlockWordCurrent'
import { BlockWordMyster } from './components/BlockWordMyster'


let max_essai = 5
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
  console.log(pos1, pos2)
  return [pos1, pos2].sort()
}

function App() {
  const [essai, setEssai] = useState(0)
  const [wordTape, setWordTape] = useState("")
  const [wordTapeSave, setWordTapeSave] = useState([])
  const [pos1, setPos1] = useState(0)
  const [pos2, setPos2] = useState(0)
  const [posWordToFound, setPosWordToFound] = useState(0)

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
        // let motLongue = ""
        // console.log(wordTape.length, words[posWordToFound].length)
        // if (wordTape.length > words[posWordToFound].length) {
        //   // motLongue = wordTape.substring(0, words[posWordToFound].length)
        //   setWordTape((word) => {
        //     if (word.length > words[posWordToFound].length) {
        //       return word.substring(0, words[posWordToFound].length)
        //     } else {
        //       word + char
        //     }
        //   })
        // }

      }
    } else {

      setWordTapeSave((word) => [...word, wordTape])
      setEssai((ess) => ess + 1)
      setWordTape("")

      if (words[posWordToFound] === wordTape) {
        setEssai(0)
        setWordTapeSave([])
        setPosWordToFound(Math.floor(Math.random() * words.length))
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
  )
}

export default App
