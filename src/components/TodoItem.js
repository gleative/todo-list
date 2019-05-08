// Generate component quick shortcut: rce (trykk tab)
// Må laste extension, -> ES7 react blablabla het den

// Inline styling så må du ha {{}} Dobbel! 
// Skal du ha inn JS kode i JSX så må du bruke {} også skrive koden inni der

// For styling må du skrive annerledes pga JSX
// Se i getStyle funksjonen. 
// Og her skriver du CSS i CAMELCASE eks: background-color --> backgroundColor

import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Denne er APP level state, fordi vi må sende state changes til APP.js. Her er det ideelt å bruke Redux, Context API osv
export class TodoItem extends Component {
  // Dynamic styling ved bruk av funksjoner
  getStyle = () => {
      return {
          background: '#f4f4f4',
          padding: '10px',
          borderBottom: '1px #ccc dotted',
          // Hvis todo er completed dekorer tekst med line-through
          textDecoration: this.props.todo.completed ? 'line-through' : 'none'
      }
  }

  // Funksjon som venter på event. 
  // Smarteste løsning er å bruke arrow funksjons, slipper stress.
  // Bruker du ikke arrow funksjons så må du binde, ellers får du error
//   toggleComplete = (e) => {
//       console.log(this.props)
//   }

// Siden vi ikke bruker state manager som redux eller context API så blir dette aids, vi skriver markComplete der nede
// Så går vi videre til Todos.js og legger inn en attr som tar inn markComplete. SÅ vi må opp nivåer til vi er fremme til "App.js"

  render() {
    
    // Gjør at vi tar ut verdiene vi vil ha!
    // GJør at vi ikke trenger å skrive "this.props.todo.title" hvergang hvis skal bruke/hente verdi
    const { id, title } = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
             {/* Ved å binde her så blir det mulig å sende verdiene til andre steder, må alltid ha this først, også verdiene du vil sende */}
                <input type="checkbox" onChange={this.props.toggleComplete.bind(this, id, title)}/>
            { title }
            <button onClick={this.props.deleteTodo.bind(this, id)}style={buttonStyle}>x</button>
        </p>
      </div>
    )
  }
}

TodoItem.propTypes = {
    // Et enkelt object 
    todo: PropTypes.object.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
}

// Kan bruke style som variabler
// const itemStyle = {
//     backgroundColor: '#f4f4f4'
// }

const buttonStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
}

export default TodoItem
