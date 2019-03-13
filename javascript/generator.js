var rockers = [
    "def leppard",
    "motley crue",
    "whitesnake",
    "van halen",
    "bon jovi",
    "skid row",
    "poison",
    "zz top",
    "guns 'n' roses",
    "ac/dc",
    "warrant"
];

//We need to create a button for each element in the rockers array and push it in to the .btn-grp div
function makeButtons() {
    //Prevent buttons from repeating when adding new ones
    $(".btn-grp").empty();
    //Create the buttons with a class, attribute and text
    for (var i = 0; i < rockers.length; i++) {
        var rockBand = $("<button/>");
        rockBand.addClass("rockButton");
        rockBand.attr("data-name", rockers[i]);
        rockBand.text(rockers[i]);

        $(".btn-grp").append(rockBand);
    }
}
makeButtons();

//Adding a new band to the list of buttons using the html form
$("#add-band").on("click", function (event) {
    event.preventDefault();

    var band = $("#band-input").val().trim();
    rockers.push(band);

    makeButtons();
});

$(document).on("click", ".rockButton", function () {
    var band = $(this).attr("data-name");
    displayGifs(band);
});

//Each time a button is clicked, an ajax request must be sent to the giphy api to retrieve the gifs
//and the gifs must be displayed in the gif-display
function displayGifs(band) {


    //Every time a new button is clicked, the old gifs are replaced
    $("#gif-display").empty();


    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lvgRYkPfs3HiNOgsh1814LVILJAjHmRx&limit=10&q=" + band;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div>");

            var gif = $("<img>");
            gif.addClass('gif');
            gif.attr('src', response.data[i].images.fixed_height_still.url);
            gif.attr('data-still', response.data[i].images.fixed_height_still.url);
            gif.attr('data-animate', response.data[i].images.fixed_height.url);
            gif.attr('data-state', "still");

            gifDiv.append(gif);

            var rating = response.data[i].rating;
            var ratingDiv = $("<p class='rating'>").text("Rating: " + rating);

            gifDiv.append(ratingDiv);

            $("#gif-display").prepend(gifDiv);
        }
    })
}

//If a user clicks a gif, it should start playing
//If it's clicked a second time, it should stop.
$(".gif").on("click", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

