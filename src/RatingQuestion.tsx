import React, {Component} from 'react';
import RatingQuestionOption from './RatingQuestionOption';
import './RatingQuestion.css'
import axios from 'axios'
import EditQuestion from './EditQuestion'


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
}

class RatingQuestion extends Component<RatingQuestionProps, RatingQuestionState> {
  state = {
    selectedOption: null,
    editingTitle: false,
  }

  optionSelected = (option: string) => {
    this.setState({ 
      selectedOption: option,
    });
    axios.patch(`http://localhost:3000/ratingQuestions/${this.props.id}`, {
      answer: option
    })
    .then( (response)=> console.log(response));
  }
  confirmDelete = () => {
    if (window.confirm("Do you want to delete this question?")){
      this.props.deleteQuestion(this.props.id);
    } 
  }
  // confirmEdit = () => {
  //   if (window.confirm("Do you want to edit this question?")){
  //     this.props.editQuestion(this.props.id);
  //   } 
  // }


  beginEditing = () => {
    this.setState({ editingTitle: true })
    console.log("editing")
  }
  
  render(){
    return(
      <div className="ratingQuestion">
        <h3 >{this.props.title} <br/><a href={this.props.link}>More info</a> <br/> <button className="deleteButton" onClick={this.confirmDelete}>Delete Question</button></h3>
        <h3><button onClick={this.beginEditing}>Edit Question</button></h3>
        {this.renderEditForm()}
        <form>
          {this.renderRatingValues()}
        </form>
        <p> Answer: {this.state.selectedOption}</p>
      </div>
    )
  }

  renderRatingValues(){
    let values = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    return values.map((value, i) => <RatingQuestionOption value={value} key={i}  optionSelected={this.optionSelected} />)
  }

  renderEditForm() {
    if (this.state.editingTitle) {
      return <EditQuestion />
    }
  }
}

export default RatingQuestion;