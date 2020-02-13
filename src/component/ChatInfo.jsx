import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form } from '../common/Form';
import { firestore } from '../config/firebase'
import { Link } from 'react-router-dom';
import { getChatRoomData } from '../redux/_actions/chat.actions';
import { DisplayData } from './DisplayData';


class ChatInfo extends Component {

    state = {
        intent: '',
        intentQuestions: '',
        intentAnswer: ''
    }

    componentDidMount() {
        const { dispatch } = this.props
        let docArray = [];
        firestore.collection('chatBot')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    doc.data().question.forEach(arr => {
                        docArray.push(arr)
                    })
                })
                dispatch(getChatRoomData(docArray))
            })
    }
    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }
    handleButtonClicked = (e) => {
        e.preventDefault();
        const { intent, intentQuestions, intentAnswer } = this.state;
        if (intent && intentAnswer && intentQuestions) {
                const data = {
                    "question": intentQuestions.toLowerCase().split(','),
                    "answer": intentAnswer
                }
                this.ref = firestore.collection('chatBot').doc(intent);
                this.ref.set(data).then((docRef) => {
                    this.setState({
                        intent: '',
                        intentQuestions: '',
                        intentAnswer: ''
                    })
                })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
        }
        else {
            alert("cannot be blank")
        }
    }
    render() {
        const { getData } = this.props;
        const { intent, intentQuestions, intentAnswer } = this.state
        return (
            <div className="row">
                <div className="col-6">


                    <form className="form-group mt-2">

                        <Form.Input
                            name="intent"
                            type="text"
                            className="form-control mb-2"
                            value={intent}
                            onChange={this.handleChange}
                            placeholder="Enter Intent"
                            required={true} />
                        <Form.TextArea
                            name="intentQuestions"
                            type="text"
                            className="form-control mb-2"
                            value={intentQuestions}
                            onChange={this.handleChange}
                            placeholder="Enter Intent Questions separate by comma"
                            required={true} />
                        <Form.Input
                            name="intentAnswer"
                            type="text"
                            className="form-control mb-2"
                            value={intentAnswer}
                            onChange={this.handleChange}
                            placeholder="Enter Intent Answer"
                            required={true} />
                        <div>
                            <button className="btn btn-primary btn-lg mr-2" onClick={this.handleButtonClicked}> add</button>
                            <Link to='/chat' className="btn btn-primary btn-lg" >click here chat with ChatBot</Link>
                        </div>
                    </form>
                    <div>
                        Example
                    </div>
                    <div>
                        <li>Intent :-Reality</li>
                        <li>Intent Questions :-Are you real?, are you real,real</li>
                        <li>Intent Answer :-No I'm chatBot to assist you</li>
                    </div>
                </div>
                <div className="col-6">
                    <DisplayData getData={getData} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    getData: state.chat.getChatData
})



export default connect(mapStateToProps)(ChatInfo)