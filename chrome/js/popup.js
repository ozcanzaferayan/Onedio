document.addEventListener('DOMContentLoaded', main);

function main() {
  removeBadge();
  fillItems(undefined);
}

function fillItems(data){
  var liDOM = localStorage.newsDOM;
  $('ul#newList').html(liDOM);
}