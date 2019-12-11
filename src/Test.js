import React from 'react';

function Test(props) {

    return(
        <div>
            <p>{props.potato}</p>
            <Other pizza={props.potato} />
            
        </div>
    );
}
function Other(props) {
    return(
        <div>
            <h1>{props.pizza}</h1>
        </div>
    );
}
export default Test;