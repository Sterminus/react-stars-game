import React, { Component } from 'react';
import Answer from './Answer';
import Stars from './Stars';
import Button from './Button';
import Numbers from './Numbers';


class Game extends Component {
  state = {
     selectedNumbers : [],
     numberOfStars : 0,
     answerIsCorrect : null,
     usedNumbers : [],
     redraws : 5
  };
  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
    this.setState(prevState =>({
      answerIsCorrect : null,
       selectedNumbers : prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  unselectNumber = (clickedNumber) => {
     this.setState(prevState => ({
      answerIsCorrect : null,
        selectedNumbers : prevState.selectedNumbers.filter(number => number !== clickedNumber)
     }))
  };
componentWillMount = () => {
  this.setState(prevState => ({
    numberOfStars :  1 + Math.floor(Math.random() * 9)
  }))
};
checkAnswer = () =>{
 this.setState(prevState => ({
    answerIsCorrect :  prevState.numberOfStars === prevState.selectedNumbers.reduce((acc,n) => acc + n,0)
 }))
};
acceptAnswer = () =>
{
 this.setState(prevState => ({
   usedNumbers : prevState.usedNumbers.concat(prevState.selectedNumbers),
   selectedNumbers :[],
   answerIsCorrect : null,
   numberOfStars :  1 + Math.floor(Math.random() * 9)
 }))
};
redraw = () =>{
  if(this.state.redraws === 0) {return;}
  this.setState(prevState => ({
    selectedNumbers :[],
    answerIsCorrect : null,
    numberOfStars :  1 + Math.floor(Math.random() * 9),
    redraws : prevState.redraws -  1
  }))
};
  render() {
    const {selectedNumbers, numberOfStars,answerIsCorrect,usedNumbers,redraws} = this.state;
    return (
      <div className="container" >
         <h3> Play nine</h3>
         <hr/>
          <div className="row">
              <Stars  numberOfStars={numberOfStars}/>
              <Button selectedNumbers={selectedNumbers} redraws={redraws} redraw={this.redraw} checkAnswer={this.checkAnswer}  acceptAnswer={this.acceptAnswer} answerIsCorrect={answerIsCorrect}/>
              <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
           </div>
           <br />
           <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers}></Numbers>
      </div>
    );
}
}

export default Game;