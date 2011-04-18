function(data) {
	$.log('reloading the rows');

	$(this).trigger('notification', 'Finished loading');
	return {examples: data.rows};
}