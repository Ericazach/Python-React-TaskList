import { useForm } from "react-hook-form";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input placeholder="Title" {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}

      <input
        placeholder="Description"
        {...register("description", { required: true })}
      />
      {errors.description && <span>This field is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
