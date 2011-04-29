function() {
	$.log('clicked on signup submit');
  $(this).trigger('bookmarklet', {name:$('#name').val(), password:$('#password').val()});	
  $(this).trigger('notification', 'clicked on signup');
}