import InfoBox from "../users/info-box";
import Search from "../users/search";
import Tables from "../users/tables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FITLER_USERS,
  selectFilterUsers,
} from "../redux/slices/auth/filterSlice";
import {
  CALC_SUSPENDED_USER,
  CALC_VERIFIED_USER,
} from "../redux/slices/auth/authSlice";
import { FiUserCheck, FiUserMinus, FiUserPlus, FiUsers } from "react-icons/fi";

const Users = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const filteredUsers = useSelector(selectFilterUsers);
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );
  const unverifiedUsers = users.length - verifiedUsers;

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);

  useEffect(() => {
    dispatch(FITLER_USERS({ users, search }));
  }, [dispatch, users, search]);

  return (
    <div>
      <h1 className="text-4xl sm:text-xl font-bold">User Stats</h1>
      <div className="grid grid-cols-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 xl:grid-cols-4 xl:grid-rows-1 lg:gap-4 gap-2">
        <InfoBox
          className={"bg-red-600"}
          icon={<FiUsers />}
          text={"Total Users"}
          number={users.length}
        />
        <InfoBox
          className={"bg-green-600"}
          icon={<FiUserCheck />}
          text={"Verified Users"}
          number={verifiedUsers}
        />
        <InfoBox
          className={"bg-purple-600"}
          icon={<FiUserMinus />}
          text={"Unverified Users"}
          number={unverifiedUsers}
        />
        <InfoBox
          className={"bg-blue-600"}
          icon={<FiUserPlus />}
          text={"Suspended Users"}
          number={suspendedUsers}
        />
      </div>
      {/* Table Top */}
      <div className="flex justify-between mx-2 my-4 items-center">
        <div className="text-3xl">All Users</div>
        <div className="w-[300px]">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div>
        <Tables filteredUsers={filteredUsers} />
      </div>
    </div>
  );
};

export default Users;
