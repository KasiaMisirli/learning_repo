import React, { Component } from 'react';
import { render } from 'react-dom';
import { Question } from './QuestionTypes';
import RatingQuestion from './RatingQuestion';
import Form from './Form';
import styles from './style.module.css';
import axios from 'axios'


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

componentDidMount = () => {
  this.fetchQuestions();
  } 

  fetchQuestions = () => {
    axios.get('http://localhost:4567/ratingQuestions')
    .then((response: RatingQuestionsResponse) => 
      this.setState({ data: (response.data as Question[]) })
    )
  }
  
  addQuestion = () => {
    this.fetchQuestions()
  }

  deleteQuestion = (id : number) => {
    axios.delete(`http://localhost:4567/ratingQuestions/${id}`)
     .then((response: {}) => this.fetchQuestions())
     .catch((err: {}) => console.log(err))
  }

  render() {
    return (
      <div className={styles.main}>
        <h1 className={styles.heading}>Survey Yourself !!!</h1>
        {this.renderRatingQuestions()}
        <h3 className={styles.heading}>Add another question?</h3>

        <Form addQuestion={this.addQuestion}/>
      </div>
    );
  }

  renderRatingQuestions = () => {
    return this.state.data.map((x, i) => <RatingQuestion key={i} componentDidMount={this.componentDidMount}
     deleteQuestion={this.deleteQuestion} {...x} />)
  } 
}

render(<App />, document.getElementById('root'));
