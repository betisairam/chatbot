import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getChatRoomData, addChatRoomData } from '../redux/_actions/chat.actions';
import { firestore } from '../config/firebase';
import chatBot from '../assets/chatBot.png'
import ninja from '../assets/ninja.png'
import { Link } from 'react-router-dom';
import { DisplayData } from './DisplayData';


export class Chat extends Component {
    state = {
        chat: ''
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

    handleOnChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }
    handleClick = (e) => {
        const { dispatch } = this.props;
        const data = this.state.chat.trim();
        if (e.key === 'Enter' && data.length) {
            this.setState({ chat: '' })
            const customerDate = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
            const chatQuestion = {
                data,
                date: customerDate,
                chatBot: false
            }
            dispatch(addChatRoomData(chatQuestion))
            let chatBot = firestore.collection('chatBot')
            chatBot.where('question', 'array-contains', data.toLowerCase())
                .get()
                .then(snapshot => {
                    const date = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
                    if (snapshot.empty) {
                        const chatAnswer = {
                            data: "Sorry, Not found any topic according",
                            date,
                            chatBot: true
                        }
                        dispatch(addChatRoomData(chatAnswer))
                        console.log('No matching documents.');
                        return;
                    }
                    snapshot.forEach(doc => {
                        const chatAnswer = {
                            data: doc.data().answer,
                            date,
                            chatBot: true
                        }
                        dispatch(addChatRoomData(chatAnswer))
                    });
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
        }
    }

    render() {
        const { chat } = this.state;
        const { chatData, getData } = this.props;
        const chatContainer = document.getElementsByClassName('chatContainer');
        setTimeout(() => {
                chatContainer[0].scrollTop = chatContainer[0].scrollHeight
        }, 100);
        return (

            <div className="row">
                <div>
                    <Link to='/' className="btn btn-primary stretched-link" style={{ position: "absolute", left: 0 }}>back</Link>
                </div>

                <div className="col-md-6">
                    <div className="chatContainer">
                        {chatData.map((chatContent, index) => {
                            return (
                                <div className="bubbleWrapper" key={index}>
                                    <div className={!chatContent.chatBot ? "inlineContainer own" : "inlineContainer"}>
                                        <img className="inlineIcon" src={!chatContent.chatBot ? ninja : chatBot} alt='img' />
                                        <div className={!chatContent.chatBot ? "otherBubble other" : "ownBubble own"}>
                                            {chatContent.data}
                                        </div>
                                    </div>
                                    <span className={!chatContent.chatBot ? "badge badge-secondary own" : "badge badge-secondary mf-2 other"}> {chatContent.date}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <input type="text" className="form-control" placeholder="Type Here" name="chat" onChange={this.handleOnChange} value={chat} onKeyPress={this.handleClick} />
                    </div>
                </div>

                <div className="tableContainer col-md-6">
                    <DisplayData getData={getData} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const chatData = state.chat.chatData
    const getData = state.chat.getChatData
    return { chatData, getData }
}

export default connect(mapStateToProps)(Chat)
