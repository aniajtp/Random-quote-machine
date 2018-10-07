var prefix = "https://cors-anywhere.herokuapp.com/";

//link do wysyłania tweetów
var tweetLink = "https://twitter.com/intent/tweet?text=";

//link do pobierania cytatów z API Quotes on Design,
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
  $.getJSON(prefix + quoteUrl, createTweet);
}
  $.ajaxSetup({ cache: false });

//quoteUrl (pierwszy parametr) to adres zapytania (czyli nasz link do API),
//createTweet (drugi parametr) to funkcja, która zostanie wykonana przy pomyślnym wykonaniu zapytania.
function createTweet(input) {
  var data = input[0];

  var quoteText = $(data.content).text().trim();
  var quoteAuthor = data.title;

  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }

  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  if (tweetText.length > 140) {
    getQuote();
  } 
  else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    $('.quote').text(quoteText);
    $('.author').text("Author: " + quoteAuthor);
    $('.tweet').attr('href', tweet);
  }
    $('.tweet').attr('href', tweet);
};
$(document).ready(function() {
  getQuote();
    $('.trigger').click(function() {
      getQuote();
    })
});