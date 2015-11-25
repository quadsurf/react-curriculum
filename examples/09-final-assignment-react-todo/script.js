var TodoList = React.createClass({
  getInitialState: function() {
    return {
      messages: ["eat","sleep","learn react"]
    };
  },
  deleteMessage: function(message){
    this.state.messages.splice(this.state.messages.indexOf(message),1);
    this.setState({
      messages: this.state.messages
    });
  },
  editMessage: function(oldVal, newVal){
    this.state.messages.forEach(function(message){
      if(message === oldVal){
        this.state.messages[this.state.messages.indexOf(message)] = newVal;
        this.setState({
          messages:this.state.messages
        });
      }
    }.bind(this))
  },
  addMessage: function(e){
    e.preventDefault();
    var newMessage = React.findDOMNode(this.refs.newMessage).value;
    var newMessages = this.state.messages.concat([newMessage]);
    this.setState({
      messages:newMessages
    });
    React.findDOMNode(this.refs.newMessage).value = "";
    React.findDOMNode(this.refs.newMessage).focus()
  },
  componentDidMount: function(){
    React.findDOMNode(this.refs.newMessage).focus()
  },
  render: function() {
    var messages = this.state.messages.map(function(message,i) {
      return (
      <div key={i} >
        <Todo ref="todo" message={message} onEdit={this.editMessage} onDelete={this.deleteMessage}/>
      </div>
      )
    }.bind(this));
    return (
      <div className ="container">
        <br />
        <h2>Todo App</h2>
        <form onSubmit={this.addMessage}>
        <input ref="newMessage" type="text" autoFocus/>
        &nbsp;
        <input type="submit" className="btn btn-success" value="add"/>
        </form>
        {messages}
      </div>
    );
  }
});

var Todo = React.createClass({
  getInitialState: function(){
    return {
      show: false,
    }
  },
  handleDelete: function(e){
    e.preventDefault();
    this.props.onDelete(this.props.message)
  },
  toggleEdit: function(){
    this.setState({
      show: !this.state.show
    })
  },
  render: function() {

    return (
      <li> {this.props.message} &nbsp;
        <button className="btn btn-danger btn-xs" onClick= {this.handleDelete}>X</button>
        &nbsp;
        <button className="btn btn-info btn-xs" onClick= {this.toggleEdit}>Edit</button>
        { this.state.show ? <EditTodo  handleEdit={this.props.onEdit} isVisible={this.state.show} value={this.props.message}/> : null }
      </li>
    );
  }
});

var EditTodo = React.createClass({
  getInitialState: function(){
    return {
      newValue: this.props.value,
      isVisible: this.props.isVisible
    }
  },
  changeValue: function(e){
    this.setState({
      newValue: e.target.value
    })
  },
  componentDidMount: function(){
    React.findDOMNode(this.refs.editText).focus()
  },
  handleEdit: function(e){
    e.preventDefault()
    this.props.handleEdit(this.props.value, this.state.newValue)
    this.setState({
      isVisible: false
    })
  },
  render: function(){
    return (
      <div>
      {this.state.isVisible ?
      <div>
        <form onSubmit={this.handleEdit}>
        <input ref="editText" type="text" value={this.state.newValue} onChange={this.changeValue}/>
        <button >Edit</button>
        </form>
      </div>
       : null}
       </div>
    )
  }
})

React.render(<TodoList />,document.body);
