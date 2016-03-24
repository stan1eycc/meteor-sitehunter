/**
 * Shared librarys
 *
 * @author Stan Chen
 */

/////
// collections
/////
Websites = new Mongo.Collection("websites");

/////
// security methods for collecitons
/////
Meteor.methods({
  addSite: function (url,title,description) {
    // Make sure the user is logged in before inserting a new site
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Websites.insert({
      title:title,
      url:url,
      description:description,
      createdOn:new Date(),
      upvote:[],
      downvote:[],
      upvotecount:0,
      downvotecount:0
    });
  },
  updateVote: function (siteId,uvoteList,uvoteNum,dvoteList,dvoteNum) {
    // Make sure the user is logged in before voting
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Websites.update(
      {_id:siteId},
      {$set: { upvote:uvoteList, upvotecount:uvoteNum, downvote:dvoteList,
        downvotecount:dvoteNum }}
      );
  }
});
