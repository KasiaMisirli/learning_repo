import React, {Component} from 'react';
import { Question } from './QuestionTypes';
import axios from 'axios'
import styles from './Form.module.css'

interface FormProps {
  addQuestion(): void
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
    event.preventDefault();
    axios.post("http://localhost:4567/ratingQuestions", {
      title: this.state.value,
      link: this.state.link
    })
      .then( (response: RatingQuestionResponse) => this.props.addQuestion())
      this.setState({
        value: "",
        link: ""
    })
  }    

  handleAddLink = (l: React.FormEvent) => {
    this.setState({link: (l.target as HTMLInputElement).value})
  }
  
  render(){
    return(
      <div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input className={styles.input} placeholder="  type in the question" type="text" 
          value={this.state.value} onChange={this.handleChange}/>
          <input className={styles.input} placeholder="  paste the link" type="text" 
          value={this.state.link} onChange={this.handleAddLink}/>
          <button className={styles.addButton} type="submit" value="submit">Add new question</button>
        </form>
      </div>
    );
  }
}

export default Form