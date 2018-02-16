$(document).ready(function () {

    $("#newQuoteButton").on("click", function () {

        var quote = getQuote();

        // Update tweet button href
        var encodedQuote = encodeURIComponent(quote.quote)
        $("#tweetButton").attr("href", "https://twitter.com/intent/tweet?text="+encodedQuote)

        // Append new quote to table
        var newTr = $(
            `<tr>` +
            `<td>` + quote.id + `</td>` +
            `<td>` + quote.quote + `</td>` +
            `<td>` + quote.author + `</td>` +
            `</tr>`).hide();

        var hiden = $('tbody tr:first').before(newTr).fadeIn("slow");

        // hiden.fadeIn("slow");
        // console.log("already run");

        // Replace main quote with the new one
        $("#newQuote").html(quote.quote)
        $("#newAuthor").html(quote.author)

        limitTableRows(7);

    })


})

function getQuote() {

    // Set ajax synchronous
    $.ajaxSetup({
        async: false
    });

    var quoteID = "ID";
    var quoteStr = "QUOOOOOTE";
    var quoteAuthor = "UNKNOW";

    $.getJSON("http://api.icndb.com/jokes/random?limitTo=[nerdy]", function (json) {
        // JSON.stringify(json);
        quoteID = json.value.id;
        quoteStr = json.value.joke;
        quoteAuthor = "Chuck Norris";

    })

    // Set ajax asynchronous
    $.ajaxSetup({
        async: true
    });


    return { "id": quoteID, "quote": quoteStr, "author": quoteAuthor };
}

function limitTableRows(size) {
    if ($("tr").length >= size + 2) {
        $("tr:last").remove();
    }
}
