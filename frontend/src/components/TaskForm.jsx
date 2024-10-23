import { useState } from "react";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:5000/create_task";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, done: false }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      // Handle successful task creation (e.g., clear input, update task list)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-center gap-1"
    >
      <div>
        <input
          type="text"
          placeholder="walk the dog..."
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input bg-[#2596be] text-white w-full max-w-xs"
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
        <img src="/assets/images/add.png" alt="add" className="w-12 h-12" />
      </button>
    </form>
  );
};

export default TaskForm;
