const CandidateList = require("./candidate-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.candidateList = new CandidateList();
    this.socketEvents();
    // clients = {}
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Connected Client -> ID: ", socket.id);

      socket.emit("current-candidates", this.candidateList.getCandidates());
      socket.on("vote-candidate", (id) => {
        this.candidateList.increaseVotes(id);
        this.io.emit("current-candidates", this.candidateList.getCandidates());
      });

      socket.on("delete-candidate", (id) => {
        this.candidateList.removeCandidate(id);
        this.io.emit("current-candidates", this.candidateList.getCandidates());
      });

      socket.on("change-name", ({ id, name }) => {
        this.candidateList.changeName(id, name);
        this.io.emit("current-candidates", this.candidateList.getCandidates());
      });
      socket.on("add-candidate", ({ name }) => {
        this.candidateList.addCandidate(name);
        this.io.emit("current-candidates", this.candidateList.getCandidates());
      });
    });
  }
}

module.exports = Sockets;
