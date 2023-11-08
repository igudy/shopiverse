import React from "react";

const Tables = () => {
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-600 border-b border-gray-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100"
              >
                1
              </th>
              <td className="px-6 py-4">Apple MacBook Pro 17</td>
              <td className="px-6 py-4 bg-gray-500">Laptop</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4 bg-gray-500">
                <a href="#" className="font-medium text-white">
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>
                    <option value="US">Admin</option>
                    <option value="CA">Subscriber</option>
                    <option value="FR">None</option>
                  </select>
                </a>
              </td>

              <td className="px-6 py-4">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
