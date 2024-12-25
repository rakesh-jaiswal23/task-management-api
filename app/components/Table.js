"use client";
import React, { useEffect, useState } from "react";
import { getTasks } from "../services/apiTasks";
import Link from "next/link";
import ActionMenu from "./ActionMenu";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null); // Track the currently open menu

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle menu visibility
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const fetchedData = await getTasks();
        setData(fetchedData);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Task Table</h1>
        <div className="flex justify-end items-center mb-4 gap-4">
          <Link href="/Posts/api/tasks">
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
              Add New Task
            </button>
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none "
          />
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          {!isLoading && !error && (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    ID
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    Name
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    Description
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    Status
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      {row.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.title}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.description}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.status}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      <ActionMenu
                        id={row.id}
                        isOpen={openMenuId === row.id}
                        onToggle={handleMenuToggle}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {isLoading && (
            <div className="flex h-screen fixed top-0 w-screen justify-center  items-center">
              Loading...
            </div>
          )}

          {!!error && (
            <div className="flex h-screen fixed top-0 w-screen justify-center  items-center">
              {error?.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
