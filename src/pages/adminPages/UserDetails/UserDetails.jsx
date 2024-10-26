import { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import { useContext } from "react";
import { AdminContext } from "../../../Provider/AdminContext";
function UserDetails() {
  const [usersData, setUsersData] = useState([]);
  const { checkAdmin } = useContext(AdminContext);

  const handleBlock = async (userId) => {
    try {
      const blockresponse = await axios.patch(
        `http://localhost:5000/users/${userId}`,
        { state: "block" }
      );

      if (blockresponse.status >= 200) {
        const blockedData = usersData.map((data) => {
          if (data.id == userId) {
            return blockresponse.data;
          } else {
            return data;
          }
        });

        setUsersData(blockedData);
      }
    } catch (err) {
      console.error("Error ,user Blocking Failed:", err);
    }
  };
  const handleUnBlock = async (userId) => {
    try {
      const blockresponse = await axios.patch(
        `http://localhost:5000/users/${userId}`,
        { state: "active" }
      );

      if (blockresponse.status >= 200) {
        const blockedData = usersData.map((data) => {
          if (data.id == userId) {
            return blockresponse.data;
          } else {
            return data;
          }
        });
        setUsersData(blockedData);
      }
    } catch (err) {
      console.error("Error ,user Blocking Failed:", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:5000/users");
        if (usersResponse.status >= 200) {
          setUsersData(usersResponse.data);
        }
      } catch (err) {
        console.error("Users Data Fetch Error", err);
      }
    };
    fetchUserData();
  }, []);

  if (!checkAdmin) {
    return null;
  }

  return (
    <div>
      <UsersTable
        usersData={usersData}
        handleBlock={handleBlock}
        handleUnBlock={handleUnBlock}
      />
    </div>
  );
}

export default UserDetails;
