import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Vocabulary from './routes/Vocabulary'
import FlashCards from './routes/FlashCards'

import Header from './components/Header'
import Grammar from './routes/Grammar'
import fetchAndParseCsv from './fetchParseCsv'
import { Word } from './types'

function Home() {
  return <div className='home green'>Learn Farsi :) فارسی</div>
}

const NOUN_DATA_URL =
  'https://raw.githubusercontent.com/Connoropolous/farsi-data/master/nouns.csv'

function App() {
  const defaultNouns: Word[] = []
  const [nouns, setNouns] = useState(defaultNouns)

  // on the first component mount,
  // fetch the word data
  useEffect(() => {
    async function getData() {
      setNouns(await fetchAndParseCsv<Word>(NOUN_DATA_URL))
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
            <FlashCards nouns={nouns} />
          </Route>
          <Route path='/grammar' component={Grammar} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
