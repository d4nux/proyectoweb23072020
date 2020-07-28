// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDHygiNOBDPJ4mWgMj4XU7rPFkny70aZOU",
    authDomain: "proyectoweb23072020.firebaseapp.com",
    databaseURL: "https://proyectoweb23072020.firebaseio.com",
    projectId: "proyectoweb23072020",
    storageBucket: "proyectoweb23072020.appspot.com",
    messagingSenderId: "727042851738",
    appId: "1:727042851738:web:5589aceea559f08e5db023"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function agregarDatos(user) {
    db.collection("docentes").add({
        nombre: "Danny",
        apellido: "Lopez",
        rol: 0
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Datos agregados correctamente', docRef.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}
