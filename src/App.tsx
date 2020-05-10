import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Vocabulary from './routes/Vocabulary'
import FlashCards from './routes/FlashCards'

import Header from './components/Header'
import Grammar from './routes/Grammar'
import fetchAndParseCsv from './fetchParseCsv'
import { Noun, Verb, WordType } from './types'

function Home() {
  return <div className='home green'>Learn Farsi :) فارسی</div>
}

const NOUN_DATA_URL =
  'https://raw.githubusercontent.com/Connoropolous/farsi-data/master/nouns.csv'

const VERB_DATA_URL =
  'https://raw.githubusercontent.com/Connoropolous/farsi-data/master/verbs.csv'

function App() {
  const defaultNouns: Noun[] = []
  const [nouns, setNouns] = useState(defaultNouns)
  const defaultVerbs: Verb[] = []
  const [verbs, setVerbs] = useState(defaultVerbs)

  // on the first component mount,
  // fetch the word data
  useEffect(() => {
    async function getData() {
      const nouns = await fetchAndParseCsv<Noun>(NOUN_DATA_URL)
      nouns.forEach((noun) => {
        noun.type = WordType.NOUN
      })
      const verbs = await fetchAndParseCsv<Verb>(VERB_DATA_URL)
      verbs.forEach((verb) => {
        verb.type = WordType.VERB
      })
      setNouns(nouns)
      setVerbs(verbs)
    }
    getData()
  }, [])

  return (
    <Router>
      <Header />
      <div className='content'>
        <Switch>
          <Route path='/vocabulary' component={Vocabulary} />
          <Route path='/flash-cards'>
            <FlashCards nouns={nouns} verbs={verbs} />
          </Route>
          <Route path='/grammar' component={Grammar} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
