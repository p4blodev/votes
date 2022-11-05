const Candidate = require("./candidate");

class CandidateList {
  constructor() {
    this.candidates = [
      new Candidate("Trump"),
      new Candidate("Obama"),
      new Candidate("Biden"),
      new Candidate("Bush"),
    ];
  }

  addCandidate(name) {
    const newCandidate = new Candidate(name);
    this.candidates.push(newCandidate);

    return this.candidates;
  }

  removeCandidate(id) {
    this.candidates = this.candidates.filter((candidate) => candidate.id !== id);
  }

  getCandidates() {
    return this.candidates;
  }

  increaseVotes(id) {
    this.candidates = this.candidates.map((candidate) => {
      if (candidate.id === id) candidate.votes += 1;

      return candidate;
    });
  }

  changeName(id, newName) {
    this.candidates = this.candidates.map((candidate) => {
      if (candidate.id === id) candidate.name = newName;

      return candidate;
    });
  }
}

module.exports = CandidateList;
