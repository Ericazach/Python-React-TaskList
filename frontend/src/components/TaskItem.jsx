const TaskItem = ({ task }) => {
  return (
    <div className="flex justify-between items-center gap-3">
      {/* <input type="checkbox" className="checkbox checkbox-success" /> */}
      <h1 className="text-xl text-center text-[#2596be] font-mono ">
        {task.title}
      </h1>
      <div className="flex gap-1">
        <button className="">
          <img
            src="/assets/images/edit-task.png"
            alt="edit"
            className="w-8 h-8"
          />
        </button>
        <button className="">
          <img
            src="/assets/images/delete.png"
            alt="delete"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
