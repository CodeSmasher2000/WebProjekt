/* Anropar API och hämtar resultat som matchar den inmatade strängen */
$("#donut-result").hide();
$("#result-section").hide();
$('.parallax').parallax();
$('select').material_select();

var donutResult = Morris.Donut({
        element: 'donut-result',
        data: [
          {label: "placeholder", value: 0}
        ],
          backgroundColor:"#ccc",
          labelColor:"#060",
          colors:[
            "#0BA462",
            "#39B580",
            "#67C69D",
          ]
        }).on('click', function(i, row){
            alert(row.label + row.value);
            console.log(i, row);
        });

$("#submit-job").on("click", function(){
  $("#result").empty();
  $("#donut-result").hide();
  $("#result-section").hide();
  var movieDiv = document.getElementById("div-job");
  var baseUrl = "http://api.arbetsformedlingen.se/platsannons/matchning";
  var yrkesgruppId = $("#select-special").find(":selected").attr("data-yrkesgruppid");
  sessionStorage.setItem("job", yrkesgruppId);
  console.log(yrkesgruppId);

  var id = [10, 20, 9, 21, 13, 23, 6, 8, 7, 25, 12, 1, 4, 3, 17, 24, 22, 19, 14, 18, 5];
  var lanArr = ["Blekinge Län", "Dalarnas län", "Gotlands län",
          "Gävleborgs län", "Hallands län", "Jämtlands län",
          "Jönköpings län", "Kalmar län", "Kronobergs län",
          "Norrbottens län", "Skåne län", "Stockholms län",
          "Södermanlands län", "Uppsala län", "Värmlands län",
          "Västerbottens län", "Västernorrlands län", "Västmanlands län",
          "Västra Götalands län", "Örebro län", "Östergötlands län"]; // namn på alla län.
  var jobArr = []; // antal jobb i län.

  var promises = [];
  var i = 0;
  for(i = 0; i < id.length; i++) {
      (function(i)
      {
        var request = $.ajax({
            url: baseUrl,
            dataType: "JSON",
            data: {
              "lanid" : id[i],
              "yrkesgruppid" : yrkesgruppId
            }
          }).done(function(data){
            var jobresult = data.matchningslista;
            console.log(jobresult);
            console.log(lanArr[i]);
            var annons = jobresult.antal_platsannonser;
            console.log(annons);
            jobArr[i] = annons;
            $("#result").append('<h6>' +"Län: " + lanArr[i] + " Antal jobb: " + annons + '</h6>');
          }).fail(function(data){
            console.log(data);
          });

          promises.push(request);
      })(i);
  }

  $.when.apply(null, promises).done(function(){
      donutResult.setData([
        {label: lanArr[0], value: jobArr[0]},
        {label: lanArr[1], value: jobArr[1]},
        {label: lanArr[2], value: jobArr[2]},
        {label: lanArr[3], value: jobArr[3]},
        {label: lanArr[4], value: jobArr[4]},
        {label: lanArr[5], value: jobArr[5]},
        {label: lanArr[6], value: jobArr[6]},
        {label: lanArr[7], value: jobArr[7]},
        {label: lanArr[8], value: jobArr[8]},
        {label: lanArr[9], value: jobArr[9]},
        {label: lanArr[10], value: jobArr[10]},
        {label: lanArr[11], value: jobArr[11]},
        {label: lanArr[12], value: jobArr[12]},
        {label: lanArr[13], value: jobArr[13]},
        {label: lanArr[14], value: jobArr[14]},
        {label: lanArr[15], value: jobArr[15]},
        {label: lanArr[16], value: jobArr[16]},
        {label: lanArr[17], value: jobArr[17]},
        {label: lanArr[18], value: jobArr[18]},
        {label: lanArr[19], value: jobArr[19]},
        {label: lanArr[20], value: jobArr[20]}
    ]);
    $("#donut-result").fadeIn(2000);
    $("#result-section").fadeIn(2000);
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
    fail: function (response) {
      console.log(response);
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
        console.log(response);
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
    //getPrognos(3);  // Finns endast har for testning
});
