
// used for initialization of a new study spot
class StudySpot {

  constructor(loc) {
    this.location = loc;
    this.upvotes = 0;
    this.downvotes = 0;
    //binary availability: set to 1 for taken, 0 for open
    this.availability = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  //methods for incrementing/decrementing upvotes and downvotes
  upVote() {
    this.upvotes++;
  };

  removeUpVote() {
    this.upvotes--;
  };

  getUpVotes() {
    return this.upvotes;
  };

  downVote() {
    this.downvotes++;
  };

  removeDownVote() {
    this.downvotes--;
  };

  getDownVotes() {
    return this.downVotes;
  }
};
