// ###################### Home Page Button Acttions ################
$(document).on("click", "#scrape-posts", function(){
    //Ajax Get Request
    var queryURL = "/scrape";
    $.ajax({
        url: queryURL,
        method:"GET"
    }).then(function(){
        document.location.reload();
    })

})


$(document).on("click", "#save-button", function(){
    
    var articleID = $(this).attr("data-id");
    var queryURL = "/api/articles/" + articleID; 
    $.ajax({
        url: queryURL,
        method: "POST"
    }).then(function(){
        document.location.reload();
    })

})

$(document).on("click", "#clear-posts", function(){
    
    var queryURL = "/api/clear/"
    $.ajax({
        url: queryURL,
        method: "DELETE"
    }).then(function(){
        document.location.reload();
    })

})


// ###################### Saved Page Button Acttions ################

$(document).on("click", "#unsave-button", function(){
    
    var articleID = $(this).attr("data-id");
    var queryURL = "/api/articles/unsave/" + articleID; 
    $.ajax({
        url: queryURL,
        method: "POST"
    }).then(function(){
        document.location.reload();
    })

})




$(document).on("click", "#save-note", function(){
    var note = $("textarea").val().trim();
    var articleID = $(".card.mb-2").attr("data-id")
   
    $.ajax({
        url: "/articles/" +articleID + "/notes",
        method: "POST",
        data: {
            text: note
        }
    }).then(function(){
        console.log(articleID)
        document.location.reload(); 
    })

})

$(document).on("click", "#delete-note", function(){
    var noteID = $(this).attr("data-id");

    $.ajax({
        url: "/api/notes/" +noteID,
        method: "DELETE"
    }).then(function(){
        document.location.reload();
    })
})
