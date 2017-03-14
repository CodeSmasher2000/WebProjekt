/* Anropar API och hämtar resultat som matchar den inmatade strängen */


$("#submit-job").on("click", function(){
  var movieDiv = document.getElementById("div-job");
  var baseUrl = "http://api.arbetsformedlingen.se/platsannons/matchning";
  var yrkesgruppId = $("#select-special").find(":selected").attr("data-yrkesgruppid");
  sessionStorage.setItem("job", yrkesgruppId);
  console.log(yrkesgruppId);
  // console.log(jobInput);

  var lanInput = $("#select-lan").find(":selected").val();
  //$(movieDiv).show();
  //$(movieDiv).text("Laddar...");
  
  $.ajax({
    url: baseUrl,
    dataType: "JSON",
    data: {
      "lanid" : lanInput,
      "yrkesgruppid" : yrkesgruppId
    }
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

/**
 * Hämtar data från arbetsförmedlingens api och lägger till det i första dropdown. Den data som hämtas är yrkesområden.
 */
function populateJobs() {
  $.ajax({
    type: "GET",
    // url: "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesgrupper?",
    url : "http://api.arbetsformedlingen.se/af/v0//platsannonser/soklista/yrkesomraden", 
    // data: {"yrkesomradeid" : 3}, // 3 är id för data/id
    dataType: "json",
    success: function (response) {
      $.each(response.soklista.sokdata, function (index, data) { 
        // Skapa options nodes för drop down lista.
        var option = document.createElement("option");
        $(option)
          .attr("value", index)  
          .attr("data-yrkesomradeid", data.id)
          .html(data.namn)
          .appendTo($("#select-main"))
      });
      $('#select-main').material_select();
    },
    fail: function () {
      console.log("error");
    }
  });
}

/**
 * Hämtar specialiserade yrkesgrupper från arbetsförmedlingen.
 * @param {int} id
 *    En id som innehåller yrkesomradeid.
 */
function populateSpecilzation(id) {
  $("#select-special").empty();
  $.ajax({
    type: "GET",
    url: "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesgrupper?",
    data: { "yrkesomradeid": id},
    dataType: "json",
    success: function (response) {
      console.log(response);
      $.each(response.soklista.sokdata, function (index, data) {
        var option = document.createElement("option");        
        $(option)
          .attr("value", index)
          .attr("data-yrkesgruppid", data.id)
          .html(data.namn)
          .appendTo($("#select-special"));
      });
      $('#select-special').material_select();
    },
    fail: function (response) {
      
    }
  });
  
}

function getPrognos(yrkesomradeid) {
  $.ajax({
    type: "GET",
    url : "http://api.arbetsformedlingen.se/af/v0/yrkesprognoser/soklista/prognoser?",
    data: {
      "yrkesomradeid": yrkesomradeid
    },
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Loopa igenom prognoser och v;lj den med r'tt yrkesgruppid
    }
  });
}

$(document).ready(function () {
    populateJobs();
  $("#select-main").change(function () {
    var selectedMainGroup = $("#select-main").find(":selected").attr("data-yrkesomradeid");
    console.log(selectedMainGroup);
    populateSpecilzation(selectedMainGroup);
  });
    getPrognos(3);  // Finns endast har for testning
});