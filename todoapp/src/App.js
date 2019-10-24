import {
  element,
  render
} from "./view/html-util.js";
import {
  TodoItemModel
} from "./model/TodoItemModel.js";
import {
  TodoListModel
} from "./model/TodoListModel.js";
import {
  TodoListView
} from "./view/TodoListView.js";
// console.log("App.js: loaded");
export class App {
  constructor() {
    this.TodoListModel = new TodoListModel();
    // console.log("App init");
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    this.TodoListModel.onChange(() => {
      const todoItems = this.TodoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({
          id,
          completed
        }) => {
          this.TodoListModel.updateTodo({
            id,
            completed
          });
        },
        onDeleteTodo: ({
          id
        }) => {
          this.TodoListModel.deleteTodo({
            id
          });
        }
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todo item count: ${this.TodoListModel.getTodoItems}`;
    });
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if(inputElement.value == "") return;
      this.TodoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      inputElement.value = "";
    });
  }
}
