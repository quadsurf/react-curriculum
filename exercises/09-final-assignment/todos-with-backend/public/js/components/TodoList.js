window.TodoList = React.createClass({
  getInitialState(){
    return {
      todos: []
    }
  },
  updateTodos(todo){
    const idx = this.state.todos.map(v => v.id).indexOf(todo.id)
    this.state.todos[idx] = todo
    this.setState({
      todos: this.state.todos
    })
  },
  removeTodo(todo){
    const idx = this.state.todos.map(v => v.id).indexOf(todo.id)
    this.state.todos.splice(idx,1)
    this.setState({
      todos: this.state.todos
    })
  },
  componentWillMount(){
    $.getJSON("/todos").then(function(todos){
      this.setState({todos})
    }.bind(this))
  },
  addNewTodo(newTodo){
    this.setState({
      todos: this.state.todos.concat(newTodo)
    })
  },
  render(){
    var listTodos = this.state.todos.map((v,i) => {
      return (
        <ul key={i}>
          <Todo id={v.id} updateTodos={this.updateTodos} removeTodo={this.removeTodo} task={v.task} isCompleted={v.is_completed}/>
        </ul>
        )
    })
    return(
      <div>
        <h1>Todos</h1>
          <NewTodoForm addNewTodo={this.addNewTodo}/>
          {listTodos}
      </div>
      )
  }
})

ReactDOM.render(<TodoList/>, document.getElementById("todo_list"))