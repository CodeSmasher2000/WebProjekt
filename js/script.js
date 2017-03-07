/* Anropar API och hämtar resultat som matchar den inmatade strängen */
$("#submit-job").on("click", function(){
  var movieDiv = document.getElementById("div-job");
  var baseUrl = "http://api.arbetsformedlingen.se/platsannons/matchning?lanid=";
  var jobInput = $("#select-job").find(":selected").val();
  //$(movieDiv).show();
  //$(movieDiv).text("Laddar...");
  $.ajax({
    url: baseUrl + encodeURI(jobInput),
    dataType: "JSON"

  }).done(function(data){
    var movie = data.matchningslista;
    
	//$(movieDiv).text("");
    //$("#title").show();
    $.each(movie, function(index, movie) {
      //$(movieDiv).append(movie.annonsrubrik);
      console.log(movie.annonsrubrik);
     
      //var hr = document.createElement("HR");
      //$(movieDiv).append(hr);
       
					
			
					
                });
   // console.log(movieList.length);
  }).fail(function(data){
  //  $("#title").text("Något gick fel...");
	//$("#title").show();
    console.log(data);
  });
});