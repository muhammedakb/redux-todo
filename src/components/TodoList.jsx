import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  destroy,
  selectFilteredTodos,
} from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure ? ")) {
      dispatch(destroy(id));
    }
  };

  return (
    <ul className="todo-list">
      {filteredTodos.map(({ id, title, completed }) => (
        <li key={id} className={completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={() => dispatch(toggle({ id: id }))}
            />
            <label>{title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
