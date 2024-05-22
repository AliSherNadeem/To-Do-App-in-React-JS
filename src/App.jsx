import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  const handleEdit = () => {};

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((items) => {
      return items.id !== id;
    });
    settodos(newTodos);
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo();
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
            className="bg-indigo-500 hover:bg-indigo-800 p-2 py-1 text-sm font-bold rounded-md mx-6"
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
                    value={items.isCompleted}
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={handleEdit}
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
