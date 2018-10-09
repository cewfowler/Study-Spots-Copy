
// used for initialization of a new study spot
exports.StudySpot = function(loc) {
  this.location = loc;
  this.upvotes = 0;
  this.downvotes = 0;
};


//methods for incrementing/decrementing upvotes and downvotes
StudySpot.prototype.upVote = function() {
  this.upvotes++;
};

StudySpot.prototype.removeUpVote = function() {
  this.upvotes--;
};

StudySpot.prototype.downVote = function() {
  this.downvotes++;
};

StudySpot.prototype.removeDownVote = function() {
  this.downvotes--;
};
