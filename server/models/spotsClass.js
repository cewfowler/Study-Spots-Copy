
// used for initialization of a new study spot
class StudySpot {

  constructor(loc) {
    this.location = loc;
    this.upvotes = 0;
    this.downvotes = 0;

    //availabilit corresponds to UF schedule, boolean corresponding to period it is available
    this.availability = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];
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
  };

  changeAvailability(index) {
    this.availability[index] = !this.availability[index];
  };

  resetAvailability() {
    this.availability = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  };

  getAvailability() {
    return this.availability;
  };
};

module.exports = StudySpot;
