sessionStorage.removeItem("logeado");

function registrarUsuario() {
    let nuevoUsu = document.getElementById('nuevo-usuario').value;
    let nuevaPass = document.getElementById('nueva-clave').value;

    if(nuevoUsu === "" || nuevaPass === "") {
        alert("Por favor, completá todos los campos.");
        return;
    }

    let usuariosGuardados = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

    let existe = usuariosGuardados.find(u => u.usuario === nuevoUsu);
    if (existe || nuevoUsu === "admin") {
        alert("Ese nombre de usuario ya está en uso. Elegí otro.");
        return;
    }

    usuariosGuardados.push({ usuario: nuevoUsu, clave: nuevaPass });
    localStorage.setItem("listaUsuarios", JSON.stringify(usuariosGuardados));

    alert("¡Cuenta creada con éxito! Ahora podés iniciar sesión.");
    window.location.href = "login.html"; 
}

function iniciarSesion() {
    let usu = document.getElementById('usuario').value;
    let pass = document.getElementById('clave').value;

    let usuariosGuardados = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    let usuarioValido = usuariosGuardados.find(u => u.usuario === usu && u.clave === pass);

    if((usu === "admin" && pass === "1234") || usuarioValido) {
        sessionStorage.setItem("logeado", "true"); 
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}