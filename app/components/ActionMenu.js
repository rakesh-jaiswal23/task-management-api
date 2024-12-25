"use client";
import Link from "next/link";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import ViewComponent from "./ViewComponent";
import { useState } from "react";

const ActionMenu = ({ id, isOpen, onToggle }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleView = (data) => {
    setIsPopupOpen(true); 
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };
  {
    isPopupOpen && (
      <ViewComponent
        handleClose={handleClose}
        selectedData={selectedData}
        id={id}
      />
    );
  }

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150"
        onClick={() => onToggle(id)}
      >
        <span className="sr-only">Open menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12h.01M12 12h.01M18 12h.01"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="text-sm text-gray-700">
            <li>
              <Link href={`/PUT/api/tasks/${id}`}>
                <button className="flex items-center px-4 py-2 w-full hover:bg-gray-50 transition duration-150">
                  <FiEdit
                    className="mr-3 text-blue-500"
                    onClick={() => setIsModalOpen(true)}
                  />{" "}
                  Edit
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/Delete/api/tasks/${id}`}>
                <button className="flex items-center px-4 py-2 w-full hover:bg-gray-50 transition duration-150">
                  <FiTrash className="mr-3 text-red-500" /> Delete
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/View/api/tasks/${id}`}>
                <button
                  className="flex items-center px-4 py-2 w-full hover:bg-gray-50 transition duration-150"
                  onClick={handleView}
                >
                  <FiEye className="mr-3 text-green-500" /> View
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
