import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Vocabulary from './Vocabulary'
import FlashCards from './FlashCards'

import Header from './Header'
import Grammar from './Grammar'

function Home() {
  return <div className='home green'>Learn Farsi :) فارسی</div>
}

function App() {
  return (
    <Router>
      <Header />
      <div className='content'>
        <Switch>
          <Route path='/vocabulary' component={Vocabulary} />
          <Route path='/flash-cards' component={FlashCards} />
          <Route path='/grammar' component={Grammar} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
