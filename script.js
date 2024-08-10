let currentYear = document.querySelector("#current-year");
currentYear.innerHTML = new Date().getFullYear();

// fetch('http://localhost:3000/todos')
//     .then(response => response.json())
//     .then(data => {
//         // Handle the JSON data here
//         console.log(data);
//     })
//     .catch(error => {
//         // Handle any errors that occurred during the fetch request
//         console.error('Error:', error);

//         -> Learn how to take data from local storage and post it to json server.

//     });

// Get references to DOM elements
const form = document.getElementById("todo-form");
const itemInput = document.getElementById("todo-input");
const itemList = document.getElementById("todo-list");
const addButton = document.getElementById("add-btn");

// Load items from localStorage on page load
loadItems();

// Add item to localStorage and update list
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem !== "") {
        addItem(newItem);
        itemInput.value = "";
    }

    if (newItem === "") {
        alert("Please enter a task");
    }
});

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem !== "") {
        addItem(newItem);
        itemInput.value = "";
    }

    if (newItem === "") {
        alert("Please enter a task");
    }
});

// Delete item from localStorage and update list
itemList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const itemId = e.target.parentElement.id;
        deleteItem(itemId);
    }
});

// Add item to localStorage
function addItem(item) {
    let items = getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    displayItems(items);
}

// Get items from localStorage
function getItems() {
    let items = localStorage.getItem("items");
    return items ? JSON.parse(items) : [];
}

// Display items on page
function displayItems(items) {
    itemList.innerHTML = "";
    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.id = index;
        li.innerHTML = `${item} <button class="delete-btn">Delete Task</button>`;
        itemList.appendChild(li);
    });
}

// Delete item from localStorage
function deleteItem(itemId) {
    let items = getItems();
    items.splice(itemId, 1);
    localStorage.setItem("items", JSON.stringify(items));
    displayItems(items);
}

// Load items from localStorage on page load
function loadItems() {
    const items = getItems();
    displayItems(items);
}