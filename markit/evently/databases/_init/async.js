function(callback) {
	$.couch.allDbs({success : function(res) {
	          callback(res);
	        }});
}

/*

function(callback) {
      $.ajax({
        url : "http://twitter.com/status/user_timeline/jchris.json?count=1&callback=?",
        dataType : "jsonp",
        success : function(tweets) {
          callback(tweets[0]);
        }
      });
    }*/