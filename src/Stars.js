import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);

    return (
        <div className="col-md-6">
          {_.range(numberOfStars).map(i => <i key={i} className="fa fa-star" />)}
         </div>
    )
};

export default Stars;