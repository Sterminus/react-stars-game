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
componentWillMount = () => {
  this.setState(prevState => ({
    numberOfStars :  1 + Math.floor(Math.random() * 9)
  }))
}
  render() {
    return (
      <div className="container" >
         <h3> Play nine</h3>
         <hr/>
          <div className="row">
              <Stars  numberOfStars={this.state.numberOfStars}/>
              <Button/>
              <Answer selectedNumbers={this.state.selectedNumbers}/>
           </div>
           <br />
           <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}></Numbers>
      </div>
    );
}
}

export default Game;