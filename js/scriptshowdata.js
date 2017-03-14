 // $("#antal-jobb").text(sessionStorage.getItem("result"));
  $("#result").append('<h3>' + sessionStorage.getItem("result") + '</h3>')
  
var id = [10,20,9,13,23,6,8,7,25,12,1,4,3,17,24,22,19,14,18,5,];
var lanArr = []; // namn på alla län.
var jobArr= []; // antal jobb i län.

allJobs();
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
      
     // $("#result").append('<h6>' +"Län: " + lan + " Antal jobb: " + annons + '</h6>')
      console.log(" län arr längd",lanArr[counter]);
      counter++;
      if(jobArr.length>3){
        console.log("if-sats");
        pieChart();
      }
   }
    
    
    
  

  }).fail(function(data){
  //  $("#title").text("Något gick fel...");
	//$("#title").show();
    console.log(data);
  });
 
    
  }

  
}

         
/*

function pieChart(){
var data = {
    labels: lanArr,
    datasets: [
        {
            data: jobArr,
            backgroundColor: [
              "#FF00FF",
              "#00F5FF",
              "#E066FF",
              "#9ACD32",
              "#FFEC8B",
              "#006400",
              "#90EE90",
              "#FFBBFF",
              "#E9967A",
              "#0000FF",
              "#C67171",
              "#EE0000",
              "#EAEAEA",
              "#008B45",
              "#800080",
              "#CAE1FF",
              "#00FF7F",
              "#8B0000",
              "#FFFF00",
              "#F0E68C",
              "#454545" 
            ],
            hoverBackgroundColor: [
              "#FCFCFC"
            ]
    
        }]
};

var ctx = document.getElementById("myChart").getContext('2d');
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {

       maintainAspectRatio: true

    }
});
}
 */

  //Donut Chart
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
            

