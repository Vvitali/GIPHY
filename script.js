console.log("Script.js connected")
/*
1) mainpart
2) get information from the form
3) create request
4) get and handle resposne
5) parse response to a  separate articles
6) create a paragraph (put it to "#mainField")
*/

var api_key = "df0b7eCkroZ5mXp7cm4RfbxalY6Miwbo"
var url = "https://api.giphy.com/v1/gifs/search?";
var searchTerm = "starwars";
var limit = 10;
var numberOfRecordsToRetrieve = 0;
var mainResponseObject;


function retrieveDatafromHTML() {
    searchTerm = $("#search_term").val();
    if ($("#retrieve").val() > 10) {
        alert("No more than 10 recerds at once")
    }
    if ($("#retrieve").val() == "") {
        numberOfRecordsToRetrieve = 10;
    }
    else {
        numberOfRecordsToRetrieve = $("#retrieve").val()
    }
    console.log("SearchTerm: " + searchTerm);
    if ($("#startyear").val() == "") {
        start_year = "19000101";
    }
    else {
        start_year = $("#startyear").val() + "0101";

    }
    if ($("#endyear").val() == "") {
        end_year = "20171230";
    }
    else {
        console.log("New endyear");
        end_year = $("#endyear").val() + "1230";
    }


}

function startSearch() {

    mainResponseObject = null;

    console.log("startSeact button activated");
    //AJAX request
    $.ajax({
        url: url,
        method: "GET",
        data: {
            q: searchTerm,
            rating: "g",
            limit: limit,
            api_key: api_key
        },

    }).done(function(result) {
        mainResponseObject = result;

        //var personImage = $("<img>");
        //personImage.attr("src", results[i].images.fixed_height.url);


        for (var i = 0; i < limit; i++) {
            var newElement = $("<div class='gifElement'>");
            newElement.append($("<p>").text("rating:" + mainResponseObject.data[i].rating));
            var newGif = $("<img>");

            newGif.attr("src", mainResponseObject.data[i].images.fixed_height.url);
            newElement.append(newGif)

            $("#gifField").append(newElement);
        }


    }).fail(function(err) {
        throw err;
    });
}

//do not use it nowhere, but startSearch
function createNewParagraph() {
    console.log("createNewParagraph:");

    for (var i = 0; i < 9; i++) {
        var paragraph = $("<div>");

        paragraph.attr("class", "paragraphClass");
        var header3 = $("<h3>");

        header3.text(mainResponseObject.response.docs[i].headline.main);
        var innerParagraph = $("<p>");
        innerParagraph.text(mainResponseObject.response.docs[i].snippet);
        var linkUrl = $("<a />", {
            //id: "id5",
            name: "link",
            href: mainResponseObject.response.docs[i].web_url,
            text: "URL-link"
        });
        var pubDate = $("<p>");
        pubDate.text(mainResponseObject.response.docs[i].pub_date);

        paragraph.append(header3);
        paragraph.append(innerParagraph);
        paragraph.append(pubDate);
        paragraph.append(linkUrl);

        $("#mainField").append(paragraph);
    }
}
startSearch()
$(document).ready(function() {


});
