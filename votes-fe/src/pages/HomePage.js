import { useSocket } from "../hooks/useSocket";
import { AddCandidate } from "../components/AddCandidate";
import { CandidateList } from "../components/CandidateList";
import { VotingChart } from "../components/VotingChart";

function HomePage() {
  const { onLine } = useSocket();

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {onLine ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Vote candidates</h1>
      <hr />
      <div className="row">
        <div className="col">
          <VotingChart />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <CandidateList />
        </div>
        <div className="col-4">
          <AddCandidate />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
