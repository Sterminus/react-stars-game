import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    return (
        <div className="col-md-6">
          { _.range(props.numberOfStars).map(i => <i key={i} className="fa fa-star" />)}
         </div>
    )
};

export default Stars;