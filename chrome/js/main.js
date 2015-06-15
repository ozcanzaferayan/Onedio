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