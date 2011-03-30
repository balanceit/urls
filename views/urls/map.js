function(doc) {

	if(doc.type == "url"){
		emit(doc.url, doc.url);
	}
}