import React, {Component} from 'react';
import { Question } from './QuestionTypes';
import axios from 'axios'

interface FormProps {
  // This defines a new type called formprops :)
  addQuestion(question: Question): void
}

interface FormState {
  value: string
  link: string
}

interface RatingQuestionResponse{
  data: Question
}


class Form extends Component<FormProps, FormState>{
  state = { 
    value: "",
    link: ""
 }
  

  handleChange = (bob: React.FormEvent) => {
    this.setState({value: (bob.target as HTMLInputElement).value}); 
  }
  
  handleSubmit = (event: React.FormEvent) => {
    if (window.confirm("Are you sure you want to add " + this.state.value)){
        event.preventDefault();
        
        axios.post("http://localhost:/ratingQuestions", {
          title: this.state.value,
          link: this.state.link
        })
          .then( (response: RatingQuestionResponse) => this.props.addQuestion(response.data))
        this.setState({
          value: "",
          link: ""
        })
    }
    
  }    
  handleAddLink = (l: React.FormEvent) => {
    this.setState({link: (l.target as HTMLInputElement).value})
  }
  

  render(){
    return(
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input className="input" placeholder="type in the question" type="text" value={this.state.value} onChange={this.handleChange}/>
          <input placeholder="type in the link" type="text" value={this.state.link} onChange={this.handleAddLink}/>
          <button className="addButton" type="submit" value="submit">Add</button>
          {this.state.value}
        </form>
      </div>
    );
  }
}

export default Form