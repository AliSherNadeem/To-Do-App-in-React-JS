import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    // delete previous todo after getting him in input field
    let newTodos = todos.filter((items) => {
      return items.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((items) => {
      return items.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((items) => {
      return items.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-lg p-5 bg-indigo-300 text-white min-h-[70vh]">
        <div className="addTodo">
          <h2 className="text-lg font-bold my-4">Add a Task</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2 text-indigo-800 p-0.5 rounded-md"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-green-400 hover:bg-green-600  disabled:bg-red-500 p-2 py-1 text-sm font-bold rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold mt-4">Your Tasks</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-3">No Task to Display</div>}
          {todos.map((items) => {
            return (
              <div
                key={items.id}
                className="todo flex justify-between w-1/4 my-4"
              >
                <div className="flex gap-4">
                  <input
                    name={items.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={items.isCompleted}
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, items.id);
                    }}
                    className="bg-indigo-500 hover:bg-indigo-800 p-2 py-1 text-sm font-bold rounded-md mx-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      handleDelete(e, items.id);
                    }}
                    className="bg-indigo-500 hover:bg-indigo-800 p-2 py-1 text-sm font-bold rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
