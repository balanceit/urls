function() {
  
  //$$(this).app.db.saveDoc({"type":"url", "url":$('#input').val()});

  	var db = $.couch.db('urls');
  	
  	var $tgt = $(this);
	$.log('triggering delete for ' + $tgt.attr('id') + ' rev: ' + $tgt.attr('rev'));
	var id = $tgt.attr("id");     

	db.openDoc(id, { success: function(doc) {

		$tgt.trigger('notification', 'Deleting the url: ' + doc.url);
		$.log('deleting url: ' + doc.url);
		db.removeDoc(doc, { success: function() {  
			$.log('deleted id: ' + id); 
			$.couch.app(function(app) {
			    $("#items").evently("list", app);
			});      
		}})  
	}});     
}