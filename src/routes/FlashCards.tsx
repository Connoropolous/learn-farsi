import React, { useState, useEffect } from 'react'
import './FlashCards.css'
import { Word } from '../types'

interface FlashCardProps {
  revealPicture: boolean
  revealPronunciation: boolean
  revealFanglish: boolean
  revealEnglish: boolean
  revealFarsi: boolean
  word: Word
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
          <img alt={word.English} src={word.Picture} className='word-picture' />
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

export default function FlashCards({ nouns }: { nouns: Word[] }) {
  // non-toggleable defaults, for now
  const revealFarsi = true
  const revealPicture = true
  const revealPronunciation = true

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [revealEnglish, setRevealEnglish] = useState(false)
  const [revealFanglish, setRevealFanglish] = useState(false)
  const [paused, setPaused] = useState(false)

  // amount of time you have on each flash card, if the timer is enabled
  const DEFAULT_TIME_PER_WORD = 20
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_PER_WORD)

  const pickRandomNoun = () => {
    const randomIndex = Math.floor(Math.random() * nouns.length)
    // setRevealEnglish(false)
    setTimeLeft(DEFAULT_TIME_PER_WORD)
    setCurrentWordIndex(randomIndex)
  }

  // const nextWord = () => {
  //   setTimeLeft(DEFAULT_TIME_PER_WORD)
  //   setCurrentWordIndex(currentWordIndex + 1)
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
  // selected word doesn't exist in word list... just defensive coding
  const noun = nouns[currentWordIndex]
  if (!noun) {
    return <div>completed all words</div>
  }

  // main component
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
          {paused ? 'Start Timer' : 'Pause Timer'}
        </button>
        {/* <button onClick={nextWord}>Next Word</button> */}
      </div>
      <FlashCard
        word={noun}
        {...{
          revealEnglish,
          revealFarsi,
          revealPicture,
          revealPronunciation,
          revealFanglish,
        }}
      />
      <p className='time-left'>{timeLeft} seconds left</p>
    </div>
  )
}
