"use client";
import  { useState } from "react";
import { addTask } from "../services/apiTasks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddTaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const navigate = useRouter();
  const { push } = navigate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addTask(task);
      if (data) {
        toast.success("Task added  successfully!");
        push("/");
        setTask({ title: "", description: "", status: "pending" });
      }
    } catch (error) {
      toast.error(`Failed to addnew  task: ${error.message}`);
    }
  };

  function handleCancel() {
    push("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Add New Task
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 font-medium mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task description"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="flex justify-between space-x-4 mt-4">
 
  <button
    type="button"
    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none"
    onClick={handleCancel} 
  >
    Cancel
  </button>

  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
  >
    Add Task
  </button>
</div>
      </form>
    </div>
  );
}
