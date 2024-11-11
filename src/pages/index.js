"use client";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import Login from "./login";

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  if (token === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {token ? <Dashboard /> : <Login />}
    </>
  );
}
