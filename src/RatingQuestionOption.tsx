import React, { Component } from 'react';
import './RatingQuestionOption.css'

interface RatingQuestionOptionProps {
  optionSelected(value: string): void
  value: string,
}

class RatingQuestionOption extends Component<RatingQuestionOptionProps> {

  optionSelected = (event: React.FormEvent) => {
    this.props.optionSelected((event.target as HTMLInputElement).value);
  }

  render(){
    return(
      <div className="ratingQuestionOption">
        <input type="radio" name="question" value={this.props.value} onChange={this.optionSelected} /> {this.props.value} <br /> 
        {/* options */}
      </div>
    )
  }
}

export default RatingQuestionOption;