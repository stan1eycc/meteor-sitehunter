/**
 *
 *
 * @author Stan Chen
 */

/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Websites = new Mongo.Collection("websites");

// Allow/Deny

Websites.allow({
  insert: function(userId, doc){
    return can.createItem(userId);
  },
  update: function(userId, doc, fieldNames, modifier){
    return can.editItem(userId, doc);
  }
});

// Methods

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
