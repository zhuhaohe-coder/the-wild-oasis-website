"use client";
import { useState } from "react";

export default function Counter({ user }: any) {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>there are {user.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </>
  );
}
