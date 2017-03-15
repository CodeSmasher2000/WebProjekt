/* Anropar API och hämtar resultat som matchar den inmatade strängen */
$("#donut-example").hide();

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
    $("#result-section").removeClass('hide').hide().fadeIn(1500);
    $("#donut-example").fadeIn(1500);
    allJobs();
    //location.assign("jobresultpage.html");
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

var id = [10,20,9,13,23,6,8,7,25,12,1,4,3,17,24,22,19,14,18,5,];
var lanArr = []; // namn på alla län.
var jobArr= []; // antal jobb i län.

function allJobs(){
  var baseUrl = "http://api.arbetsformedlingen.se/platsannons/matchning";
  var job = sessionStorage.getItem("job");
  var counter = 0;

  for(var i =0;i<id.length;i++){
    $.ajax({
            url: baseUrl + "?lanid=" + encodeURI(id[i]) + "&nyckelord=" + encodeURI(job),
            dataType: "JSON"
    }).done(function(data){
            var jobresult = data.matchningslista;
            console.log(jobresult);
            // console.log(jobresult.matchningdata);
            var annons = jobresult.antal_platsannonser;
            if(annons != 0){
              jobArr[counter] = annons;
              var lan = jobresult.matchningdata[0].lan;
              lanArr[counter] = lan;

              $("#result").append('<h6>' +"Län: " + lan + " Antal jobb: " + annons + '</h6>')
              console.log(" län arr längd",lanArr[counter]);
              counter++;
              if(jobArr.length>3){
                console.log("if-sats");
                //pieChart();
              }
           }
      }).fail(function(data){
          //  $("#title").text("Något gick fel...");
        	//$("#title").show();
            console.log(data);
      });
  }
}

Morris.Donut({
element: 'donut-example',
data: [
  {label: "Download Sales", value: 12},
  {label: "In-Store Sales", value: 30},
  {label: "Mail-Order Sales", value: 20}
],
  backgroundColor:"#ccc",
  labelColor:"#060",
  colors:[
    "#0BA462",
    "#39B580",
    "#67C69D",
  ]
});
