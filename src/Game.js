import React, { Component } from 'react';
import Answer from './Answer';
import Stars from './Stars';
import Button from './Button';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';
import _ from 'lodash';

var  possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class Game extends Component {
  static randomNumberOfStart = () => 1 + Math.floor(Math.random() * 9);
  static initialState = () => ( {
    selectedNumbers: [],
    numberOfStars: Game.randomNumberOfStart(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null
  });
  state = Game.initialState();
  resetGame = () => this.setState( Game.initialState());
  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  };
  componentWillMount = () => {
    this.setState(prevState => ({
      numberOfStars: Game.randomNumberOfStart()
    }))
  };
  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  };
  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumberOfStart()
    }),this.updateDoneStatus);
  };
  redraw = () => {
    if (this.state.redraws === 0) { return; }
    this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumberOfStart(),
      redraws: prevState.redraws - 1
    }), this.updateDoneStatus);
  };
  
  possibleSolution = ({numberOfStars, usedNumbers}) => {
       const possibleNumbers = _.range(1,10).filter(number => usedNumbers.indexOf(number) === -1); 

       return possibleCombinationSum(possibleNumbers, numberOfStars);
  };
  updateDoneStatus = () => {
    this.setState(prevState =>{
       if(prevState.usedNumbers.length === 9) {
          return { doneStatus : 'Done ! Nice !!'};
       }
       if(prevState.redraws === 0 && ! this.possibleSolution(prevState)){
          return {doneStatus : 'Game Over !!!'};
       }
    })
  };
  render() {
    const {
      selectedNumbers,
      numberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus }
      = this.state;
    return (
      <div className="container" >
        <h3> Play nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers} redraws={redraws} redraw={this.redraw} checkAnswer={this.checkAnswer} acceptAnswer={this.acceptAnswer} answerIsCorrect={answerIsCorrect} />
          <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        <br />
        {doneStatus
          ?
          <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}></DoneFrame>
          :
          <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers}></Numbers>
        }
      </div>
    );
  }
}

export default Game;