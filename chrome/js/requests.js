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
      // Sort news by date
      response.results.sort(function(a, b) {
          return isNewNews(a, b);
      });

      // Caching response
    	localStorage.news = JSON.stringify(response);
      // caching DOM elements
      localStorage.newsDOM = createNewsDOM(response);
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

// Builds li items for ul element
function createNewsDOM (data) {
    var liDOM = "";
    $(data.results).each(function(i,v){
        // Removes adds
        if (IsFeatured(v)){
            return true;
        }
        var image = stripHTML(v.main_image);
        var link  = stripHTML(v.link);
        var date  = stripHTML(v.content_value);
        var title = stripHTML(v.description);
        var desc  = stripHTML(v.content_description);
        var fbVal = stripHTML(v.facebook_value);
        var twVal = stripHTML(v.twitter_number);
        if (fbVal != "" && twVal != ""){
          fbVal = '<span class="fa fa-facebook">&nbsp;</span>' + fbVal + '&nbsp;&nbsp;';
          twVal = '<span class="fa fa-twitter">&nbsp;</span>' + twVal;
        }
        liDOM += 
          '<li class="newListAnim">' +
          ' <a href="' + link + '" target="_blank">'+
          '   <img src="' + image + '">' +
          '   <div class="details">' +
          '     <div class="title">' + title + '</div>' +
          '     <div class="ep">' + desc + '</div>' +
          '     <div class="likes">' + 
                fbVal + 
                twVal +  
          '     </div>' +  
          '     <div class="date">' + date + '</div>' +
          '   </div>' +
          ' </a>' +
          '</li>';
    });
    return liDOM;
}

