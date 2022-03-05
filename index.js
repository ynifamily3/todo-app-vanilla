import getTodos from "./getTodos.js";

import appView from "./view/app.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";

import applyDiff from "./applyDiff.js";

import registry from "./registry.js";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "전체",
};

const events = {
  deleteItem: (index) => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text) => {
    state.todos.push({ text, completed: false });
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.getElementById("root");
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

// window.setInterval(() => {
//   state.todos = getTodos();
//   render();
// }, 1000);

render();
