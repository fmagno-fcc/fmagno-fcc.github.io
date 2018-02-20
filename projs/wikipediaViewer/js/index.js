$(document).ready(() => {

    // Random page
    $("#buttonRandom").on("click", () => {
        location.href = "https://en.wikipedia.org/wiki/Special:Random";
    });

    // Detect enter key on input text
    $("#inputLarge").on('keyup', function (e) {
        console.log("Some keyboard button has been pressed!");
        if (e.keyCode == 13) {
            searchPage();
        }
    });

    // Detect search button press
    $("#buttonSearch").on("click", () => {
        console.log("Search button pressed!");
        searchPage();
    });

});


function searchPage() {
    console.log("BEFORE CORS");

    var searchStr = $("#inputLarge").val();

    var endpoint = "https://en.wikipedia.org/w/api.php"
    var pAction = "action=query"
    var pProp = "prop=revisions"
    var pRvprop = "rvprop=content"
    var pFormat = "format=json"
    var pFormatVersion = "formatversion=2"
    var pSearch = "list=search"
    var pSrSearch = "srsearch=" + encodeURIComponent(searchStr)
    // var pTitles = "titles=" + encodeURIComponent(searchStr)
    var cors = "&origin=*"

    var params = "?" + pAction + "&" + pProp + "&" + pRvprop + "&" + pFormat + "&" + pFormatVersion + "&" + pSearch + "&" + cors + "&" + pSrSearch

    // var params = "?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=" + encodeURIComponent(searchStr);
    // var urlSuffix = "&callback=?"

    console.log("URL:", endpoint + params);

    // $.getJSON(endpoint + params, (data) => {
    //     console.log(data);
    // })

    // Clear results area
    $("#results").empty();


    // Fill in  the results area with the new results
    $.get(endpoint + params, (data) => {
        console.log(data.query.search);

        data.query.search.forEach((elem) => {
            var title = elem.title
            var snippet = elem.snippet
            var url = "https://en.wikipedia.org/?curid=" + elem.pageid
            var template = `
            <div class="alert alert-dismissible alert-info">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <a href="` + url + `" class="alert-link">` + title + `</a><br>
                `+ snippet + `
            </div>
            `

            $("#results").append(template);
        })

        // console.log("PageID:", data.query.pages[0].pageid);
    });

}
