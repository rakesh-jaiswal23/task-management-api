"use client";
import { useEffect, useState } from "react";
import { getTaskById } from "../services/apiTasks";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ViewComponent = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useRouter();
  const { push } = navigate;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getTaskById(id);
        setData(fetchedData);
      } catch (error) {
        toast.error(`Failed to view the task: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  function handleClose() {
    push("/");
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-lg w-1/2 p-6">
        
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={handleClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          View Details # {id}
        </h2>

        {/* Display Data */}
        <div className="space-y-4">
          {Object.keys(data || {}).map((key) => (
            <div key={key} className="flex">
              <span className="font-medium text-gray-600 w-1/3">{key}:</span>
              <span className="text-gray-700">{data[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewComponent;
