import React, {Component} from 'react';
import RatingQuestionOption from './RatingQuestionOption';
import styles from './RatingQuestion.module.css'
import axios from 'axios'
import EditQuestion from './EditQuestion'
import { Question } from './QuestionTypes';


interface RatingQuestionProps {
  id: number,
  title: string,
  link: string,
  answer: string,
  deleteQuestion(id: number): void
  editQuestion(id: number) :void
}

interface RatingQuestionState {
  selectedOption: string | null,
  editingTitle: boolean,
  title: string,
  data: Question[]
}

interface SingleQuestion {
  data: Question[]
}
class RatingQuestion extends Component<RatingQuestionProps, RatingQuestionState> {
  state = {
    selectedOption: null,
    editingTitle: false,
    title: this.props.title,
    data: []
  }

  optionSelected = (option: string) => {
    this.setState({ 
      selectedOption: option,
    });
    axios.patch(`http://localhost:4567/ratingQuestions/${this.props.id}`, {
      answer: option
    })
    .then( (response)=> console.log(response));
  }

  confirmDelete = () => {
    this.props.deleteQuestion(this.props.id);
  } 

  beginEditing = () => {
    this.setState({ editingTitle: true })
    console.log("editing")
  }

  changeQuestion = (title: string) => {
    axios.put(`http://localhost:4567/ratingQuestions/${this.props.id}`,{ title: title })
    .then((response) => this.setState({ title: title, editingTitle: false }) 
    );  
  }

  singleQuestion = () => {
    axios.get(`http://localhost:4567/ratingQuestions/${this.props.id}`)
    .then( (response)=> console.log(response));
  }

  render(){
    return(
      <div className={styles.ratingQuestion}>
        <button onClick={this.singleQuestion} className={styles.showInConsole}>Show data in console</button>
        <h3 className={styles.question}>{this.state.title}</h3><br/>
        <a href={this.props.link} className={styles.linkMoreInfo}>More info</a> <br/> 
        {this.renderEditForm()}
        <form >
          {this.renderRatingValues()}
        </form>
        <p className={styles.answer}> Answer: {this.state.selectedOption}</p>
        <button 
        className={styles.deleteButton} onClick={this.confirmDelete}>Delete Question</button>
        
        <h3><button onClick={this.beginEditing} className={styles.editQuestion}>Edit Question</button></h3>
      </div>
    )
  }

  renderRatingValues = () => {
    let values = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    return values.map((value, i) => <RatingQuestionOption  value={value} key={i}  
    optionSelected={this.optionSelected} />)
  }

  renderEditForm = () => {
    if (this.state.editingTitle) {
      return <EditQuestion id={this.props.id} changeQuestion={this.changeQuestion} />
    }
  }
}

export default RatingQuestion;