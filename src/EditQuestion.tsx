import React, {Component} from 'react';
import axios from 'axios'
import { number } from 'prop-types';
import { render } from 'react-dom';

interface EditQst {
    value: string,
    savingChanges(): void,
    changeQuestion(): void
}
class EditQuestion extends Component {
    state = {
        value: ""
    }
    
    savingChanges = (newQ: React.FormEvent) => {
        this.setState({value: (newQ.target as HTMLInputElement).value}); 

    }
    changeQuestion = () => {
        axios.patch(`http://localhost:3000/ratingQuestions`,{
            title: this.state.value,
        })
        .then((response) => response.data = this.state.value );            
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