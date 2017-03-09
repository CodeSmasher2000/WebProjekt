  $("#antal-jobb").text(sessionStorage.getItem("result"));
  $("#result").append('<h3>' + sessionStorage.getItem("result") + '</h3>')
  
var id = [10,20,9,13,23,6,8,7,25,12,1,4,3,17,24,22,19,14,18,5,];

allJobs();
function allJobs(){
  var baseUrl = "http://api.arbetsformedlingen.se/platsannons/matchning";
  var job = sessionStorage.getItem("job");

  for(var i =1;i<=id.length;i++){
    $.ajax({
    url: baseUrl + "?lanid=" + encodeURI(i) + "&nyckelord=" + encodeURI(job),
    dataType: "JSON"
    
  }).done(function(data){
    var jobresult = data.matchningslista;
    console.log(jobresult);
    console.log(jobresult.matchningdata);
    var annons = jobresult.antal_platsannonser;
    if(annons != 0){
      var lan = jobresult.matchningdata[0].lan;
      $("#result").append('<h6>' +"Län: " + lan + " Antal jobb: " + annons + '</h6>')
    }
    
    
    
  

  }).fail(function(data){
  //  $("#title").text("Något gick fel...");
	//$("#title").show();
    console.log(data);
  });
    
  }
  
}