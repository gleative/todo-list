// Function based component
// shortcut: rfc (tab)

import React from 'react'
import { Link } from 'react-router-dom'

// Dette er som bare å ha en render
export default function Header() {
  return (
    <header style={headerStyle}>
        <h1>TodoList</h1>
        {/* Kan ikke bruke "<a>" tag, her må vi bruke "Link" og istedenfor "href" er det "to" */}
        <Link style={linkStyle} to="/">Home</Link> | 
        <Link style={linkStyle} to="/about"> About</Link>
    </header>
  )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}
