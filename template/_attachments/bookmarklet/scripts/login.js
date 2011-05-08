// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

// $$ inspired by @wycats: http://yehudakatz.com/2009/04/20/evented-programming-with-jquery/
function $$(node) {
  var data = $(node).data("$$");
  if (data) {
    return data;
  } else {
    data = {};
    $(node).data("$$", data);
    return data;
  }
};

(function($) {

  function Session() {
    
    function doLogin(name, password, callback) {
      $.couch.login({
        name : name,
        password : password,
        success : function() {
          $.futon.session.sidebar();
          callback();
        },
        error : function(code, error, reason) {
          $.futon.session.sidebar();
          callback({name : "Error logging in: "+reason});
        }
      });
    };
    
    function doSignup(name, password, callback, runLogin) {
      $.couch.signup({
        name : name
      }, password, {
        success : function() {
          if (runLogin) {
            doLogin(name, password, callback);            
          } else {
            callback();
          }
        },
        error : function(status, error, reason) {
          $.futon.session.sidebar();
          if (error == "conflict") {
            callback({name : "Name '"+name+"' is taken"});
          } else {
            callback({name : "Signup error:  "+reason});
          }
        }
      });
    };
    
    function validateUsernameAndPassword(data, callback) {
      if (!data.name || data.name.length == 0) {
        callback({name: "Please enter a name."});
        return false;
      };
      if (!data.password || data.password.length == 0) {
        callback({password: "Please enter a password."});
        return false;
      };
      return true;
    };
    
    function createAdmin() {
      $.showDialog("dialog/_create_admin.html", {
        submit: function(data, callback) {
          if (!validateUsernameAndPassword(data, callback)) return;
          $.couch.config({
            success : function() {
              doLogin(data.name, data.password, function(errors) {
                if(!$.isEmptyObject(errors)) {
                  callback(errors);
                  return;
                }
                doSignup(data.name, null, function(errors) {
                  if (errors && errors.name && errors.name.indexOf && errors.name.indexOf("taken") == -1) {
                    callback(errors);
                  } else {
                    callback();
                  }
                  }, false);
                });
                
                

				$.couch.db(data.name).create({
					error: function(status, id, reason) { alert(reason) },
					
					success: function(resp) {
				        doSignup(data.name, data.password, callback, true);
				        console.log('create new user: ' + data.name);
				        console.log('create new database: ' + data.name);
						console.log('created database: ' + data.name)
					}
				});                             
            }
          }, "admins", data.name, data.password);
        }
      });
      return false;
    };

    function login() {
	  $("#results").hide('slow');
      $.showDialog("dialog/_login.html", {
        submit: function(data, callback) {
          if (!validateUsernameAndPassword(data, callback)) return;
          doLogin(data.name, data.password, callback);
        }
      });
      return false;
    };

    function logout() {
	  $("#results").hide('slow');
      $.couch.logout({
        success : function(resp) {
          $.futon.session.sidebar();
        }
      })
    };

    function signup() {
	  $("#results").hide('slow');
      $.showDialog("dialog/_signup.html", {
        submit: function(data, callback) {
          if (!validateUsernameAndPassword(data, callback)) return;

			$.couch.db(data.name).create({
				error: function(status, id, reason) { alert(reason) },
				
				success: function(resp) {
			        doSignup(data.name, data.password, callback, true);
			        console.log('create new user: ' + data.name);
			        console.log('create new database: ' + data.name);
					console.log('created database: ' + data.name)
				}
			}); 
			
          console.log($.couch.replicate);
        }
      });
      return false;
    };

    this.setupSidebar = function() {
      $("#userCtx .login").click(login);
      $("#userCtx .logout").click(logout);
      $("#userCtx .signup").click(signup);
      $("#userCtx .createadmin").click(createAdmin);
    };
    
    this.sidebar = function() {
      // get users db info?
	  $("#results").hide('slow');
      $("#userCtx span").hide();
      $.couch.session({
        success : function(r) {
        	
          $("span#userCtx").show();
          var userCtx = r.userCtx;
          $$("#userCtx").userCtx = userCtx;
          if (userCtx.name) {
            $("#userCtx .username").text(userCtx.name);
            if (userCtx.roles.indexOf("_admin") != -1) {
              $("#userCtx .loggedinadmin").show();
            } else {
              $("#userCtx .loggedin").show();
            }
          } else if (userCtx.roles.indexOf("_admin") != -1) {
            $("#userCtx .adminparty").show();
          } else {
            $("#userCtx .loggedout").show();
          };
        }
      })
    };
  };

  $.couch.urlPrefix = "http://balanceit.iriscouch.com";
  $.futon = $.futon || {};
  $.extend($.futon, {
    session : new Session()
  });


  $(function() {
	console.log('in the no name function');
	$.futon.session.sidebar();
	$.futon.session.setupSidebar();
 
    
  });

})(jQuery);