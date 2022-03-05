const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state, events) => {
    // 컴포넌트 제조기를 받아서 컴포넌트를 생성한다.
    const element = component(targetElement, state, events);
    // 생성된 컴포넌트에서 자식 컴포넌트를 찾는다.
    const childComponents = element.querySelectorAll("[data-component]");

    // 자식 컴포넌트를 찾아서 변환한다.
    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });

    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};
