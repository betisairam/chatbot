import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyCaxb4pKl7tLRQBqSbHO8R-XdmGoPY3jiY',
    authDomain: 'chatbot-818b8.firebaseapp.com',
    databaseURL: 'https://chatbot-818b8.firebaseio.com',
    projectId: 'chatbot-818b8',
}

firebase.initializeApp(config)

export const firestore = firebase.firestore() 