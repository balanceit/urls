function() {
  $(this).trigger('notification', 'Adding the url: ' + $('#input').val());
  $.log('adding ' + $('#input').val());
	
  var currentTime = new Date();
  
  $$(this).app.db.saveDoc({"type":"url", "url":$('#input').val(),  "createdOn": Date.parse(currentTime), "readOn":null, "user":authuser});
	
	//db.saveDoc({"type":"url", "url":getUrlVars().url}, "createdOn": currentTime.parse, "readOn":null, "user":null);
  $.couch.app(function(app) {
    $("#items").evently("list", app);
  });

  
}