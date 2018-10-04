import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import Editar from './Editar';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


class Router extends Component {

    constructor(props) {
        super(props);

        this.toggleBlocking = this.toggleBlocking.bind(this);
        this.state = {
            blocking: false,
            posts: [],
            cargando : false
        };
    }

    toggleBlocking() {
        this.setState({blocking: !this.state.blocking});
    }


    componentDidMount() {
        this.obtenerPosts();
    }
    obtenerPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res =>{
                this.setState({
                    posts : res.data
                })
            })
    }
    borrarPost = (id) => {
        this.toggleBlocking();
        this.setState({
            cargando : true
        })
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then( res => {
                if(res.status === 200){
                    const posts = [...this.state.posts];
                    let resultado = posts.filter(post => (
                        post.id !== id //no quiero q retorne al q estoy eliminando
                    ));
                    this.setState({
                        posts: resultado
                    })
                    swal(
                        'Eliminado!',
                        'el Post fue eliminado.',
                        'success'
                    )
                }
                this.toggleBlocking();
                this.setState({
                    cargando : false
                })
            }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                  console.log('Request canceled', thrown.message);
                }
              });
    }

    crearPost = (post) => {

        if(post.title === '' || post.body === ''){
            swal({
                title: 'Debe completar los campos',
                type: 'warning',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Ok'
            })
            return null;
        }
        this.toggleBlocking();
        this.setState({
            cargando : true
        })
        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
            .then(res => {
                if(res.status === 201) {
                    swal(
                        'Post Creado!',
                        'Se creo correctamente!',
                        'success'
                    )
                    let postId = {id : res.data.id};
                    const nuevoPost = Object.assign({}, res.data.post, postId);
                    this.setState(prevState => ({
                        posts : [...prevState.posts, nuevoPost] //va a tomar una copia del state anterior y va a agregar el nuevo objeto
                    }))
                }
                this.setState({
                    cargando : false
                })
                this.toggleBlocking();
            })
    }

    editarPost = (postActualizado) => {

        if(postActualizado.title === '' || postActualizado.body === ''){
            swal({
                title: 'Debe completar los campos',
                type: 'warning',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Ok'
            })
            return null;
        }
        this.toggleBlocking();
        this.setState({
            cargando : true
        })

        axios.put(`https://jsonplaceholder.typicode.com/posts/${postActualizado.id}`, {postActualizado})
            .then(res => {
                if(res.status === 200) {
                    let postId = res.data.id;
                    const posts = [...this.state.posts];
                    const postEditar = posts.findIndex(post => postId === post.id);
                    posts[postEditar] = postActualizado;
                    this.setState({
                        posts: posts
                    })
                    swal({
                        title: 'Post Actualizado',
                        text: "se guardaron los cambios!",
                        type: 'success'
                    }).then(function(isConfirm) {
                        if(isConfirm){
                            console.log('entro aca');
                            return <Router to='/'/>;
                        }
                    })

                }
                this.toggleBlocking();
                this.setState({
                    cargando : false
                })
            })
    }

    render() { 
        let resultado;
        const cargando = this.state.cargando;
        if(cargando) {
            resultado = <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
        }
        return ( 
            <BrowserRouter>
                <div className="container">
                    <BlockUi tag="div" blocking={this.state.blocking}>
                        <div className="row justify-content-center">
                            <Header />
                            <Navegacion />
                            <div className="container">
                                {resultado}
                            </div>
                                
                            <Switch>
                                <Route exact path="/" render= { () => {
                                        return (
                                            <Posts 
                                                posts = {this.state.posts} 
                                                borrarPost = {this.borrarPost}/>
                                        )
                                    }} />
                                <Route exact path="/post/:postId" render= { (props) => {
                                    let idPost = props.location.pathname.replace('/post/', '');
                                    const posts = this.state.posts;
                                    let filtro;
                                    filtro = posts.filter(post => (
                                        post.id === Number(idPost)
                                    ))
                                    return (
                                        <SinglePost 
                                            post = {filtro[0]}/>
                                    )
                                }} />

                                <Route exact path="/crear" render= { () => {
                                        return (
                                            <Formulario 
                                                crearPost = {this.crearPost} />
                                        )
                                }} />


                                <Route exact path="/editar/:postId" render= { (props) => {
                                    let idPost = props.location.pathname.replace('/editar/', '');
                                    const posts = this.state.posts;
                                    let filtro;
                                    filtro = posts.filter(post => (
                                        post.id === Number(idPost)
                                    ))
                                    return (
                                        <Editar
                                            editarPost = {this.editarPost}
                                            post = {filtro[0]} />   
                                    )
                                }} />

                            </Switch>
                        </div>
                    </BlockUi>
                </div>
            </BrowserRouter>
            
         );
  
    }

}
export default Router;
