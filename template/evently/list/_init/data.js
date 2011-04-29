function(data) {
	
		$.log('reloading the rows for the user:' + authuser);
		var retData = [];
		$(this).trigger('notification', 'Finished loading');
		for (var i=0; i<data.rows.length;++i){
			if (authuser == data.rows[i].value.user){
				retData.push(data.rows[i]);
				
			}

		}
		return {examples: retData};
}