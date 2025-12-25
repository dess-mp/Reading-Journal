let biblioteca = [];
let nextId = 1;
let estadosLectura = ["Pendiente", "Leyendo", "Leído"];

function mostrarMenu() {
    return parseInt(prompt(
`Seleccione la acción a realizar:
1. Añadir libro
2. Editar libro
3. Eliminar libro
4. Mostrar biblioteca
5. Salir`
    ));
}

function generarIDLibro() {
    return nextId++;
}

function validarExistenLibros() {
    if (biblioteca.length === 0) {
        alert("No hay libros en la biblioteca.");
        return false;
    }
    return true;
}

function pedirEstadoLectura() {
    let opcion;
    do {
        opcion = parseInt(prompt(
`Seleccione el estado de lectura:
1. ${estadosLectura[0]}
2. ${estadosLectura[1]}
3. ${estadosLectura[2]}`
        ));
    } while (isNaN(opcion) || opcion < 1 || opcion > estadosLectura.length);

    return estadosLectura[opcion - 1];
}

function getBookData() {
    let id = generarIDLibro();
    let titulo = prompt("Título del libro:");
    let autor = prompt("Autor:");
    let año = prompt("Año de publicación:");
    let genero = prompt("Género:");
    let estado = pedirEstadoLectura();

    return [id, titulo, autor, año, genero, estado];
}

function addBook(nuevoLibro) {
    biblioteca.push(nuevoLibro);
    alert(`Libro "${nuevoLibro[1]}" añadido a la biblioteca.`);
}

function showBooks() {
    if (!validarExistenLibros()) return;

    let message = "📚 Biblioteca:\n\n";

    for (let i = 0; i < biblioteca.length; i++) {
        let book = biblioteca[i];
        message += 
`ID: ${book[0]}
Título: ${book[1]}
Autor: ${book[2]}
Año: ${book[3]}
Género: ${book[4]}
Estado de lectura: ${book[5]}\n\n`;
    }

    alert(message);
}

function editBook() {
    if (!validarExistenLibros()) return;
    showBooks();

    let busquedaID = parseInt(prompt("Ingrese el ID del libro que desea editar:"));

    let index = biblioteca.findIndex(book => book[0] === busquedaID);

    if (index === -1) {
        alert(`Libro con ID "${busquedaID}" no encontrado.`);
        return;
    }

    let libro = biblioteca[index];

    let nuevoTitulo = prompt("Nuevo título:", libro[1]);
    let nuevoAutor = prompt("Nuevo autor:", libro[2]);
    let nuevoAño = prompt("Nuevo año de publicación:", libro[3]);
    let nuevoGénero = prompt("Nuevo género:", libro[4]);
    let nuevoEstado = pedirEstadoLectura();

    biblioteca[index] = [
        libro[0],
        nuevoTitulo,
        nuevoAutor,
        nuevoAño,
        nuevoGénero,
        nuevoEstado
    ];

    alert(`Libro con ID "${libro[0]}" actualizado.`);
}

function deleteBook() {
    if (!validarExistenLibros()) return;
    showBooks();

    let busquedaID = parseInt(prompt("Ingrese el ID del libro que desea eliminar:"));

    let index = biblioteca.findIndex(book => book[0] === busquedaID);

    if (index === -1) {
        alert(`Libro con ID "${busquedaID}" no encontrado.`);
        return;
    }

    let eliminado = biblioteca.splice(index, 1);
    alert(`Libro "${eliminado[0][1]}" eliminado de la biblioteca.`);
}

let menu = mostrarMenu();

while (menu !== 5) {
    switch (menu) {
        case 1:
            let nuevoLibro = getBookData();
            addBook(nuevoLibro);
            break;
        case 2:
            editBook();
            break;
        case 3:
            deleteBook();
            break;
        case 4:
            showBooks();
            break;
        default:
            alert("Opción no válida. Seleccione del 1 al 5.");
    }

    menu = mostrarMenu();
}

alert("Gracias por usar el Reading Journal. ¡Hasta luego!");
