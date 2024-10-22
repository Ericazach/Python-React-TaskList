const TaskItem = ({ task }) => {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{task.done}</p>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

export default TaskItem;
