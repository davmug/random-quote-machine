$(document).ready(function () {
  const colors = ["-primary", "-secondary", "-success", "-danger", "-warning", "-info", "-dark"];

  let lastBgColor = "";
  let lastBtnColor = "";
  let lastTextColor = "";

  function getNewQuote() {
    $.ajax({
      url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      dataType: "json",
      success: function (data) {
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = data.quotes[randomIndex];

        $("#text").html('<span class="text-quote">"</span>' + randomQuote.quote + '<span class="text-quote">"</span>');
        $("#author").text("- " + randomQuote.author);
        updateTweetLink(randomQuote.quote, randomQuote.author);
        changeColors();
      },
      error: function () {
        $("#text").text("Oops! Qualcosa è andato storto nel caricamento della citazione.");
        $("#author").text("");
      },
    });
  }

  function updateTweetLink(quote, author) {
    let tweetText = quote + " - " + author;
    let tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    $("#tweet-quote").attr("href", tweetUrl);
  }

  function changeColors() {
    if (lastBgColor) {
      $("body").removeClass(lastBgColor);
    }
    if (lastBtnColor) {
      $("#new-quote, #tweet-quote").removeClass(lastBtnColor);
    }
    if (lastTextColor) {
      $("#text").removeClass(lastTextColor);
    }

    const randomBgIndex = Math.floor(Math.random() * colors.length);
    const randomBtnIndex = Math.floor(Math.random() * colors.length);
    const randomTextIndex = Math.floor(Math.random() * colors.length);

    const newBgClass = "bg" + colors[randomBgIndex];
    const newBtnClass = "btn" + colors[randomBtnIndex];
    const newTextClass = "text" + colors[randomTextIndex];

    $("body").addClass(newBgClass);
    $("#new-quote, #tweet-quote").addClass(newBtnClass);
    $("#text").addClass(newTextClass);

    lastBgColor = newBgClass;
    lastBtnColor = newBtnClass;
    lastTextColor = newTextClass;
  }

  getNewQuote();

  $("#new-quote").click(function () {
    getNewQuote();
  });
});
