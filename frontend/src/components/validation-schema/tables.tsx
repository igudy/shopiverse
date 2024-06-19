import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  selectAllUsers,
  upgradeUser,
} from "../redux/slices/auth/authSlice";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";
import { GrStatusGood } from "react-icons/gr";
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from "../redux/slices/email/emailSlice";
import ReactPaginate from "react-paginate";

const Tables = ({ filteredUsers }) => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [userRoles, setUserRoles] = useState(Array(users.length).fill(""));

  // Get all users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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

  const changeRole = async (e, index) => {
    e.preventDefault();

    const selectedUser = users[index];
    const { _id, email } = selectedUser;

    const currentUserRole = userRoles[index];

    if (!currentUserRole) {
      toast.error("Please select a role");
      return;
    }

    const userData = {
      role: currentUserRole,
      id: _id,
    };

    const emailData = {
      subject: "Account Role Changed - Shopiverse",
      send_to: email,
      reply_to: "noreply@shopiverse",
      template: "changeRole",
      url: "/login",
    };

    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    dispatch(EMAIL_RESET());
  };

  // Pagination
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };
  // End of pagination

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
            {currentItems?.map((user, index) => {
              const { _id, name, email, role } = user;
              return (
                <tr key={_id} className="bg-gray-600 border-b border-gray-400">
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
                    <form onSubmit={(e) => changeRole(e, index)}>
                      <div className="font-medium text-white flex items-center">
                        <select
                          id={`countries-${index}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={userRoles[index]}
                          onChange={(e) => {
                            const updatedRoles = [...userRoles];
                            updatedRoles[index] = e.target.value;
                            setUserRoles(updatedRoles);
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value="admin">Admin</option>
                          <option value="author">Author</option>
                          <option value="subscriber">Subscriber</option>
                          <option value="suspended">Suspended</option>
                        </select>
                        <button type="submit">
                          <GrStatusGood className="mx-2 text-yellow-400 h-10 w-10 cursor-pointer hover:bg-slate-600 hover:rounded-full hover:p-1" />
                        </button>
                      </div>
                    </form>
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
        <div className="justify-center my-5 ">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center mt-4"
            pageLinkClassName="text-purple-500 hover:text-purple-800 px-3 py-1 rounded-md"
            previousLinkClassName="text-purple-500 hover:text-purple-800 px-3 py-1 rounded-md"
            nextLinkClassName="text-purple-500 hover:text-purple-800 px-3 py-1 rounded-md"
            activeClassName="text-white px-3 hover:text-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Tables;
