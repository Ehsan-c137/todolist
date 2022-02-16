"use strict";

// add effect to background when clicking on input
document.body.addEventListener("click", function (e) {
   if (e.target.classList.contains("main-input")) {
      document.body.style.backdropFilter = "brightness(60%)";
   } else {
      document.body.style.backdropFilter = "none";
   }
});
// variables
const addBtn = document.querySelector(".add-todo-btn");
const input = document.querySelector(".main-input");
const todosContainer = document.querySelector(".todos-container");

// event listenres
document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todosContainer.addEventListener("click", deleteTodo);
todosContainer.addEventListener("click", editTodo);

addBtn.disabled = true;
input.addEventListener("keyup", function (k) {
   const item = k.target.value.trim();
   if (item) addBtn.disabled = false;
});

// functions
function addTodo(e) {
   e.preventDefault();
   const html = `<div class="task">
   <p class="task-text">${input.value}</p>
   <div class="btn">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
   </div>
</div>`;
   saveLocalTodos(input.value);
   input.value = "";
   todosContainer.insertAdjacentHTML("beforeend", html);
   addBtn.disabled = true;
}

function deleteTodo(e) {
   const deleteBtn = e.target.classList.contains("delete-btn");

   if (!deleteBtn) return;

   if (deleteBtn) {
      removeLocalTodos(e.target.closest(".task"));
      e.target.closest(".task").remove();
   }
}

function editTodo(e) {
   const checkEditBtn = e.target.classList.contains("edit-btn");
   if (!checkEditBtn) return;

   const taskItem = e.target.closest(".task");
   const taskText = taskItem.querySelector(".task-text");
   const editBtn = taskItem.querySelector(".edit-btn");

   if (checkEditBtn) {
      const editedTodo = document.querySelector(".edit-input");
      if (editBtn.classList.contains("save-btn")) {
         taskText.textContent = editedTodo.value;
         saveLocalTodos(editedTodo.value);

         taskItem.style.backgroundColor = "whitesmoke";
         editBtn.textContent = "Edit";
         editBtn.classList.toggle("save-btn");
      } else {
         const item = taskText.textContent;
         const input = `<input type="text" class="edit-input" placeholder="${item}"></input>`;

         removeLocalTodos(item);

         taskText.textContent = "";
         editBtn.textContent = "Save";

         editBtn.classList.toggle("save-btn");
         taskText.insertAdjacentHTML("afterbegin", input);
         taskItem.style.backgroundColor = "#e6e6e6";
      }
   }
}

function saveLocalTodos(t) {
   let todos;

   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.push(t);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
   let todos;

   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.forEach(function (t) {
      const html = `<div class="task">
   <p class="task-text">${t}</p>
   <div class="btn">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
   </div>
</div>`;

      todosContainer.insertAdjacentHTML("beforeend", html);
   });
}

function removeLocalTodos(t) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   const todoIndex = t.children?.[0].innerText
      ? t.children[0].innerText
      : t.innerText;

   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}
