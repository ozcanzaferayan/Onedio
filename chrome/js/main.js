// Strips possible html tags from content
function stripHTML(html) {
	if (html === undefined)
		return("");
	html = html.toString();
	// Regex for html tags
	var re = /(<([^>]+)>)/ig;
	var txt = html.replace(re, "");
	return(txt);
}

// Okunmayan anime sayısının silinmesi için
function removeBadge() {
  if(chrome.browserAction !== undefined){
    chrome.browserAction.setBadgeText({text: ""});
  }
  localStorage.unreadCount = 0;
}

function IsFeatured(news){
	if (news.content_value === undefined || 
		news.featured_link !== undefined){
		return true;
    }
    else {
    	return false;
    }
}

// Is retrieved date newest
function isNewNews(nev, old) {
	var newDate = nev.content_value;
	var oldDate = old.content_value;
	var newDay = newDate.split(' ')[0];
	var newMonth = newDate.split(' ')[1];
	var newHour = newDate.split(' ')[2];
	var oldDay = oldDate.split(' ')[0];
	var oldMonth = oldDate.split(' ')[1];
	var oldHour = oldDate.split(' ')[2];
	if (newMonth == oldMonth) {
		return (newHour > oldHour) ? true : false;
	}
	else {
		return true;
	}
}

function setUndefinedToNull(value){
	return value === undefined ? null : value;
}

// Sets turkish date to date object
// Ex. date: "15 Haziran, 17:54"
function setTrDate(stringDate){
	if (stringDate === undefined) return undefined;
	var year = new Date().getFullYear();
	// segments = ["15 Haziran," "17:54"]
	var segments = stringDate.split(', ');
	// dayAndMonth = "15 Haziran,"
	var dayAndMonth = segments[0];
	// hour = 17:54
	var hour = segments[1];
	// Gets day number
	// day = "15"
	var day = dayAndMonth.split(' ')[0];
	// Gets month string without comma
	// trMonth = "Haziran";
	var trMonth = dayAndMonth.split(' ')[1];
	// engMonth will be "June"
	var engMonth;
	switch(trMonth){
		case 'Ocak':
			engMonth = 'January';
			break;
		case 'Şubat':
			engMonth = 'February';
			break;
		case 'Mart':
			engMonth = 'March';
			break;
		case 'Nisan':
			engMonth = 'April';
			break;
		case 'Mayıs':
			engMonth = 'May';
			break;
		case 'Haziran':
			engMonth = 'June';
			break;
		case 'Temmuz':
			engMonth = 'July';
			break;
		case 'Ağustos':
			engMonth = 'August';
			break;
		case 'Eylül':
			engMonth = 'September';
			break;
		case 'Ekim':
			engMonth = 'October';
			break;
		case 'Kasım':
			engMonth = 'November';
			break;
		default:  		// 'Aralık'
			engMonth = 'December';
			break;
	}
	var dateString = day + " " + engMonth + " " + year +  ", " + hour; 
	return dateString;
}


// Builds li items for ul element
function createNewsDOM (data) {
    var liDOM = "";
    $(data).each(function(i,v){
    	if(i >= 20) return false;
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

function getNewestDate(news){
  return news.sort(function(a,b){ b.update_date - a.update_date })[0].update_date;
}

