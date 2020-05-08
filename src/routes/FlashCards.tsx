import React, { useState, useEffect } from 'react'
import './FlashCards.css'
import { Noun, Verb } from '../types'

interface FlashCardProps {
  revealPicture: boolean
  revealPronunciation: boolean
  revealFanglish: boolean
  revealEnglish: boolean
  revealFarsi: boolean
  word: Noun | Verb
}

function FlashCard({
  revealPicture,
  revealPronunciation,
  revealFanglish,
  revealEnglish,
  revealFarsi,
  word,
}: FlashCardProps) {
  return (
    <div className='flash-card'>
      {revealPicture && word.Picture && (
        <>
          <img
            alt={word.English}
            src={word.Picture}
            className='noun -picture'
          />
          <br />
        </>
      )}
      {revealFarsi && word.Farsi && <p>{word.Farsi}</p>}
      {revealFanglish && word.Fanglish && <p>{word.Fanglish}</p>}
      {revealEnglish && word.English && <p>{word.English}</p>}
      <br />
      {revealPronunciation && word.Pronunciation && (
        <audio controls>
          <source src={word.Pronunciation} type='audio/mpeg' />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  )
}

export default function FlashCards({
  nouns,
  verbs,
}: {
  nouns: Noun[]
  verbs: Verb[]
}) {
  // non-toggleable defaults, for now
  const revealFarsi = true
  const revealPicture = true
  const revealPronunciation = true

  const [nounsOrVerbs, setNounsOrVerbs] = useState('nouns')

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [revealEnglish, setRevealEnglish] = useState(false)
  const [revealFanglish, setRevealFanglish] = useState(false)
  const [paused, setPaused] = useState(false)

  // amount of time you have on each flash card, if the timer is enabled
  const DEFAULT_TIME_PER_WORD = 20
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_PER_WORD)

  const pickRandomWord = (length: number) => {
    const withinArrayMaxIndex = length - 1
    const randomIndex = Math.floor(Math.random() * withinArrayMaxIndex)
    // setRevealEnglish(false)
    setTimeLeft(DEFAULT_TIME_PER_WORD)
    setCurrentWordIndex(randomIndex)
  }

  // const nextNoun  = () => {
  //   setTimeLeft(DEFAULT_TIME_PER_WORD)
  //   setCurrentNoun Index(currentNoun Index + 1)
  // }

  // setup the timer system
  useEffect(() => {
    const interval = setInterval(() => {
      // dont mess with it if the timer is paused
      if (paused) {
        return
      }
      // reset if we hit 0 on the timer
      if (timeLeft === 0) {
        setTimeLeft(DEFAULT_TIME_PER_WORD)
        setCurrentWordIndex(currentWordIndex + 1)
      } else {
        // decrease time left by 1 second otherwise
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)
    // cleanup/ teardown just involves clearing the 1 second interval callback
    return function teardown() {
      clearInterval(interval)
    }
  }, [timeLeft, paused, currentWordIndex])

  // loading state
  if (nouns.length === 0) {
    return <div>loading...</div>
  }

  // TODO: to improve, we prbly shouldn't hit this case where
  // selected noun  doesn't exist in noun  list... just defensive coding
  const wordArray = nounsOrVerbs === 'nouns' ? nouns : verbs
  const word = wordArray[currentWordIndex]

  // main component
  return (
    <div>
      <div className='controls'>
        <button
          onClick={() => {
            setNounsOrVerbs(nounsOrVerbs === 'nouns' ? 'verbs' : 'nouns')
            pickRandomWord(
              nounsOrVerbs === 'nouns' ? verbs.length : nouns.length
            )
          }}
        >
          Switch to {nounsOrVerbs === 'nouns' ? 'verbs' : 'nouns'}
        </button>
        <button
          className='pick-random'
          onClick={() =>
            pickRandomWord(
              nounsOrVerbs === 'nouns' ? nouns.length : verbs.length
            )
          }
        >
          Pick Random Word
        </button>
        <button
          className='reveal-noun '
          onClick={() => setRevealFanglish(!revealFanglish)}
        >
          {revealFanglish ? 'Hide' : 'Reveal'} Fanglish
        </button>
        <button
          className='reveal-noun'
          onClick={() => setRevealEnglish(!revealEnglish)}
        >
          {revealEnglish ? 'Hide' : 'Reveal'} English
        </button>
        <button onClick={() => setPaused(!paused)}>
          {paused ? 'Start Timer' : 'Pause Timer'}
        </button>
        {/* <button onClick={nextNoun }>Next Noun </button> */}
      </div>
      {word && (
        <FlashCard
          word={word}
          {...{
            revealEnglish,
            revealFarsi,
            revealPicture,
            revealPronunciation,
            revealFanglish,
          }}
        />
      )}
      {!word && <p>word not found</p>}
      <p className='time-left'>{timeLeft} seconds left</p>
    </div>
  )
}
