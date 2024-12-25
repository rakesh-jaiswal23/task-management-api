"use client";

import toast from "react-hot-toast";
import { deleteTask } from "../services/apiTasks";
import { useParams, useRouter } from "next/navigation";

const WarningModal = () => {
  const params = useParams();
  const id = params.Id;
  const navigate = useRouter();
  const { push } = navigate;

  const handleDelete = async () => {
    try {
      
      await deleteTask(id);
      toast.success("Task deleted successfully!"); 
      push("/"); 
    } catch (error) {
      
      toast.error(`Failed to delete the task: ${error.message}`);
      
    }
  };

  function handleCancel() {
    push("/");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this row?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone. Once deleted, the data will be
          permanently removed.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
