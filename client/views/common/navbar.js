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
