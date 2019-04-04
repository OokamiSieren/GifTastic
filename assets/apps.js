// make an html page
// add a form for user input
// let user type a topic and add to page as a working button
// make an array of topics
// make the array buttons
// get giphy key
// make the buttons a click event pulling from the giphy api
// Once clicked display 10 still gifs
// Display rating
// Make the images respond to a click
// Once image is clicked make the image a moving gif





// original topic array
var disneyTopics = ["Mickey Mouse", "Winnie the Pooh", "The Haunted Mansion", "Toy Story", "Frozen", "Oswald the Lucky Rabbit"];

// a function to change the html and display the content
function displayTopicInfo() {
    var button = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=disney" + button + "&api_key=77I0PUbA1CAk0Vz4Je4zQpJIXCNlsHKN&limit=10&offset=0&rating=G&lang=en";

    // ajax call for giphs info
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        console.log(response.data);


        // ask about reponse.data?
        // a div for the topic
        for (var i = 0; i < response.data.length; i++) {
            var topicDiv = $("<div class= 'top'>");

            // variable/element for the image to add dyanmaically from gifs
            var topicImage = $("<img>");
            topicImage.addClass("gif");
            topicImage.attr("src", response.data[i].images.fixed_height_still.url);
            topicImage.attr("alt", "topic image");
            topicImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", response.data[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");

            // variable for the ratings data
            var rating = response.data[i].rating;
            // the element to display the rating
            var pRate = $("<p>").text("Rating " + rating);
            // displaying using jquery
            topicDiv.append(topicImage);
            topicDiv.append(pRate);

            // having the new topics display above the previous topic
            $("#topics-view").prepend(topicDiv);
        }


    });

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
};

// making the buttons
function renderButtons() {
    // clearing the html prior to adding new topics to avoid repeats
    $("#buttons-view").empty();

    // for loop for topics in array for the buttons
    for (var i = 0; i < disneyTopics.length; i++) {
        // dynamically making the buttons for the topics array 
        var b = $("<button>");
        b.addClass("topic-btn");
        b.attr("data-name", disneyTopics[i]);
        b.text(disneyTopics[i]);
        $("#buttons-view").append(b);
       
      
    };

};
//Adding user topic button
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var disney = $("#topic-input").val().trim();
    disneyTopics.push(disney);
    renderButtons();
});

$(document).on("click", ".topic-btn", displayTopicInfo);




//calling the function to display the buttons from the original topic array
renderButtons();















