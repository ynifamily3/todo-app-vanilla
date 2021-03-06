let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item");
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index, events) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  element.querySelector("input.edit").value = text;
  element.querySelector("label").textContent = text;

  if (completed) {
    element.classList.add("completed");
    element.querySelector("input.toggle").checked = true;
  }

  element.querySelector("button.destroy").dataset.index = index;

  return element;
};

export default (targetElement, { todos }, events) => {
  const newTodoList = targetElement.cloneNode(true);
  newTodoList.innerHTML = "";
  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  newTodoList.addEventListener("click", (e) => {
    if (e.target.matches("button.destroy")) {
      events.deleteItem(e.target.dataset.index);
    }
  });
  return newTodoList;
};
