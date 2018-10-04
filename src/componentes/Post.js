import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';

class Post extends Component {

    confirmarEliminacion = () => {
        const {id} = this.props.info;
        swal({
            title: 'estas seguro de eliminar el resgistro?',
            text: "no se prodra revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.props.borrarPost(id)
            }
          })
    }

    render() { 
        const {id, title} = this.props.info;
        return ( 
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <table>
                        <tbody>
                            <tr>
                                <td style = {{border : 'none'}}><Link to={`/post/${id}`} className="btn btn-primary">Ver</Link></td>
                                <td style = {{border : 'none'}}><Link to={`/editar/${id}`} className="btn btn-warning">Editar</Link></td>
                                <td style = {{border : 'none'}}>
                                    <button className="btn btn-danger" onClick= {this.confirmarEliminacion}>Borrar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>  
                </td>
            </tr>
        );
    }
}
 
export default Post;