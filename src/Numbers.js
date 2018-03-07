import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const numberClassName=(number) => {
            let className = '';
            
            if(props.usedNumbers.indexOf(number) >= 0)
            {
                className = 'used';
            }

            if(props.selectedNumbers.indexOf(number) >= 0)
            {
                className = 'selected';
            }

            return className;
    };
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map( (number, i) =>
                     <span key={i}  
                        className={numberClassName(number)}
                        onClick={() => props.selectNumber(number)}>{number}
                     </span>)}
            </div>
         </div>
    )
};

Numbers.list =  _.range(1,10);

export default Numbers;