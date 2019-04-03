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
function displayTopicInfo(){
     var disney = $(this).attr("data-name");
    var queryUrl ="https://api.giphy.com/v1/gifs/search?q=" + disney + "&api_key=77I0PUbA1CAk0Vz4Je4zQpJIXCNlsHKN&limit=10";

    // ajax call for giphs info
    $.ajax({
        url: queryUrl,
        method: "GET"
     }).then(function(response) {
         console.log(response);

         // a div for the topic
         var topicDiv = $("<div class= 'top'>");

         // variable for the ratings data
         var rating = response.rating;
         // the element to display the rating
         var pRate = $("<p>").text("Rating" + rating);
         // displaying using jquery
         topicDiv.append(pRate);

         // having the new topics display above the previous topic
         $("#topics-view").prepend(topicDiv);
               
     });


    };

    // making the buttons
    function renderButtons(){
        // clearing the html prior to adding new topics to avoid repeats
         $("#buttons-view").empty();

        // for loop for topics in array for the buttons
        for (var i = 0; i < disneyTopics.length; i++){
            // dynamically making the buttons for the topics array 
            var b = $("<button>");
            b.addClass("topic-btn");
            b.attr("data-name",disneyTopics[i]);
            b.text(disneyTopics[i]);
            $("#buttons-view").append(b);
        };

        };
         //Adding user topic button
         $("#add-topic").on("click", function(event){
             event.preventDefault();
             var disney = $("#topic-input").val().trim();
             disneyTopics.push(disney);
             renderButtons();
         });

         $(document).on("click",".topic-btn", displayTopicInfo);



//calling the function to display the buttons from the original topic array
renderButtons();




    










