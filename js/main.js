let library = [];
let nextId = 1;
let readingStates = ["Pendiente", "Leyendo", "Leído"];

function showMenu() {
    return parseInt(prompt(
`Seleccione una opción:
1. Añadir libro
2. Editar libro
3. Eliminar libro
4. Mostrar biblioteca
5. Salir`
    ));
}

function generateBookId() {
    return nextId++;
}

function validateBooksExist() {
    if (library.length === 0) {
        alert("La biblioteca está vacía.");
        return false;
    }
    return true;
}

function askReadingState() {
    let option;
    do {
        option = parseInt(prompt(
`Seleccione el estado de lectura:
1. ${readingStates[0]}
2. ${readingStates[1]}
3. ${readingStates[2]}`
        ));
    } while (isNaN(option) || option < 1 || option > readingStates.length);

    return readingStates[option - 1];
}

function getBookData() {
    let id = generateBookId();
    let title = prompt("Título del libro:");
    let author = prompt("Autor:");
    let year = prompt("Año de publicación:");
    let genre = prompt("Género:");
    let state = askReadingState();

    return [id, title, author, year, genre, state];
}

function addBook(book) {
    library.push(book);
    alert(`Libro "${book[1]}" añadido a la biblioteca.`);
}

function formatBook(book) {
    return `ID: ${book[0]}
Título: ${book[1]}
Autor: ${book[2]}
Año: ${book[3]}
Género: ${book[4]}
Estado de lectura: ${book[5]}\n`;
}

function showBooks() {
    if (!validateBooksExist()) return;

    let message = "📚 Biblioteca:\n\n";
    message += library.map(book => formatBook(book)).join("\n");
    alert(message);
}

function findBookById(id) {
    return library.findIndex(book => book[0] === id);
}

function validateIndex(index) {
    if (index === -1) {
        alert("Libro no encontrado.");
        return false;
    }
    return true;
}

function editBook() {
    if (!validateBooksExist()) return;
    showBooks();

    let id = parseInt(prompt("Ingrese el ID del libro que desea editar:"));
    let index = findBookById(id);

    if (!validateIndex(index)) return;

    let book = library[index];

    let title = prompt("Nuevo título:", book[1]);
    let author = prompt("Nuevo autor:", book[2]);
    let year = prompt("Nuevo año de publicación:", book[3]);
    let genre = prompt("Nuevo género:", book[4]);
    let state = askReadingState();

    library[index] = [book[0], title, author, year, genre, state];
    alert(`Libro con ID "${book[0]}" actualizado.`);
}

function deleteBook() {
    if (!validateBooksExist()) return;
    showBooks();

    let id = parseInt(prompt("Ingrese el ID del libro que desea eliminar:"));
    let index = findBookById(id);

    if (!validateIndex(index)) return;

    let removed = library.splice(index, 1);
    alert(`Libro "${removed[0][1]}" eliminado de la biblioteca.`);
}

let menu = showMenu();

while (menu !== 5) {
    switch (menu) {
        case 1:
            addBook(getBookData());
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
    menu = showMenu();
}

alert("Gracias por usar el Reading Journal. ¡Hasta luego!");
