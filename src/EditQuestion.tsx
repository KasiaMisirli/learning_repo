import React, {Component} from 'react';
// import axios from 'axios'
// import { number } from 'prop-types';
// import { render } from 'react-dom';

interface EditQstProps {
  id: number
  changeQuestion(title: string): void
}

interface EditQstState {
  value: string
}

class EditQuestion extends Component<EditQstProps, EditQstState> {
  state = {
    value: ""
  }
  
  savingChanges = (newQ: React.FormEvent) => {
    this.setState({value: (newQ.target as HTMLInputElement).value}); 
  }
  
  changeQuestion = (e : React.FormEvent) => {
    e.preventDefault();
    this.props.changeQuestion(this.state.value)        
  }

  render(){
    return(
      <div>
        <form onSubmit={this.changeQuestion} action="">
          <input onChange={this.savingChanges} value={this.state.value} type="text"/>
          <button type="submit" value="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default EditQuestion