$(document).ready(function () {
    $("#search").on("click", function (event) {
        event.preventDefault();
        $("#result").empty();
        var apiKey = "Q78GxHgh9EcePRh7nm5Gs7Om6v1Tp5EH";
        var userQuery = $("#searchBarId").val().trim();
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + userQuery;

        //console.log("user term: ", userQuery);
        //console.log("url: ", queryUrl);
        
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            var result = res.response;
            //console.log(result);
            for (var i = 0; i < result.docs.length; i++) {
                var articleDiv = $("<div>");
                articleDiv.attr("class", "card-body"); 
                var title = $("<h3>");
                title.text(i+1 + ". " + result.docs[i].headline.main);
                //console.log("title: ",result.docs[i].headline.main);
                var author = $("<h2>");
                author.text(result.docs[i].byline.original);
                //console.log("author: ",result.docs[i].byline.original);
                var section = $("<h2>");
                section.text("Section: " + result.docs[i].section_name);
                var pubDate = $("<h2>");
                pubDate.text(result.docs[i].pub_date);
                var webUrl = $("<h3>");
                webUrl.html("<a href="+result.docs[i].web_url+">"+result.docs[i].web_url);

                articleDiv.append(title, author, section, pubDate, webUrl, "<hr>");
                $("#result").append(articleDiv);
            }
        });
    });
});