function(doc) {

	if(doc.type == "url"){
		var d = new Date(doc.createdOn);
		var d_formated = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
		emit(doc.user, {url:doc.url
						,rev:doc._rev
						,id:doc._id
						,created:d
						,createdOnFormated:d_formated
						,readOn:doc.readOn
						,user:doc.user});
	}
}