import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Har du input i component er det smart å ha en state, for å holde på teksten
export default class AddTodo extends Component {
  state = {
      title: '',
  }

  onSubmit = (e) => {
    e.preventDefault(); // Slik at den ikke gjør sin default operasjon
    const value = this.state.title;

    if (value === '') {
        alert('You cannot add a empty todo! Are you craaaazy??');
    } else {
        this.props.addTodo(this.state.title); // Bruker props nå fordi vi må sende den opp hierarkiet
        this.setState({ title: '' }) // Set state til '' slik at input field er tom igjen
    }
    
  }

  // Dette er eksempel på COMPONENT STATE, hvor staten her bare er i component. NOTE NEDE HVORDAN GJØRE MED FLERE INPUTS
  onChange = (e) => this.setState({ title: e.target.value }); // e.target.value gir verdien som er skrevet

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex'} }>
      {/* Må ha onChange fordi state på oppdateres hvergang en endring skjer, ellers får du runtime error */}
        <input 
            type="text" 
            name="title" 
            placeholder="Add Todo..."
            style={{flex: '10', padding: '5px'}}
            value={this.state.title}
            onChange={this.onChange} // Samme hva du kaller metoden jeg valgte onChange
        />
        <input 
            type="submit" 
            value="Submit"
            className="addTodoButton"
            style={{flex: '1'}}
        />
      </form>
    )
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}



// NOTE
// Hvis du har en form med flere input verdier, som navn, email, nummer. Så lager du ikke en onChange funksjon for hver field.Component
// Se https://youtu.be/sBws8MSXN7A?t=4106
