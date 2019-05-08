// Component filer SKAL ha uppercase 

import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends React.Component {

    render() {
        // Fungerer som forEach. Vi henter todos JSON objectet fra Todos sin props, og bruker 'map' som gjor at vi kan loope igjennom dataene og fAr de som objekter
        return this.props.todos.map((todo) => (
            // La inn key attr, fordi du får warning når du bruker map, dette gjør at vi får vekk warning
            // TodoItem representerer en item, og i 'todo' attr sA sender vi todo objektet til TodoItem component
            <TodoItem key={todo.id} todo={todo} toggleComplete={this.props.toggleComplete} deleteTodo={this.props.deleteTodo}/>
        ));
    }
}

// Definerer prop typer som Componenten kan ta inn. Dette er som Widgets i Flutter med attributtes den kan ta in
Todos.propTypes = {
    // Denne er required (Merk isRequired) og tar in array
    todos: PropTypes.array.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default Todos;
