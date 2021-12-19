import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodosAsync,
  removeTodoAsync,
  toggleTodoAsync,
} from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure ? ")) {
      await dispatch(removeTodoAsync(id));
    }
  };

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <ul className="todo-list">
      {filteredTodos.map(({ id, title, completed }) => (
        <li key={id} className={completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={() => handleToggle(id, !completed)}
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
