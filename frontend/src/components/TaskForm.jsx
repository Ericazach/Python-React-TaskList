import { useState } from "react";

const TaskForm = ({ existingTask = {}, updateCallback }) => {
  const [title, setTitle] = useState(existingTask.title || "");
  const [done, setDone] = useState(existingTask.done || false);

  const updating = Object.entries(existingTask).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_task/${existingTask.id}` : "create_task");
    try {
      const response = await fetch(url, {
        method: updating ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, done: done }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTitle("");
      updateCallback();
      // Handle successful task creation (e.g., clear input, update task list)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-evenly items-center gap-1 w-full px-14"
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="walk the dog..."
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input bg-[#2596be] text-white w-full "
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="done"
          value={done}
          onChange={(e) => setDone(e.target.value)}
          className="hidden"
        />
      </div>

      <button type="submit" className="">
        <img src="/assets/images/add.png" alt="add" className="w-14 h-12" />
      </button>
    </form>
  );
};

export default TaskForm;
