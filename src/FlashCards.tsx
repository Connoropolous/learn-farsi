import React, { useState, useEffect } from 'react'
import './FlashCards.css'
import Papa from 'papaparse'

interface Word {
  Picture: string
  English: string
  Fanglish: string
  Farsi: string
  Pronunciation: string
}

export default function FlashCards() {
  const defaultNouns: Word[] = []
  const [nouns, setNouns] = useState(defaultNouns)
  const [currentWordIndex, setCurrentWordIndex] = useState(15)
  const [revealEnglish, setRevealEnglish] = useState(false)
  const [revealFanglish, setRevealFanglish] = useState(false)
  const [paused, setPaused] = useState(false)

  const DEFAULT_TIME_PER_WORD = 20
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_PER_WORD)

  const pickRandomNoun = () => {
    const randomIndex = Math.floor(Math.random() * nouns.length)
    // setRevealEnglish(false)
    setTimeLeft(DEFAULT_TIME_PER_WORD)
    setCurrentWordIndex(randomIndex)
  }

  const nextWord = () => {
    setTimeLeft(DEFAULT_TIME_PER_WORD)
    setCurrentWordIndex(currentWordIndex + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return
      }
      if (timeLeft === 0) {
        setTimeLeft(DEFAULT_TIME_PER_WORD)
        setCurrentWordIndex(currentWordIndex + 1)
      } else {
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timeLeft, paused, currentWordIndex])

  // on the first component mount,
  // fetch the word data
  useEffect(() => {
    async function getData() {
      const response = await fetch('/data/nouns.csv')
      if (!response || !response.body) {
        return
      }
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { delimiter: ', ', header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setNouns(rows)
    }
    getData()
  }, [])

  if (nouns.length === 0) {
    return <div>loading...</div>
  }

  const noun = nouns[currentWordIndex]

  if (!noun) {
    return <div>completed all words</div>
  }

  return (
    <div>
      <div className='controls'>
        <button className='pick-random' onClick={pickRandomNoun}>
          Pick Random Noun
        </button>
        <button
          className='reveal-word'
          onClick={() => setRevealFanglish(!revealFanglish)}
        >
          {revealFanglish ? 'Hide' : 'Reveal'} Fanglish
        </button>
        <button
          className='reveal-word'
          onClick={() => setRevealEnglish(!revealEnglish)}
        >
          {revealEnglish ? 'Hide' : 'Reveal'} English
        </button>
        <button onClick={() => setPaused(!paused)}>
          {paused ? 'Play' : 'Pause'}
        </button>
        {/* <button onClick={nextWord}>Next Word</button> */}
      </div>
      <div className='artifacts'>
        <img src={`/images/${noun.Picture}`} className='word-picture' />
        <br />
        {noun.Farsi && <p>{noun.Farsi}</p>}
        {revealFanglish && <p>{noun.Fanglish}</p>}
        {revealEnglish && <p>{noun.English}</p>}
        {timeLeft} seconds left
        <br />
        {noun.Pronunciation && (
          <audio controls>
            <source src={noun.Pronunciation} type='audio/mpeg' />
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>
    </div>
  )
}
