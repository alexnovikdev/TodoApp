const main = (() => {

    const todoForm = document.getElementById("add-input");
    const addInput = document.getElementById("add-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const todoItems = document.querySelectorAll(".todo-item");
    const inputCheckbox = document.querySelector(".checkbox");
    const labelTitle = document.querySelector(".title");
    const inputTextfield = document.querySelector(".textfield");
    const buttonEdit = document.querySelector(".edit");
    const buttonDelete = document.querySelector(".delete");



    function createElement(tag, props, ...children) {
        let element = document.createElement(tag);

        Object.keys(props).forEach(prop => element[prop] = props[prop]);

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === "string") {
                    element.innerHTML = child;
                } else {
                    element.appendChild(child);
                }
            });
        }

        return element;
    }




    function createToDoItem(text) {
        let newCheck = createElement("input", {type: "checkbox", className: "checkbox"});
        let newTitle = createElement("label", {className: "title"}, text);
        let newField = createElement("input", {type: "text", className: "textfield"});
        let newEdit = createElement("button", {className: "edit"}, "Edit");
        let newDelete = createElement("button", {className: "delete"}, "Delete");
        let newItem = createElement("li", {className: "todo-item"}, newCheck, newTitle, newField, newEdit, newDelete);

        return newItem;
    }




    // function createToDoItem(text) {
    //     let newItem = document.createElement("li");
    //     newItem.classList.add("todo-item");

    //     let newCheck = document.createElement("input");
    //     newCheck.type = "checkbox";
    //     newCheck.classList.add("checkbox");

    //     let newTitle = document.createElement("label");
    //     newTitle.classList.add("title");
    //     newTitle.innerHTML = text;

    //     let newField = document.createElement("input");
    //     newField.type = "text";
    //     newField.classList.add("textfield");

    //     let newEdit = document.createElement("button");
    //     newEdit.innerHTML = "Edit";
    //     newEdit.classList.add("edit");

    //     let newDelete = document.createElement("button");
    //     newDelete.innerHTML = "Delete";
    //     newDelete.classList.add("delete");

    //     newItem.appendChild(newCheck);
    //     newItem.appendChild(newTitle);
    //     newItem.appendChild(newField);
    //     newItem.appendChild(newEdit);
    //     newItem.appendChild(newDelete);

    //     return newItem;
    // }




    function toggleTodoItem(e) {
    this.parentElement.classList.toggle("completed"); 
    }
    function editTodoItem(e) {
        let listItem = this.parentElement;
        let textarea = listItem.querySelector(".textfield");
        let title = listItem.querySelector(".title");

        let isEditing = listItem.classList.contains("editing");

        if (isEditing) {
            title.innerHTML = textarea.value;
            this.innerHTML = "Edit";
        } else {
            textarea.value = title.innerHTML;
            this.innerHTML = "Save";
        }

        listItem.classList.toggle("editing");
    }
    function deleteTodoItem(e) {
        todoList.removeChild(this.parentElement);
    }




    function bindEvents(todoItem) {
        let check = todoItem.querySelector(".checkbox");
        let edit = todoItem.querySelector(".edit");
        let deleteBtn = todoItem.querySelector(".delete");

        check.addEventListener("change", toggleTodoItem);
        edit.addEventListener("click", editTodoItem);
        deleteBtn.addEventListener("click", deleteTodoItem);
    }




    function addToDoItem(e) {
        e.preventDefault();

        if (addInput.value === "") {
            alert("enter task name");
            return;
        } else {
            let newToDoItem = createToDoItem(addInput.value);
            addInput.value = "";

            bindEvents(newToDoItem);

            todoList.appendChild(newToDoItem);
        }
    }




    function main() {

        addBtn.addEventListener("click", addToDoItem);

        todoItems.forEach(item => bindEvents(item));

    }

    return main;

})();

main();