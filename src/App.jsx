import 'bootstrap/dist/css/bootstrap.min.css'
import { BlockRowWord } from './components/BlockRowWord'
import { useEffect, useState } from 'react'


const WORDTOFOUND = "TEST"
let max_essai = 5
let pos1, pos2

do {
  pos1 = Math.floor(Math.random() * WORDTOFOUND.length)
  pos2 = Math.floor(Math.random() * WORDTOFOUND.length)

} while (pos1 == pos2)

const charToShow = [pos1, pos2].sort()


function App() {
  const [essai, setEssai] = useState(0)
  const [wordTape, setWordTape] = useState("")
  const [wordTapeSave, setWordTapeSave] = useState([])
  const [gameFinished, setGameFinished] = useState(false)

  const handlekeyUpListener = (e) => {
    const keycode = e.keyCode
    const char = String.fromCharCode(keycode)
    /**
     * different de entree
     */
    if (keycode != 13) {
      /** different de ctrl shift alt */
      if (keycode != 18 && keycode != 17 && keycode != 16 && keycode != 9) {
        setWordTape(wordTape + char)
      }
    } else {

      let motEnregistrer = wordTapeSave.map((word) => {
        return word
      })
      motEnregistrer.push(wordTape)
      setWordTapeSave(motEnregistrer)
      setEssai(essai + 1)
      setWordTape("")

      if (WORDTOFOUND === wordTape) {
        setGameFinished(true)
        setEssai(0)
        // setWordTape("")
        setWordTapeSave([])
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handlekeyUpListener)

    return () => {
      window.removeEventListener('keyup', handlekeyUpListener);
    }
  }, [wordTapeSave, wordTape, gameFinished])

  return (
    <div className="container mt-5" >
      <BlockRowWord
        word={WORDTOFOUND}
        max_essai={max_essai}
        charToShow={charToShow}
        essai={essai}
        wordTape={wordTape}
        wordsSaved={wordTapeSave}
      />
    </div>
  )
}

export default App
