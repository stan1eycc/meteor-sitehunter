/**
 * Start up function that creates entries in the Websites databases.
 *
 * @author Stan Chen
 */

/////
// routing
/////

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('home', {
    to:"main"
  });
});

Router.route('/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('detail', {
    to:"main",
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
});

/////
// comments
/////

Comments.ui.config({
   template: 'bootstrap' // or ionic, semantic-ui
});

/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
    if (Session.get("search_txt")){
      var txt = Session.get("search_txt");
      var parts = txt.trim().split(/[ \-\:]+/);
      var regExp = new RegExp("(" + parts.join('|') + ")", "ig");
      var selector = {$or: [
            {title: regExp},
            {description: regExp}
          ]};
      return Websites.find(selector,{sort:{upvotecount:-1,createdOn: -1}});
    }
    else {
      return Websites.find({},{sort:{upvotecount:-1,createdOn: -1}});
    }
	}
});

/////
// template events
/////

Template.website_item.events({
	"click .js-upvote":function(event){

    // check if user is authorized
    if (Meteor.user()) {

      var user_id = Meteor.user()._id;

      var website_id = this._id;
      var webdata = Websites.findOne({_id:website_id});

      // put the code in here to remove a vote from a website!

      if( webdata['upvote'].indexOf(user_id) < 0 ) {
        webdata['upvote'].push(user_id);
      }

      if( webdata['downvote'].indexOf(user_id) >= 0 ) {
        webdata['downvote'].splice(webdata['downvote'].indexOf(user_id),1);
      }

      Meteor.call( "updateVote", website_id,
        webdata['upvote'], webdata['upvote'].length,
        webdata['downvote'], webdata['downvote'].length
      );
    }

    return false;// prevent the button from reloading the page
	},
	"click .js-downvote":function(event){

    // check if user is authorized
    if (Meteor.user()) {

      var user_id = Meteor.user()._id;

      var website_id = this._id;
      var webdata = Websites.findOne({_id:website_id});

      // put the code in here to remove a vote from a website!
      if( webdata['downvote'].indexOf(user_id) < 0 ) {
        webdata['downvote'].push(user_id);
      }

      if( webdata['upvote'].indexOf(user_id) >= 0 ) {
        webdata['upvote'].splice(webdata['upvote'].indexOf(user_id),1);
      }

      Meteor.call( "updateVote", website_id,
        webdata['upvote'], webdata['upvote'].length,
        webdata['downvote'], webdata['downvote'].length
      );
    }

		return false;// prevent the button from reloading the page
	}
})

Template.website_form.events({
	"submit .js-save-website-form":function(event){

		var url = event.target.url.value;
    var title = event.target.title.value;
    var description = event.target.description.value;

    console.log("url: "+url+" title:"+title+" description:"+description);

    // Inster new site into database
    Meteor.call("addSite", url, title, description);

    //window.location='/';
		return false;// stop the form submit from reloading the page
	}
});

Template.search_bar.events({
  "input .js-search":function(event){
    Session.set("search_txt", event.currentTarget.value);
  }
});
