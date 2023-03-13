const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function generateId() {
   return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
   return {
      id,
      task,
      timestamp,
      isCompleted
   }
}

function addTodo() {
   const textTodo = document.getElementById('title').value;
   const timestamp = document.getElementById('date').value;

   const generateID = generateId();
   const todoObjext = generateTodoObject(generateID, textTodo, timestamp, false);
   todos.push(todoObjext);

   document.dispatchEvent(new Event(RENDER_EVENT));
   Swal.fire({
      icon: 'success',
      title: 'Berhasil Menambah Todo',
      text: "Todo baru telah berhasil ditambahkan!",
      showConfirmButton: false,
      timer: 1200
   });
   saveData();
}

function findTodo(todoId) {
   for (const todoItem of todos) {
      if (todoItem.id === todoId) {
         return todoItem;
      }
   }
   return null;
}

function findTodoIndex(todoId) {
   for (index in todos) {
      if (todos[index].id === todoId) {
         return index;
      }
   }
   return -1;
}

function isStorageExist() {
   if (typeof(Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
   }
   return true;
}

function saveData() {
   if (isStorageExist()) {
      const parsed = JSON.stringify(todos);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
   }
}

function loadDataFormStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   let data = JSON.parse(serializedData);

   if (data !== null) {
      for (const todo of data) {
         todos.push(todo);
      }
   }

   document.dispatchEvent(new Event(RENDER_EVENT));
}

function addTaskToCompleted(todoId) {
   const todoTarget = findTodo(todoId);
   if (todoTarget == null) {
      return;
   }
   todoTarget.isCompleted = true;
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
}

function removeTaskFromCompleted(todoId) {
   const todoTarget = findTodoIndex(todoId);
   if (todoTarget === -1) {
      return;
   }
   todos.splice(todoTarget, 1);
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
}

function undoTaskFromCompleted(todoId) {
   const todoTarget = findTodo(todoId);
   if (todoTarget == null) {
      return;
   }
   todoTarget.isCompleted = false;
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
}

function makeTodo(todoObjext) {
   const textTitle = document.createElement('h2');
   textTitle.innerText = todoObjext.task;

   const textTimestamp = document.createElement('p');
   textTimestamp.innerText = todoObjext.timestamp;

   const textContainer = document.createElement('div');
   textContainer.classList.add('inner');
   textContainer.append(textTitle, textTimestamp);

   const container = document.createElement('div');
   container.classList.add('item', 'shadow');
   container.append(textContainer);
   container.setAttribute('id', `todo-${todoObjext.id}`);

   if (todoObjext.isCompleted) {
      const undoButton = document.createElement('button');
      undoButton.classList.add('undo-button');
      undoButton.addEventListener('click', function() {
         undoTaskFromCompleted(todoObjext.id);
      });

      const trashButton = document.createElement('button');
      trashButton.classList.add('trash-button');
      trashButton.addEventListener('click', function() {
         Swal.fire({
            icon: 'success',
            title: 'Status Todo Dihapus',
            text: "Status todo selesai berhasil dihapus!",
            showConfirmButton: false,
            timer: 1200
         });
         removeTaskFromCompleted(todoObjext.id);
      });

      container.append(undoButton, trashButton);
   } else {
      const checkButton = document.createElement('button');
      checkButton.classList.add('check-button');

      checkButton.addEventListener('click', function() {
         addTaskToCompleted(todoObjext.id);
      });

      container.append(checkButton);
   }

   return container;
}

document.addEventListener('DOMContentLoaded', function() {
   const submitForm = document.getElementById('form');
   submitForm.addEventListener('submit', function(event) {
      event.preventDefault();
      addTodo();
   });

   if (isStorageExist()) {
      loadDataFormStorage();
   }
});

document.addEventListener(RENDER_EVENT, function() {
   const uncompletedTODOList = document.getElementById('todos');
   uncompletedTODOList.innerHTML = '';

   const completedTODOList = document.getElementById('completed-todos');
   completedTODOList.innerHTML = '';

   for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) {
         uncompletedTODOList.append(todoElement);
      } else {
         completedTODOList.append(todoElement);
      }
   }
});

document.addEventListener(SAVED_EVENT, function() {
   console.log(localStorage.getItem(STORAGE_KEY));
   
   // Tantangan!
   const buttonChecklist = document.querySelector('.check-button');
   const buttonUndo = document.querySelector('.undo-button');

   if (buttonChecklist) {
      buttonChecklist.addEventListener('click', function() {
         Swal.fire({
            icon: 'success',
            title: 'Todo Telah Diselesaikan',
            text: "Status pengerjaan todo telah selesai!",
            showConfirmButton: false,
            timer: 1200
         });
      });
   }
   if (buttonUndo) {
      buttonUndo.addEventListener('click', function() {
         Swal.fire({
            icon: 'success',
            title: 'Status Todo Berubah',
            text: "Todo berhasil dipindah ke pengerjaan kembali!",
            showConfirmButton: false,
            timer: 1200
         })
      });
   }
});
