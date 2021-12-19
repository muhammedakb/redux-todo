import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/services";

function Form() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        disabled={loading}
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {loading && <span>Todo is adding...</span>}
      {error && <span>Error: {error}</span>}
    </form>
  );
}

export default Form;
