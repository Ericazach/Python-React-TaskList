import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/tasks");
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({});
  };

  const openEditModal = (task) => {
    console.log("Opening modal for task:", task);
    if (isModalOpen) return;
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const onUpdate = async () => {
    closeModal();
    fetchTasks();
  };

  return (
    <div className="flex flex-col w-1/3 items-center justify-center mt-10 mx-auto">
      <TaskList
        tasks={tasks}
        updateTask={openEditModal}
        updateCallback={onUpdate}
      />
      {isModalOpen && (
        <div className="bg-neutral-200 p-4 rounded-lg absolute">
          <img
            onClick={closeModal}
            src="/assets/images/delete.png"
            alt="close"
            className="w-8 h-8 cursor-pointer"
          />
          <TaskForm existingTask={currentTask} updateCallback={onUpdate} />
        </div>
      )}
    </div>
  );
}

export default App;
