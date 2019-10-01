import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    requestGetPosts,
    requestGetUsers,
    changeDataNew,
    ChangeAuthorNew,
    requestPostPost,
} from '../actions/postsActions';
import { 
    TextInput, 
    Textarea, 
    Button, 
    Icon, 
    Preloader, 
    Col,
    Row,
    CardPanel,
    Modal,
    Card,
    Select
} from 'react-materialize'

class Posts extends Component {

    constructor (props) {
        super(props);
        this.props.getPosts();
        this.props.getUsers();
        this.handleChange = this.handleChange.bind(this);
        this.changeAuthorNew = this.changeAuthorNew.bind(this);
    }

    handleChange(event) {
        this.props.changeData(event.target.name, event.target.value);
    }
    
    changeAuthorNew(event) {
        this.props.changeAuthor(event.target.value);
        console.log(this.props.new_post_data);
    }

    validateNewPost = () => {
        if (this.props.new_post_data.title === "" || 
            this.props.new_post_data.body === "" ||
            this.props.new_post_data.author === ""
            ) {
                return true;
            }
        return false;
    }

    createNewPost = () => {
        console.log(this.props.new_post_data);
        this.props.postNewPost(this.props.new_post_data);
    }

    formNewPost () {

        let authors = []
        authors = this.props.users.map((u) => {
            return (<option value={u.id}>{u.username}</option>)
        })

        let submitButton = (
                <Button waves="light" disabled={this.validateNewPost()} onClick={this.createNewPost}>
                    Enviar
                    <Icon right>
                    send
                    </Icon>
                </Button>
            )

        return (
            <div>
                
                    <Row>
                        <Col>
                            <TextInput label="Titulo" value={this.props.new_post_data.title} onChange={this.handleChange} name="title"/>
                        </Col>
                        <Col>
                            <Select onChange={this.changeAuthorNew}>{authors}</Select>
                        </Col>
                    </Row>
                    <Row>
                        <Textarea s={12} label="Cuerpo" name="body" value={this.props.new_post_data.body} onChange={this.handleChange}/>
                    </Row>
                    {submitButton}
                
            </div>
        )
    }

    render() {

        let render_posts = [];
        
        render_posts = this.props.posts.map((p) => {
            return (
                <Card
                className = "blue-grey darken-1"
                textClassName = "white-text"
                title = {p.title}
                header = {p.author.username}
                actions = {
                    [ <a>Modificar</a>, <a>Eliminar</a> ]
                }
                >
                {p.body}</Card>
            )
        })
        
        let no_posts;
        if (this.props.posts.length === 0) {
            no_posts = < h3 > Sin entradas para mostrar </h3>
        }
        
        return (
            <Row>
                <Col s={6}>
                    <h1>Posts</h1>
                    {render_posts}
                    {no_posts}
                    <Modal header="Nuevo Post" trigger={<Button>Nuevo Post</Button>}>
                        {this.formNewPost()}
                    </Modal>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users,
        new_post_data: state.new_post_data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {dispatch(requestGetPosts())},
        getUsers: () => {
            dispatch(requestGetUsers())
        },
        changeData: (key, value) => {dispatch(changeDataNew(key,value))},
        changeAuthor: (value) => {dispatch(ChangeAuthorNew(value))},
        postNewPost: (data) => {dispatch(requestPostPost(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);