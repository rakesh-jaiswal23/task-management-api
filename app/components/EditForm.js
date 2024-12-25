"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { updateTask } from "../services/apiTasks";
import toast from "react-hot-toast";

const EditForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [id, setId] = useState(0);
  const navigate = useRouter();
  const { push } = navigate;
  const params = useParams();

  useEffect(() => {
    setId(params?.Id);
  }, [params]);

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
            { label: "Status", name: "status" },
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
