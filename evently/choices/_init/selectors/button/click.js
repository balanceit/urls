function() {
  $(this).trigger('add', $('#input').val());
  $.log('triggering add for ' + $('#input').val());
  
  $$(this).app.db.saveDoc({"type":"url", "url":$('#input').val()});

  $.couch.app(function(app) {
    $("#items").evently("choices", app);
  });

  
}