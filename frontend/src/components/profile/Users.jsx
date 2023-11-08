import InfoBox from "../users/info-box";
import { userData } from "../../data/data2";
import Search from "../users/search";
import Tables from "../users/tables";

const Users = () => {
  return (
    <>
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
          <Search />
        </div>
      </div>
      <div>
        <Tables />
      </div>
    </>
  );
};

export default Users;
