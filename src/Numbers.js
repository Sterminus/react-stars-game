import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map( (number, i) => <span key={i}>{number}</span>)}
            </div>
         </div>
    )
};

Numbers.list =  _.range(1,10);

export default Numbers;