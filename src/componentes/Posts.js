import React, { Component } from 'react';
import Listado from './Listado';
class Posts extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="col-16 col-md-10">
                <h2 className="text-center">Posts</h2>
                <Listado 
                    posts={this.props.posts}
                    borrarPost = {this.props.borrarPost}/>
            </div>
         );
    }
}
 
export default Posts;