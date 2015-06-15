// Gets news from API
function retrieveNews (callback, params) {
	console.log("News retrieving..")
	$.ajax({
    url:"https://api.import.io/store/data/ac7b3db0-6ea8-4532-9050-7795c6fb46a2/_query?input/webpage/url=http%3A%2F%2Fonedio.com&_user=e0bfe84c-9892-4289-a467-56e6df88a283&_apikey=e0bfe84c-9892-4289-a467-56e6df88a283%3AFfeT9bFuqhJUd7rycElD6LtfZDM%2FVpb5IXwVVr9jWqXt9w9MO%2F%2F%2FPnYJBIUYHiXKwq0gG3aCjLu2jy0vaYe9bQ%3D%3D",
    crossDomain: true,
    dataType: "json",
    success: function (response) {
    	console.log(params);
    	console.info("News retrieved");
    	localStorage.news = JSON.stringify(response);
    	console.log(response);
    	params[0] = response;
    	return callback(params);
    },
    error: function (xhr, status) {
      	console.error("News not retrieved!");
      	console.error(status);
    }
  });
}