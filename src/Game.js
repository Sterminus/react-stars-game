import React, { Component } from 'react';
import Answer from './Answer';
import Stars from './Stars';
import Button from './Button';
import Numbers from './Numbers';


class Game extends Component {
  render() {
    return (
      <div className="container" >
         <h3> Play nine</h3>
         <hr/>
          <div className="row">
              <Stars />
              <Button/>
              <Answer/>
           </div>
           <br />
           <Numbers></Numbers>
      </div>
    );
}
}

export default Game;