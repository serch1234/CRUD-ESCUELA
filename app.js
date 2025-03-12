document.addEventListener("DOMContentLoaded", function () {
    obtenerDatos();
    document.getElementById("persona-form").addEventListener("submit", function (event) {
        event.preventDefault();
        agregarDato();
    });
    document.getElementById("modificar-form").addEventListener("submit", function (event) {
        event.preventDefault();
        modificarDato();
    });
});
function obtenerDatos() {
    fetch("/alumnos")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("personas-table");
            tableBody.innerHTML = "";
            data.forEach(dato => {
                let row = `<tr>
                    <td>${dato[0]}</td>
                    <td>${dato[1]}</td>
                    <td>${dato[2]}</td>
                    <td>${dato[3]}</td>
                    <td>${dato[4]}</td>
                    <td>${dato[5]}</td>
                    <td>${dato[6]}</td>
                    <td>${dato[7]}</td>
                    <td>${dato[8]}</td>
                    <td>${dato[9]}</td>
                    <td>${dato[10]}</td>
                    <td>${dato[11]}</td>
                    <td>${dato[12]}</td>
                    <td>${dato[13]}</td>
                    <td>${dato[14]}</td>
                    <td>
                        <button onclick="eliminarDato(${dato[0]})">Eliminar</button>
                        <button onclick="mostrarFormularioModificar(${dato[0]})">Modificar</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
}
function mostrarFormularioModificar(id) {
    fetch(`/alumnos/${id}`)
        .then(response => response.json())
        .then(dato => {
            document.getElementById("modificar-id").value = dato[0]; // Guardar el ID
            document.getElementById("modificar-nombre").value = dato[1];
            document.getElementById("modificar-apellido").value = dato[2];
            document.getElementById("modificar-fecha_nacimiento").value = dato[3];
            document.getElementById("modificar-sexo").value = dato[4];
            document.getElementById("modificar-lenguaje_favorito").value = dato[5];
            document.getElementById("modificar-promedio_primaria").value = dato[6];
            document.getElementById("modificar-promedio_secundaria").value = dato[7];
            document.getElementById("modificar-promedio_preparatoria").value = dato[8];
            document.getElementById("modificar-promedio_actual").value = dato[9];
            document.getElementById("modificar-salario_esperado").value = dato[10];
            document.getElementById("modificar-color_favorito").value = dato[11];
            document.getElementById("modificar-marca_ropa").value = dato[12];
            document.getElementById("modificar-marca_celular").value = dato[13];
            document.getElementById("modificar-materia_favorita").value = dato[14];
        })
        .catch(error => console.error('Error al obtener dato:', error));
}
function agregarDato() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const sexo = document.getElementById("sexo").value;
    const lenguaje_favorito = document.getElementById("lenguaje_favorito").value;
    const promedio_primaria = document.getElementById("promedio_primaria").value;
    const promedio_secundaria = document.getElementById("promedio_secundaria").value;
    const promedio_preparatoria = document.getElementById("promedio_preparatoria").value;
    const promedio_actual = document.getElementById("promedio_actual").value;
    const salario_esperado = document.getElementById("salario_esperado").value;
    const color_favorito = document.getElementById("color_favorito").value;
    const marca_ropa = document.getElementById("marca_ropa").value;
    const marca_celular = document.getElementById("marca_celular").value;
    const materia_favorita = document.getElementById("materia_favorita").value;
    fetch("/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, fecha_nacimiento, sexo, lenguaje_favorito, 
                               promedio_primaria, promedio_secundaria, promedio_preparatoria, 
                               promedio_actual, salario_esperado, color_favorito, 
                               marca_ropa, marca_celular, materia_favorita })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al agregar los datos');
    }).then(() => {
        document.getElementById("persona-form").reset();
        obtenerDatos(); // Obtener datos actualizados
    }).catch(error => console.error(error));
}
function modificarDato() {
    const id = document.getElementById("modificar-id").value;
    const nombre = document.getElementById("modificar-nombre").value;
    const apellido = document.getElementById("modificar-apellido").value;
    const fecha_nacimiento = document.getElementById("modificar-fecha_nacimiento").value;
    const sexo = document.getElementById("modificar-sexo").value;
    const lenguaje_favorito = document.getElementById("modificar-lenguaje_favorito").value;
    const promedio_primaria = document.getElementById("modificar-promedio_primaria").value;
    const promedio_secundaria = document.getElementById("modificar-promedio_secundaria").value;
    const promedio_preparatoria = document.getElementById("modificar-promedio_preparatoria").value;
    const promedio_actual = document.getElementById("modificar-promedio_actual").value;
    const salario_esperado = document.getElementById("modificar-salario_esperado").value;
    const color_favorito = document.getElementById("modificar-color_favorito").value;
    const marca_ropa = document.getElementById("modificar-marca_ropa").value;
    const marca_celular = document.getElementById("modificar-marca_celular").value;
    const materia_favorita = document.getElementById("modificar-materia_favorita").value;
    fetch(`/alumnos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, fecha_nacimiento, sexo, lenguaje_favorito, 
                               promedio_primaria, promedio_secundaria, promedio_preparatoria, 
                               promedio_actual, salario_esperado, color_favorito, 
                               marca_ropa, marca_celular, materia_favorita })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al modificar los datos');
    }).then(() => {
        document.getElementById("modificar-form").reset();
        obtenerDatos(); // Obtener datos actualizados
    }).catch(error => console.error(error));
}
function eliminarDato(id) {
    fetch(`/alumnos/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                obtenerDatos(); // Obtener datos actualizados
            } else {
                throw new Error('Error al eliminar el dato');
            }
        })
        .catch(error => console.error(error));
}
function filtrarDatos() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const tableBody = document.getElementById("personas-table");
    const rows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let found = false;
        for (let j = 1; j < cells.length - 1; j++) { // Start from 1 to skip ID and end at -1 to skip actions
            if (cells[j].textContent.toLowerCase().includes(searchValue)) {
                found = true;
                break;
            }
        }
        rows[i].style.display = found ? "" : "none"; // Show or hide the row
    }
}