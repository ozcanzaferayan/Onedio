document.addEventListener('DOMContentLoaded', main);

function main() {
  removeBadge();
  getItems();

}

function getItems(){
  if (localStorage.news === undefined){
    retrieveNews(fillItems, []);
  }
  else {
    fillItems(JSON.parse(localStorage.news));
  }
  
  
}
function fillItems(data){
  console.log("fillItems executing..");
  var liDOM = "";
  $(data.results).each(function(i,v){
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
  $('ul#newList').html(liDOM);
}