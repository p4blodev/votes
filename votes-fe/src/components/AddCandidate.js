import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const AddCandidate = () => {
  const [value, setValue] = useState("");
  const { socket } = useSocket();

  const hanldeSubmit = (event) => {
    event.preventDefault();

    if (value.trim().length > 0) {
      socket.emit("add-candidate", { name: value });

      setValue("");
    }
  };

  return (
    <>
      <h3>Add Candidate</h3>
      <form onSubmit={hanldeSubmit}>
        <input
          className="form-control"
          placeholder="New candidate"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
      </form>
    </>
  );
};
