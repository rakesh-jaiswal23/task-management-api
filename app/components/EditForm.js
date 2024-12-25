"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { getTaskById, updateTask } from "../services/apiTasks";
import toast from "react-hot-toast";

const EditForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [isLoading,setIsLoading]=useState(false)
  const [id, setId] = useState(0);
  const navigate = useRouter();
  const { push } = navigate;
  const params = useParams();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !formData.title || !formData.status || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const data = await updateTask(id, formData);
      if (data) {
        toast.success("Task updated successfully!");

        push("/");
      }
    } catch (error) {
      toast.error(`Failed to update the task: ${error.message}`);
    }
  };

  function handleCancel() {
    push("/");
  }

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const fetchedData = await getTaskById(id);
        
        const newObj = {
          title: fetchedData?.title,
          description: fetchedData?.description,
          status: fetchedData?.status,
        };
        setFormData(newObj);
      } catch (error) {
        toast.error(`Failed to view the task: ${error.message}`);
      }
      finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setId(params?.Id);
  }, [params]);

  if (isLoading){
    return <div className="h-screen w-screen flex justify-center items-center">Loading...</div>

  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <h5 className="m-0 font-bold text-lg">Edit Table # {id}</h5>
          <div className="cursor-pointer text-gray-500 hover:text-black">
            <FaTimes onClick={handleCancel} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          {[
            { label: "Title", name: "title" },
            { label: "Description", name: "description" },
          ].map((field, idx) => (
            <div key={idx} className="flex items-center mt-4">
              <label className="w-2/5 font-medium">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-3/5 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <label
              htmlFor="status"
              className="w-2/5 font-medium"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
               className="w-3/5 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <footer className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Update Table
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
