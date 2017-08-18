(function () {
    $(init);
    
    function init() {

        var searchByTitleButton = $("#searchByTitleButton");
        var searchByTitleFld = $("#searchByTitleFld");

        searchByTitleButton.click(searchByTitle);

        function searchByTitle() {
            var movieTitle = searchByTitleFld.val();

            var url = "http://www.omdbapi.com/?s=" + movieTitle+"&apikey=852159f0";

            $.ajax({
                url: url,
                success: renderMovies,
                error: function () {
                    alert("oops");
                }

            });
        }

        function renderMovies (res) {
            console.log(res);

            var table = $("<table>");
            table.addClass("table");

            for (var m in res.Search) {
                var movie = res.Search[m];

                var tr = $("<tr>");

                var td = $("<td>");
                td.append(movie.Title);
                tr.append(td);
                // td = $("<td>");
                // td.append(movie.Poster);


                var img = $("<img>");
                img.attr("src", movie.Poster);

                td = $("<td>");
                td.append(img);
                tr.append(td);

                table.append(tr);
            }

            $("#searchRes").append(table);
            table.sortable();

        }
        
    }
})();