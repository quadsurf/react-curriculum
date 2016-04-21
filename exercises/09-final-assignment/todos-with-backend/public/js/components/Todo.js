window.Todo = React.createClass({
  getInitialState(){
    return {
      editFormShowing: false,
    }
  },
  toggleEditForm(){
    this.setState({
      editFormShowing: !this.state.editFormShowing
    })
  },
  toggleUpdated(e){
    $.ajax({
      method: "PATCH",
      url: `/todos/${this.props.id}`,
      data: {todo: {is_completed: !this.props.isCompleted}},
      dataType: 'json'
    }).done(function(todo){
      this.props.updateTodos(todo)
    }.bind(this))
  },
  updateTodoContent(todo){
    this.props.updateTodos(todo)
    this.toggleEditForm();
  },
  remove(e){
    $.ajax({
      method: "DELETE",
      url: `/todos/${this.props.id}`,
      dataType: 'json'
    }).done(function(todo){
      this.props.removeTodo(todo)
    }.bind(this))
  },
  render(){
      return (
        <div>
          <li className={this.props.isCompleted ? "completed" : ""} onClick={this.toggleUpdated} isCompleted={this.props.isCompleted}>{this.props.task}
          </li>
          <button onClick={this.remove}>X</button>
          <button onClick={this.toggleEditForm}>Toggle Edit</button>
          <EditTodoForm isShowing = {this.state.editFormShowing} id={this.props.id}  updateTodoContent={this.updateTodoContent} task={this.props.task}/>
        </div>
      )
  }
})