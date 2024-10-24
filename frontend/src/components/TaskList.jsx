import TaskForm from "./TaskForm";
// import { useState } from "react";

const TaskList = ({ tasks, updateTask, updateCallback }) => {
  // const [localTasks, setLocalTasks] = useState(tasks);

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_task/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const updatedTask = { ...task, done: !task.done };
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      };
      const response = await fetch(
        `http://127.0.0.1:5000/update_task/${task.id}`,
        options
      );
      if (response.status === 200) {
        tasks.map((t) => (t.id === task.id ? updatedTask : t));

        updateCallback();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-[#b9c5cd] mt-10 w-full h-full rounded-xl flex flex-col items-center py-10 gap-5">
      <div className=" flex gap-3 justify-center items-center">
        <img
          src="/assets/images/image.webp"
          alt="to-do"
          className="rounded-full w-16 h-16 md:w-28 md:h-28"
        />
        <h1 className="text-sm md:text-2xl italic text-neutral-600 text-center underline">
          Make tasks fantastic!
        </h1>
      </div>
      <div className="w-full">
        <TaskForm updateCallback={updateCallback} />
      </div>
      <div className="flex flex-col gap-3 w-full px-14 mt-10">
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="flex justify-between items-center gap-3">
              <h1
                className={`text-xl text-center text-[#2596be] font-mono cursor-pointer ${
                  task.done ? "line-through" : ""
                }`}
                onClick={() => toggleTaskStatus(task)}
              >
                {task.title}
              </h1>
              <div className="flex gap-1">
                <button className="" onClick={() => updateTask(task)}>
                  <img
                    src="/assets/images/edit-task.png"
                    alt="edit"
                    className="w-8 h-8"
                  />
                </button>
                <button className="" onClick={() => onDelete(task.id)}>
                  <img
                    src="/assets/images/delete.png"
                    alt="delete"
                    className="w-8 h-8"
                  />
                </button>
                <button className="">
                  {task.done === true && (
                    <img
                      src="/assets/images/check.png"
                      alt="delete"
                      className="w-8 h-8"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
