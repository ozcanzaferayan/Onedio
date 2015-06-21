var intervalForNews; // News getting interval
var notTimeout = 10000; // Notification opens for 10 sec
var intervalOptions = 60 * 1000; // Ayarları çekme aralığı
var soundPath = "../mp3/notification.mp3"; // Bildirim sesi
var options;



//Başlangıçta içeriklerin getirilmesi için
$(document).ready(function(){
  console.debug();
  if(localStorage.unreadCount  === undefined){
    localStorage.unreadCount = 0;
  }
  getOptions();
  setIntervals();
  getNews();
  //getAllList();
  setServiceIntervals();
  
});

// Servis kontrol aralıklarını belirler
function setServiceIntervals(){
  setInterval(function(){
    getNews();
  }, intervalForNews);
  setInterval(function(){
    getOptions();
  }, intervalOptions);
}

function setIntervals(){
  intervalForNews = options.timeForNewAnimes * 60 * 1000;
}

// Gets options from localStorage
// If options isnt in localStorage, sets default values
function getOptions(){
  if (localStorage.options === undefined){
    // Set default options
    options = {
      hasNotifications: true,
      hasNotificationSound: true,
      timeForNewAnimes: 1,   // 1 min
    };
    saveOptions();
  }
  else {
    options = JSON.parse(localStorage.options);
  } 
}

function saveOptions(){
  localStorage.options = JSON.stringify(options);
  console.log('Ayarlar kaydedildi:');
  console.log(options);
}



function getNews(){
  var currentTimeText = /(..)(:..)(:..)/.exec(new Date())[0];
  console.log("News service started: " + currentTimeText);
  // Storage'da kaydedilen önceki animeleri getir
  // Eğer veriler storage'da yoksa yenilerini API'den çek
  var data = localStorage.news;
  var callbackParams =  [];
  if (data === undefined) {
    console.log("News not found in storage.");
    retrieveNews(checkForNewAnimes, callbackParams);
  }
  else {
    var oldNews = JSON.parse(localStorage.news);
    callbackParams[1] = oldNews;
    retrieveNews(checkForNewAnimes, callbackParams)
  }
}

// Yeni gelen anime listesinde eski listeden farklı anime var mı
function checkForNewAnimes(params){
  var newNews = params[0];
  var localNews = params[1];
  console.info("Different news checking..");
  var addedNews = [];
  if ($.isEmptyObject(localNews)) return;
  var oldNewsList = localNews;
  var newNewsList = newNews;
  $(newNewsList).each(function(i,v){
    // Compare first 10 elements
    if(i >= 10) return false;
    // if new has date its featured new
    // So we dont notificate user for featured news
    if (IsFeatured(v)){
      return true;
    }
    var isFind = false;
    $(oldNewsList).each(function(j,y){
      var newNew = v.description;
      var oldNew = y.description;
      if(oldNew == newNew){
        isFind = true;
        // break
        return false;
      }
    });
    // If new new not exists old list, add badge
    if(!isFind){
      var oldMaxDate = getNewestDate(oldNewsList);
      // Is retrieved news old
      if (new Date(v.update_date) < new Date(oldMaxDate)){
        return true;
      }
      // Retrieved news is new so create Notification
      localStorage.unreadCount = parseInt(localStorage.unreadCount) + 1;
      console.info("Yeni anime var:");
      console.log(v);
      addedNews.push(v);
    }
  });
  if (addedNews.length != 0) {
    chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 255]});
    chrome.browserAction.setBadgeText({text: localStorage.unreadCount});
    if(options.hasNotifications){
      notificateNews(addedNews);
    }
  }
  else{
    console.log("No new new.");
  }
}

// Yeni eklenen animeleri bildirim olarak göstermek için
function notificateNews(addedNews){
    for(var i = addedNews.length - 1; i >= 0; i--){
      // Son 3 animeden daha fazla notification atmamak için
      if (i > 2) {
        continue;
      }
      var v = addedNews[i];
      var newName = stripHTML(v.description);        // Anime adı
      var newLink = stripHTML(v.link);        // Anime linki
      var newIcon = stripHTML(v.main_image);        // Anime icon linki
      var notTitle = newName;            // Notification adı
      var notIcon = newIcon;            // Notification icon
      var notBody = 'Detaylar için tıklayınız.';  // Notification text
      console.info('Notification showing...')
      var notification = new Notification(
        notTitle, {
          icon: notIcon,
          body: notBody
        });

      // Eğer notification sound varsa ses çal
      if(options.hasNotificationSound){
        playAudio();
      }
      
      // Notification'a tıklanınca anime'nin linkine gidilmesi için
      notification.addEventListener('click', function() {
        removeBadge();
        notification.close();
        window.open(newLink);
      });
      // Bir süre sonra notification'ı kapat
      setTimeout(function(){
        notification.close();
      }, notTimeout); 
    }
}

// Bildirim sesi için
function playAudio() {
  new Audio(soundPath).play();
}