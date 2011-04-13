function(doc) {

	if(doc.type == "url"){
		emit(doc._id, {url:doc.url,rev:doc._rev,id:doc._id});
	}
}