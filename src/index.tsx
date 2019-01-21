import React, { Component } from 'react';
import { render } from 'react-dom';
import { Question } from './QuestionTypes';
import RatingQuestion from './RatingQuestion';
import Form from './Form';
import './style.css';
import axios from 'axios'
import "./Form.css"
// import editQuestion from './EditQuestion'

interface RatingQuestionsResponse{
  data: Question[]
}

interface AppState {
  name: string,
  data: Question[] 
}

class App extends Component<{}, AppState> {
  state = {
    name: '',
    data: []
  };

componentDidMount(){
  const axios = require('axios');
  axios.get('http://localhost:3000/ratingQuestions')
    .then((response: RatingQuestionsResponse) => 
      this.setState({ data: (response.data as Question[]) })
    )
  } 
  
  addQuestion = (question: Question) => {
    let newQuestions = (this.state.data as Question[]).concat(question)
    this.setState({data: newQuestions})
  }

  deleteQuestion = (id : number) => {
    let newArray = this.state.data.filter((obj: Question) => { return obj.id !== id});
    this.setState({data: newArray});

    axios.delete(`http://localhost:3000/ratingQuestions/${id}`)
     .then((response: {}) => console.log(response))
     .catch((err: {}) => console.log(err))
  }

  editQuestion = (id : number) => {
    axios.get(`http://localhost:3000/ratingQuestions/${id}`)
     .then((response: {}) => console.log(response))
    
  }

  render() {
    return (
      <div className="main">
        <h1 className="heading">Survey Yourself !!!</h1>
        {this.renderRatingQuestions()}
        <h3 className="heading">Add another question?</h3>
        <Form addQuestion={this.addQuestion}/>
      </div>
    );
  }

  renderRatingQuestions(){
    return this.state.data.map((x, i) => <RatingQuestion key={i} componentDidMount={this.componentDidMount} deleteQuestion={this.deleteQuestion} {...x} />)
  }
  
}

render(<App />, document.getElementById('root'));
