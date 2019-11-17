window.addEventListener("load",function(){
    this.console.log("It's Works!!");
    observador();
});

document.getElementById('registrar').addEventListener("click",function(){
    registrar();
});

document.getElementById('ingresar').addEventListener("click",function(){
    ingresar();
});



function aparece(user){
    var user=user;
    var contenido=document.getElementById('contenido');
    if(user.emailVerified){
        contenido.innerHTML=`
        <div class="container mt-5">
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
        <button id='cerrar' onclick="cerrar()" class="btn btn-danger">Cerrar sesion</button>
        </div>
        `;
    }
    
}

function registrar(){
    var email=document.getElementById("email").value;
    var contraseña=document.getElementById("contraseña").value;
    firebase.auth().createUserWithEmailAndPassword(email, contraseña).then(function(){
        verificar()
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });   
}

function ingresar(){
    var email1=document.getElementById("email1").value;
    var contraseña1=document.getElementById("contraseña1").value;
    firebase.auth().signInWithEmailAndPassword(email1, contraseña1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log("********************");
          console.log(user.emailVerified);
          console.log("*******************");
          console.log("Existe Usuario  activo");
          aparece(user);
          // ...
        } else {
            console.log("No existe usuario activo");
          // User is signed out.
          // ...
          contenido.innerHTML=`
            <div class="container mt-5">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Sesion no iniciada.</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            </div>
            `;
        }
      });
}



function cerrar(){
    firebase.auth().signOut().then(function(){
        console.log("... Saliendo");
    }).catch(function(error){
        console.log(error)
    })
}

function verificar(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("Enviando correo");
    alert('Cuenta creada y enviada a su correo');
    }).catch(function(error) {
    // An error happened.
    console.log(error);
    });
}
