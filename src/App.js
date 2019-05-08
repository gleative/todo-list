import React from 'react';
// import uuid from 'uuid';
import axios from 'axios'; // Bibliotek som gjør det enkelt med get requests. Installert gjennom npm. Vi henter data fra:
                           //https://jsonplaceholder.typicode.com/todos 

// Legger til route slik at brukeren kan gå på forskjellige pages via forskjellige urler 
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Todos from './components/Todos'; // '.' bettyr current folder
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

// CSS
import './App.css';

// Kan ikke bruke 'class' atr i JSX, kun bruke 'className'
class App extends React.Component {

  state = {
    todos: []
  }

  componentDidMount() {
    // Merk i url, har vi lagt til param for å vise færre todos
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15') // returnerer et promise
         .then(response => this.setState({ todos: response.data }));
        
  }

    // todos: [
    //   {
    //     id: uuid.v4(), // Genererer en tilfeldig id. Måtte laste ned uiid gjennom npm
    //     title: 'Take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Dinner with bae',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Meeting with a homie',
    //     completed: false
    //   },
    // ]

  // Toggler om todo er completed eller ikke
  toggleComplete = (id, title) => {
    console.log('Todo with id: ' + id + ' and name: ' + title + ' was toggled.');
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed // Toggler verdien slik at den alltid vil bli motsatt
      }
      return todo;
    }) });
  }

  // Delete Todo
  deleteTodo = (id) => {
    console.log('Deleted todo with id:' + id)

    // Vi tar inn "todos" og ...(spread operator) betyr at den skal kopiere listen og vi skal filtrere slik at de som gjenstår er dem som ikke matcher iden som ble trykket.
    // Siden todo 1 er her, så tar vi vare på alle som ikke matcher den iden.
    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]})

    // Merk at det ikke er ' men en annen
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title, // Er det samme som title: title. Dette går pga E6 og de har lik navn
    //   completed: false,
    // }
    console.log('Submitted new todo: ' + title);

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title, 
      completed: false
    })
      .then(response => this.setState({ todos: [...this.state.todos, response.data] }));
    
  }

  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            {/* Path er bare / som betyr at dette er index. Og "exact" er lagt inn, slik at den ikke vises 
                når bruker navigerer på andre. Uten exact så hadde "/about" vist alt som er i den, pluss about. */}
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />

                {/* Legger inn todos inn i componenten, tenk todos i grønn er attributt som HTML, og vi gir den "todos" som var liste over todos 
                Vi legger det inn her som en prop */}
                <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} deleteTodo={this.deleteTodo} />
              </React.Fragment>
            )} />
            {/* Legger du inn /about i url så vil du bli navigert til den siden */}
            <Route path="/about" component={About} />
            
          </div>
        </div>
      </Router>
    );
  }
  
}

export default App;
