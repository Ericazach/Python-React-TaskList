import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-[#b9c5cd] mt-10 w-full h-full rounded-xl flex flex-col items-center">
      <div className="p-10 flex gap-3 justify-center items-center">
        <img
          src="/assets/images/image.webp"
          alt="to-do"
          className="rounded-full w-16 h-16 md:w-28 md:h-28"
        />
        <h1 className="text-sm md:text-2xl italic text-neutral-600 text-center">
          Make tasks fantastic!
        </h1>
      </div>
      <div>
        <TaskForm />
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
