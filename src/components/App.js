import React, { Component } from "react";
import "normalize.css";
import "../styles/main.css";
import {createStore} from "redux";
import reducer from "../reducers/reducer.js";

class App extends Component {
  constructor(props){
    super(props);
    this.store = createStore(reducer);
    this.state = {
      main: {
        currentText: "",
        todoItems: []
      }
    };
  }

  componentDidMount() {
    this.store.subscribe(() => {
      this.setState({
        main: this.store.getState()
      });
    });
  }

  setText() {
    return e => {
      const action = {
        type: "SET_TEXT",
        data: e.target.value
      };

      this.store.dispatch(action);
    }
  }

  addTodo() {
    return () => {
		if(this.state.main.currentText.trim() != "") {
			const action = {
				type: "ADD_TODO",
				data: this.state.main.currentText
			}
			this.store.dispatch(action);
			this.state.main.currentText = "";
		}   
    }
  }
  
  removeTodo(idx) {
	return () => {
		const action = {
			type: "REMOVE_TODO",
			data: idx
		}
		this.store.dispatch(action);
	}  
  }
  
  searchTodo() {
	  return () => {
		  const action = {
			  type: "SEARCH_TODO",
			  data: this.state.main.currentText
		  }
		  this.store.dispatch(action);
	  }
  }

  render() {
    return (
      <div className="app">
        <form className="form-container" onSubmit={e => e.preventDefault()}>
          <input
            className="input-field"
            placeholder={"Task Description"}
            onChange={this.setText()}
            value={this.state.main.currentText}
          />
		  <button
			className="search-btn"
			onClick={this.searchTodo()}
		  >
			{"Search"}
		  </button>
          <button
            className="add-task-btn"
            onClick={this.addTodo()}
          >
            {"Add Task"}
          </button>
        </form>
        <div className="list-container">
          {
            this.state.main.todoItems.map((eachTodo, idx) => (
              <div className="each-todo" key={idx}>
                <span>{eachTodo}</span>
                <button
                  className="delete-icon"
				  onClick={this.removeTodo(idx)}
                >
                  {"X"}
                </button>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
