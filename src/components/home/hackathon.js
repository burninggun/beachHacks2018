import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    const hackathon={
        height: '120px',
        width: '250px',
        backgroundColor:'lightGray',
        display: "inline-block",
        margin: '5px'
    }
    console.log(props);
    return(

        <Link to={`/event/${props.data.topicId}`} >
            <div style={hackathon} className="d-flex justify-content-center bg-dark " >
                <h6 className=" text-center align-self-center" > {props.data.title}  </h6>
            </div>
        </Link>
    )
}