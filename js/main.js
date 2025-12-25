let library = [];
let nextId = 1;
let readingStates = ["Pendiente", "Leyendo", "Leído"];

const ID = 0;
const TITLE = 1;
const AUTHOR = 2;
const YEAR = 3;
const GENRE = 4;
const STATE = 5;

function showMenu() {
    let option;
    do {
        option = parseInt(prompt(
`Seleccione una opción:
1. Añadir libro
2. Editar libro
3. Eliminar libro
4. Mostrar biblioteca
5. Salir`
        ));
    } while (isNaN(option) || option < 1 || option > 5);
    return option;
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

function askNonEmptyText(message) {
    let value;
    do {
        value = prompt(message);
    } while (!value || value.trim() === "");
    return value.trim();
}

function askValidYear() {
    let year;
    do {
        year = parseInt(prompt("Año de publicación:"));
    } while (isNaN(year) || year <= 0);
    return year;
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
    let title = askNonEmptyText("Título del libro:");
    let author = askNonEmptyText("Autor:");
    let year = askValidYear();
    let genre = askNonEmptyText("Género:");
    let state = askReadingState();

    return [id, title, author, year, genre, state];
}

function addBook(book) {
    library.push(book);
    alert(`Libro "${book[TITLE]}" añadido a la biblioteca.`);
}

function formatBook(book, index) {
    return `${index + 1}. ID: ${book[ID]}
Título: ${book[TITLE]}
Autor: ${book[AUTHOR]}
Año: ${book[YEAR]}
Género: ${book[GENRE]}
Estado de lectura: ${book[STATE]}\n`;
}

function showBooks() {
    if (!validateBooksExist()) return;

    let message = "📚 Biblioteca:\n\n";
    for (let i = 0; i < library.length; i++) {
        message += formatBook(library[i], i);
    }
    alert(message);
}

function findBookIndexById(id) {
    for (let i = 0; i < library.length; i++) {
        if (library[i][ID] === id) {
            return i;
        }
    }
    return -1;
}

function selectBookIndex() {
    if (!validateBooksExist()) return -1;
    showBooks();

    let id = parseInt(prompt("Ingrese el ID del libro:"));
    let index = findBookIndexById(id);

    if (index === -1) {
        alert("Libro no encontrado.");
    }
    return index;
}

function editBook() {
    let index = selectBookIndex();
    if (index === -1) return;

    let book = library[index];

    let title = askNonEmptyText("Nuevo título:");
    let author = askNonEmptyText("Nuevo autor:");
    let year = askValidYear();
    let genre = askNonEmptyText("Nuevo género:");
    let state = askReadingState();

    library[index] = [book[ID], title, author, year, genre, state];
    alert(`Libro con ID "${book[ID]}" actualizado.`);
}

function deleteBook() {
    let index = selectBookIndex();
    if (index === -1) return;

    let removed = library.splice(index, 1);
    alert(`Libro "${removed[0][TITLE]}" eliminado de la biblioteca.`);
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
    }
    menu = showMenu();
}

alert("Gracias por usar el Reading Journal. ¡Hasta luego!");
