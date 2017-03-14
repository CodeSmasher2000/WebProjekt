/* Anropar API och hämtar resultat som matchar den inmatade strängen */


$("#submit-job").on("click", function(){
  var movieDiv = document.getElementById("div-job");
  var baseUrl = "http://api.arbetsformedlingen.se/platsannons/matchning";
  var jobInput = $("#select-job").find(":selected").val();
  sessionStorage.setItem("job",jobInput);
  var lanInput = $("#select-lan").find(":selected").val();
  //$(movieDiv).show();
  //$(movieDiv).text("Laddar...");
  
  $.ajax({
    url: baseUrl + "?lanid=" + encodeURI(lanInput) + "&nyckelord=" + jobInput,
    dataType: "JSON"
    
  }).done(function(data){
    var jobresult = data.matchningslista;
      console.log(jobresult);
      console.log(jobresult.matchningdata);
    var annons = jobresult.antal_platsannonser;
    sessionStorage.setItem("result",annons);
    location.assign("jobresultpage.html");
  

  }).fail(function(data){
  //  $("#title").text("Något gick fel...");
	//$("#title").show();
    console.log(data);
  });
  
});