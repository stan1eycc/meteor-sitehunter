/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// Filters

// Routes

Router.route('/', {

  path: '/',

  yieldRegions: {
    'navbar': {to: 'navbar'},
    'home': {to: 'main'}
  },

  waitOn: function () {
    return Meteor.subscribe('allItems', this.params._id);
  },

  action: function () {
    // render all templates and regions for this route
    this.render();
  }
});

Router.route('/:_id', {

  path: '/:_id',

  yieldRegions: {
    'navbar': {to: 'navbar'},
    'detail': {to: 'main'}
  },

  waitOn: function () {
    return Meteor.subscribe('allItems', this.params._id);
  },

  data: function () {
    return Websites.findOne({_id:this.params._id});
  },

  action: function () {
    // render all templates and regions for this route
    this.render();
  }
});
