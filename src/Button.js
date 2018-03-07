import React from 'react';

const Button = (props) => {
    return (
        <div className="col-sm-1">
            <button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>
         </div>
    )
};

export default Button;