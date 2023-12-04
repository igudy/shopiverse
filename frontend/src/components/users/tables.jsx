import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  selectAllUsers,
  selectUser,
} from "../redux/slices/auth/authSlice";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";

const Tables = () => {
  const dispatch = useDispatch();

  // Get all users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users = useSelector(selectAllUsers);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeUser(id),
        },
        {
          label: "No",
          onClick: () => toast.success("User not deleted"),
        },
      ],
    });
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-2xl">
        <table className="w-full text-sm text-left text-gray-100 dark:text-gray-100">
          <thead className="text-xs text-white uppercase bg-gray-600 border-b border-gray-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-500">
                s/n
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-500">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-500">
                Change Row
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              const { _id, name, email, role } = user;
              return (
                <tr
                  key={index}
                  className="bg-gray-600 border-b border-gray-400"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100"
                  >
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{name}</td>
                  <td className="px-6 py-4 bg-gray-500">{email}</td>
                  <td className="px-6 py-4">{role}</td>
                  <td className="px-6 py-4 bg-gray-500">
                    <div className="font-medium text-white">
                      <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Select</option>
                        <option value="US">Admin</option>
                        <option value="CA">Subscriber</option>
                        <option value="FR">None</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">Edit</td>
                  <td
                    className="px-6 py-4 cursor-pointer hover:bg-gray-400"
                    onClick={() => confirmDelete(_id)}
                  >
                    <MdDelete width={40} height={40} className="mx-auto" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
