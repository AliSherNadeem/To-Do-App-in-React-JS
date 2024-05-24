import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      settodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.find((i) => i.id === id);
    settodo(t.todo);
    // delete previous todo after getting it in the input field
    let newTodos = todos.filter((items) => items.id !== id);
    settodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((items) => items.id !== id);
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

  const handleCheckbox = (id) => {
    let newtodos = todos.map((items) =>
      items.id === id ? { ...items, isCompleted: !items.isCompleted } : items
    );
    settodos(newtodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-lg p-5 bg-indigo-400 text-white min-h-[80vh] w-1/2">
        <h1 className="font-bold text-center text-xl">
          TaskEase - Navigate Your Tasks with Ease
        </h1>
        <div className="addTodo flex flex-col gap-4">
          <h2 className="text-lg font-bold my-3">Add a Task</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full text-indigo-800 px-3 py-1 rounded-md"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-white disabled:text-indigo-600 p-2 py-1 text-sm font-bold rounded-md mb-2"
          >
            Add
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        Show Finished
        <h2 className="text-lg font-bold mt-4 text-center ">Your Tasks</h2>
        <div className="todos flex flex-col items-center">
          {todos.length === 0 && <div className="m-3">No Task to Display</div>}
          {todos
            .filter((items) => (showFinished ? items.isCompleted : true))
            .map((items) => (
              <div
                key={items.id}
                className="todo flex justify-between w-1/2 my-4"
              >
                <div className="flex gap-4">
                  <input
                    name={items.id}
                    onChange={() => handleCheckbox(items.id)}
                    type="checkbox"
                    checked={items.isCompleted}
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </div>
                </div>
                <div className="buttons flex h-full ml-5">
                  <button
                    onClick={() => handleEdit(items.id)}
                    className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white p-2 py-1 text-sm font-bold rounded-md mx-1"
                  >
                    <MdEditDocument />
                  </button>

                  <button
                    onClick={() => handleDelete(items.id)}
                    className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white p-2 py-1 text-sm font-bold rounded-md mx-1"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
