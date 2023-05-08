import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://textile.torcdeveloper.com/api/v1/dashboard/data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      <div>Dashboard - Successfull Login</div>
      <h1>User name : {user?.user_data?.name}</h1>
    </>
  );
}
