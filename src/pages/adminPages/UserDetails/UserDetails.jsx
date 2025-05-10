import { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/userSlice";
function UserDetails() {
  const [usersData, setUsersData] = useState([]);

  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getAllUsers()).unwrap();
        setUsersData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <div className="user-container">
      <UsersTable usersData={usersData} setUsersData={setUsersData} />
    </div>
  );
}

export default UserDetails;
