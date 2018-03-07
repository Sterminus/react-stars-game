import React, { Component } from 'react';
import Answer from './Answer';
import Stars from './Stars';
import Button from './Button';
import Numbers from './Numbers';


class Game extends Component {
  state = {
     selectedNumbers : [],
     numberOfStars : 0
  };
  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
    this.setState(prevState =>({
       selectedNumbers : prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  unselectNumber = (clickedNumber) => {
     this.setState(prevState => ({
        selectedNumbers : prevState.selectedNumbers.filter(number => number !== clickedNumber)
     }))
  }
componentWillMount = () => {
  this.setState(prevState => ({
    numberOfStars :  1 + Math.floor(Math.random() * 9)
  }))
}
  render() {
    const {selectedNumbers, numberOfStars} = this.state;
    return (
      <div className="container" >
         <h3> Play nine</h3>
         <hr/>
          <div className="row">
              <Stars  numberOfStars={numberOfStars}/>
              <Button selectedNumbers={selectedNumbers}/>
              <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
           </div>
           <br />
           <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}></Numbers>
      </div>
    );
}
}

export default Game;