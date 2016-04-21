window.NewTodoForm = React.createClass({
  getInitialState() {
    return {
      newTodoText: ''
    }
  },
  addTodo(event){
    event.preventDefault();
    $.post('/todos', {todo: {task:this.state.newTodoText}},function(newTodo){
      this.props.addNewTodo(newTodo)
      this.setState({newTodoText: ''});
    }.bind(this), "json")
  },
  handleChange: function(e){
    this.setState({ newTodoText: e.target.value });
  },
  render(){
    return(
      <div>
        <form onSubmit={this.addTodo}>
          <input type="text" onChange= {this.handleChange} value={this.state.newTodoText}/>
          <input type="submit" value="Add"/>
        </form>
      </div>
      )
  }
})