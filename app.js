if (sessionStorage.getItem("logeado") !== "true") {
    window.location.href = "login.html";
}

let registros = JSON.parse(localStorage.getItem('registros_guardados')) || [];
let contadorId = parseInt(localStorage.getItem('contador_id')) || 1;
let idEditando = null;

window.onload = function() {
    actualizarTabla();
};

function guardarRegistro() {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora_inicio = document.getElementById('hora_inicio').value;
    let hora_fin = document.getElementById('hora_fin').value;
    let proyecto = document.getElementById('proyecto').value;
    let tarea = document.getElementById('tarea').value;
    let tipo_horas = document.getElementById('tipo_horas').value;

    if(nombre === "" || fecha === "" || hora_inicio === "" || hora_fin === "" || proyecto === "" || tarea === "") {
        alert("Faltan completar campos obligatorios");
        return; 
    }

    if (idEditando === null) {
        let nuevoRegistro = {
            id: contadorId, nombre: nombre, fecha: fecha, hora_inicio: hora_inicio,
            hora_fin: hora_fin, proyecto: proyecto, tarea: tarea, tipo_horas: tipo_horas
        };
        registros.push(nuevoRegistro);
        contadorId++;
    } else {
        let registro = registros.find(r => r.id === idEditando);
        if (registro) {
            registro.nombre = nombre;
            registro.fecha = fecha;
            registro.hora_inicio = hora_inicio;
            registro.hora_fin = hora_fin;
            registro.proyecto = proyecto;
            registro.tarea = tarea;
            registro.tipo_horas = tipo_horas;
        }
        
        idEditando = null; 
        document.getElementById('btn-guardar-principal').innerText = "Guardar Registro"; 
    }

    sincronizarDatos();
    limpiarFormulario();
}

function editarRegistro(id) {
    let registro = registros.find(r => r.id === id);
    
    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('fecha').value = registro.fecha;
    document.getElementById('hora_inicio').value = registro.hora_inicio;
    document.getElementById('hora_fin').value = registro.hora_fin;
    document.getElementById('proyecto').value = registro.proyecto;
    document.getElementById('tarea').value = registro.tarea;
    document.getElementById('tipo_horas').value = registro.tipo_horas;

    idEditando = id; 
    document.getElementById('btn-guardar-principal').innerText = "Actualizar Cambios"; 
}

function eliminarRegistro(id) {
    if(confirm("¿Estás seguro de que querés borrar este registro?")) {
        registros = registros.filter(r => r.id !== id);
        
        if (idEditando === id) {
            idEditando = null;
            document.getElementById('btn-guardar-principal').innerText = "Guardar Registro";
            limpiarFormulario();
        }

        sincronizarDatos();
    }
}

function sincronizarDatos() {
    localStorage.setItem('registros_guardados', JSON.stringify(registros));
    localStorage.setItem('contador_id', contadorId.toString());
    actualizarTabla();
}

function actualizarTabla() {
    let tbody = document.getElementById('tablaBody');
    tbody.innerHTML = "";

    registros.forEach(r => {
        let fila = `<tr>
            <td>${r.nombre}</td>
            <td>${r.fecha}</td>
            <td>${r.hora_inicio}</td>
            <td>${r.hora_fin}</td>
            <td>${r.proyecto}</td>
            <td>${r.tarea}</td>
            <td>${r.tipo_horas}</td>
            <td>
                <button class="btn-editar" onclick="editarRegistro(${r.id})">Editar</button>
                <button onclick="eliminarRegistro(${r.id})">Eliminar</button>
            </td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

function limpiarFormulario() {
    document.getElementById('nombre').value = "";
    document.getElementById('fecha').value = "";
    document.getElementById('hora_inicio').value = "";
    document.getElementById('hora_fin').value = "";
    document.getElementById('proyecto').value = "";
    document.getElementById('tarea').value = "";
}

function cerrarSesion() {
    sessionStorage.removeItem("logeado");
    window.location.href = "login.html";
}