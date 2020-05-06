import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const pages = [
    ['/', 'Home'],
    ['/vocabulary', 'Vocabulary'],
    ['/flash-cards', 'Flash Cards'],
    ['/grammar', 'Grammatical Structures'],
  ]

  return (
    <div className='header'>
      <NavLink to='/'>
        <h2 className='green'>Learn Farsi</h2>
      </NavLink>
      <ul>
        {pages.map(([to, name], index) => (
          <li key={index}>
            <NavLink to={to} className='green'>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
