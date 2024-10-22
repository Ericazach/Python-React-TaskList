import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks");
    const data = await response.json();
    setTasks(data.tasks);
    console.log(data.tasks);
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
