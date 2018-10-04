import React, { Component } from 'react';

class SinglePost extends Component {
    
    mostrarPost = (props) => {
        if(!props.post) return null;
        const {title, body, userId} = this.props.post;

        return (
            <React.Fragment>
                <div className="container">
                    <h1 className="text-center">{title}</h1>
                    <p>Autor: {userId}</p>
                    {body}
                </div>
            </React.Fragment>
        )
    }

    render() { 
        
        return ( 
            <div className="col-12 col-md-8">
                {this.mostrarPost(this.props)}
            </div>
         );
    }
}
 
export default SinglePost;