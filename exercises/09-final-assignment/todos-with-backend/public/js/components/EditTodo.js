window.EditTodoForm = React.createClass({
  getInitialState() {
    return {
      editedTask: this.props.task
    }
  },
  componentWillReceiveProps(nextProps){
    // make sure we set the edited task when one is deleted
    this.setState({
      editedTask: nextProps.task
    })
  },
  handleChange: function(e){
    this.setState({ editedTask: e.target.value });
  },
  editTodo(e){
    e.preventDefault();
    $.ajax({
      method: "PATCH",
      url: `/todos/${this.props.id}`,
      data: {todo: {task: this.state.editedTask}},
      dataType: 'json'
    }).done(function(todo){
      this.props.updateTodoContent(todo)
    }.bind(this))
  },
  render(){

    return(
      <div className={this.props.isShowing ? "show" : "hide"}>
        <form onSubmit={this.editTodo}>
          <input type="text" onChange={this.handleChange} value={this.state.editedTask}/>
          <input type="submit" value="Edit"/>
        </form>
      </div>
    )
  }
})

