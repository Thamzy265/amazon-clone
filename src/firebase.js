import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyADUi0mgQI1VG-GG7BWNhGevNBhR_FNmAA",
	authDomain: "clone-79fec.firebaseapp.com",
	databaseURL: "https://clone-79fec.firebaseio.com",
	projectId: "clone-79fec",
	storageBucket: "clone-79fec.appspot.com",
	messagingSenderId: "244800958776",
	appId: "1:244800958776:web:c3990aa0e233ec3e4611cd",
	measurementId: "G-JTMPZEVTZQ",
});

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth };
