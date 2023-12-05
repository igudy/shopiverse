import InfoBox from "../users/info-box";
import { userData } from "../../data/data2";
import Search from "../users/search";
import Tables from "../users/tables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FITLER_USERS,
  selectFilterUsers,
} from "../redux/slices/auth/filterSlice";

const Users = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const filteredUsers = useSelector(selectFilterUsers);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(FITLER_USERS({ users, search }));
  }, [dispatch, users, search]);

  return (
    <div>
      <h1 className="text-4xl sm:text-xl font-bold">User Stats</h1>
      <div className="flex justify-between gap-3 sm:flex-col flex-wrap">
        {userData?.map((item, i) => (
          <div key={i}>
            <InfoBox
              className={item.className}
              icon={item.icons}
              text={item.text}
              number={item.number}
            />
          </div>
        ))}
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
