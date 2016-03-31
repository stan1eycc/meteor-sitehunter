/**
 * 
 *
 * @author Stan Chen
 */

/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

// Publish all items

Meteor.publish('allItems', function() {
  return Websites.find();
});

// Publish a single item
