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