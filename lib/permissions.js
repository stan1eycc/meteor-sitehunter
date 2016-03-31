/* ---------------------------------------------------- +/

## Permissions ##

Permission checks

Usage:

if (can.editItem(Meteor.user(), myItem)){
  // do something
}

/+ ---------------------------------------------------- */

can = {
  createItem: function (userId) {
    return true;
  },
  editItem: function (userId, item) {
    return true;
  },
  removeItem: function (userId, item) {
    return true;
  }
}
