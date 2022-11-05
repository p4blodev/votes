import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const CandidateList = () => {
  const { socket } = useSocket();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    socket.on("current-candidates", (candidates) => {
      setCandidates(candidates);
    });

    return () => socket.off("current-candidates");
  }, [socket]);

  const handleChange = (event, id) => {
    const newName = event.target.value;

    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id === id) candidate.name = newName;

        return candidate;
      })
    );
  };

  const handleBlur = (id, name) =>
    socket.emit("change-name", {
      id,
      name,
    });

  const vote = (id) => socket.emit("vote-candidate", id);

  const deleteCandidate = (id) => socket.emit("delete-candidate", id);

  const createRows = () => {
    return candidates.map((candidate) => (
      <tr key={candidate.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => vote(candidate.id)}
          >
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={candidate.name}
            onChange={(event) => handleChange(event, candidate.id)}
            onBlur={() => handleBlur(candidate.id, candidate.name)}
          />
        </td>
        <td>
          <h3>{candidate.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteCandidate(candidate.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
