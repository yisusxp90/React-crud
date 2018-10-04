import React, { Component } from 'react';

class Formulario extends Component {
    tituloRef = React.createRef();
    contenidoRef = React.createRef();
    crearPost = (e) => {
        e.preventDefault();
        const post = {
            title : this.tituloRef.current.value,
            body : this.contenidoRef.current.value,
            userId : 1
        }
        this.props.crearPost(post);
        e.target.reset();
    }
    
    render() { 
        return ( 
            <form className="col-8" onSubmit={this.crearPost}>
                <legend className="text-center">Crear nuevo Post</legend>
                <div className="form-group">
                    <label>Titulo del Post</label>
                    <input type="text" className="form-control" placeholder="titulo" ref={this.tituloRef}/>
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea type="text" className="form-control" placeholder="contenido" ref={this.contenidoRef}/>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
         );
    }
}
 
export default Formulario;