document.addEventListener('DOMContentLoaded', main);

function main() {
  removeBadge();
  getItems();

}

function getItems(){
  if (localStorage.newsDOM === undefined){
    retrieveNews(fillItems, []);
  }
  else {
    fillItems(undefined);
  }
}


function fillItems(data){
  console.log("fillItems executing..");
  var liDOM = localStorage.newsDOM;
  $('ul#newList').html(liDOM);
}