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

var idUsuario = document.getElementById('id');
var txtname = document.getElementById('name');
var apellidos = document.getElementById('apellidos');
var listaDocente = document.getElementById('listaDocente');
var opcion = document.getElementById('rol');

// login y registro
var emailUser = document.getElementById('emailUser');
var passUser = document.getElementById('passUser');

var emailUsuarioLogueado = document.getElementById('emailUsuarioLogueado');

var btnAgregar = document.getElementById('btnAgregar');
var btnActualizar = document.getElementById('btnActualizar');

function agregarDatos(user) {
    leerDatos();
    db.collection("docentes").add({
        nombre: txtname.value,
        apellido: apellidos.value,
        rol: opcion.value
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Datos agregados correctamente', docRef.id);
            limpiarDatos();
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    //console.log(`El nombre es: ${txtname.value} y el apellido es: ${apellidos.value}`);
}

function leerDatos() {
    listaDocente.innerHTML = "";
    btnActualizar.classList.add('d-none');

    db.collection("docentes").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                listaDocente.innerHTML += `
                    <tr>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().apellido}</td>
                        <td>${doc.data().rol}</td>
                        <td>
                            <button onclick="eliminar('${doc.id}')" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                            <button onclick="editar('${doc.id}')" class="btn btn-info"><i class="far fa-edit"></i></button>
                        </td>
                    </tr>           
                `;
            });
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });
}

function eliminar(id) {
    db.collection("docentes").doc(id).delete()
        .then(() => {
            console.log("Documento eliminado");
            leerDatos();
        }).catch((error) => {
            console.error("Error: ", error);
        });
}

function editar(id) {
    btnAgregar.classList.add('d-none');
    btnActualizar.classList.remove('d-none');
    db.collection("docentes").doc(id).get()
        .then((doc) => {
            idUsuario.value = id;
            txtname.value = doc.data().nombre;
            apellidos.value = doc.data().apellido;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}

function actualizarDatos() {
    db.collection("docentes").doc(idUsuario.value).update({
        nombre: txtname.value,
        apellido: apellidos.value,
        rol: opcion.value
    })
        .then(() => {
            limpiarDatos()
            leerDatos();
            btnActualizar.classList.add('d-none');
            btnAgregar.classList.remove('d-none');
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.log("Error: ", error);
        });;

}

function limpiarDatos() {
    txtname.value = "";
    apellidos.value = "";
}

function limpiarDatosLogin() {
    emailUser.value = "";
    passUser.value = "";
}

function registarUsuario() {
    firebase.auth().createUserWithEmailAndPassword(emailUser.value, passUser.value)
        .then(() => {
            console.log("El usuario se ha registrado");
            limpiarDatosLogin();
        })
        .catch(function (error) {
            console.log("Error: ", error.message);
        });
}

function login() {
    var uno = emailUser.value;
    firebase.auth().signInWithEmailAndPassword(uno, passUser.value)
        .then((user) => {
            sessionStorage.setItem('login', user.email);
            window.location.href = 'admin.html';
        })
        .catch(function (error) {
            console.log("Error: ", error.message);
            limpiarDatosLogin();
        });
}

function cerrarSesion() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesion cerrada exitosamente");
            window.location.href = 'index.html';
        }).catch((error) => {
            console.log(error.message)
        });
}

function estado() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            emailUsuarioLogueado.innerHTML = user.email;
        }
        else {
            window.location.href = 'index.html';
        }
    });
}

