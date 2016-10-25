var userLine, userStation, stationCode, lineColor, colorAccent, trainClass;
var lineArr = [];
var trainsArr = [];

function lineSelect(){
  $(".lineBtn").click(function(){
    userLine = $(this).attr("id");
    console.log(userLine);
    switch (userLine){//set the color for various line related changes
      case "redLine":
        lineColor = "#e51434";
        colorAccent = "#9E152A";
        break;
      case "greenLine":
        lineColor = "#0EAB4A";
        colorAccent = "#016E2B";
        break;
      case "yellowLine":
        lineColor = "#EDCE00";
        colorAccent = "#917F03";
        break;
      case "orangeLine":
        lineColor = "#f38512";
        colorAccent = "#9C5000";
        break;
      case "blueLine":
        lineColor = "#3381FF";
        colorAccent = "#2252A1";
        break;
      case "silverLine":
        lineColor = "#9d9f9d";
        colorAccent = "#636363";
        break;
    }
    $(".stationModal").css("background-color", lineColor);
    $(".lineModal").css("width", "0%");
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "./stations.json",
      success: function (data){
        lineArr.push(data[userLine]);
        console.log(lineArr);
        if (userLine === "yellowLine" || userLine === "silverLine"){
          $(".stationModal").css("color", "black");
        }
        for (var i = 0; i < data[userLine].length; i++){//creating list of stations
          $("#stationList").append("<li class='stationName' id='" + i + "'>" + data[userLine][i].name + "</li>");
          $("li").css("border-bottom", "1px solid " + colorAccent);
          $("li").css("box-shadow", "0px 2px 2px " + colorAccent);
          $(".stationModal").css("width", "60%");
        }
        stationSelect();
      }
    });
  });
}

function stationSelect(){
  $("li").click(function(){
    var pick = $(this).attr("id");
    stationCode = lineArr[0][pick].id;
    userStation = lineArr[0][pick].name;
    $(".yourStation").html("Your Station: " + userStation);
    $(".stationModal").css("width", "0");
    $(".mapContainer").hide();
    $(".mainContainer").show();
    getTrains();
    /*setInterval(getTrains, 10000);*/
});
}

function getTrains() {
var params = {
    "api_key": "abc3f2f368624a3b95358b442ceb43d5",
    // Request parameters
};
$.ajax({
        url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + stationCode + "?" + $.param(params),
        type: "GET",
    })
    .done(function(data){
      $(".dir1Container").empty();
      $(".dir2Container").empty();
      $("#dir1").html("Trains Towards: " + lineArr[0][0].name);
      $("#dir2").html("Trains Towards: " + lineArr[0][lineArr[0].length - 1].name);
      console.log(data);
      for (var i = 0; i < data.Trains.length; i++){
        if(data.Trains[i].Line == "BL"){//if blue train make box for a bluetrain
          trainClass = "BL";
          if (data.Trains[i].Group == "2"){//put box in right column
            if(data.Trains[i].Min == "ARR"){//change arriving notification
              $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
            }
            else if (data.Trains[i].Min == "BRD"){//change boarding notification
              $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
            }else{
          $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
        }else{//or the other column
          if(data.Trains[i].Min == "ARR"){
            $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA:Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
          else if (data.Trains[i].Min == "BRD"){
            $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA:Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }else{
        $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
      }
    }
      else if(data.Trains[i].Line == "YL"){
          trainClass = "YL";
          if (data.Trains[i].Group == "2"){//put box in right column
            if(data.Trains[i].Min == "ARR"){//change arriving notification
              $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
            }
            else if (data.Trains[i].Min == "BRD"){//change boarding notification
              $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
            }else{
          $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
        }else{//or the other column
          if(data.Trains[i].Min == "ARR"){
            $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
          else if (data.Trains[i].Min == "BRD"){
            $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }else{
        $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
      }
    }
      else if(data.Trains[i].Line == "RD"){
        trainClass = "RD";
        if (data.Trains[i].Group == "2"){//put box in right column
          if(data.Trains[i].Min == "ARR"){//change arriving notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#C40000'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
          else if (data.Trains[i].Min == "BRD"){//change boarding notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#C40000'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }else{
        $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
      }else{//or the other column
        if(data.Trains[i].Min == "ARR"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
        else if (data.Trains[i].Min == "BRD"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }else{
      $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
      }
    }
  }
      else if(data.Trains[i].Line == "GR"){
        trainClass = "GR";
        if (data.Trains[i].Group == "2"){//put box in right column
          if(data.Trains[i].Min == "ARR"){//change arriving notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
          else if (data.Trains[i].Min == "BRD"){//change boarding notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }else{
        $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
      }else{//or the other column
        if(data.Trains[i].Min == "ARR"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
        else if (data.Trains[i].Min == "BRD"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }else{
      $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
      }
    }
  }
      else if(data.Trains[i].Line == "OR"){
        trainClass = "OR";
        if (data.Trains[i].Group == "2"){//put box in right column
          if(data.Trains[i].Min == "ARR"){//change arriving notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
          else if (data.Trains[i].Min == "BRD"){//change boarding notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }else{//Minutes ETA
        $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
      }else{//or the other column
        if(data.Trains[i].Min == "ARR"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
        else if (data.Trains[i].Min == "BRD"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }else{//Minutes ETA
      $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
      }
    }
  }
      else if(data.Trains[i].Line == "SV"){
        trainClass = "SV";
        if (data.Trains[i].Group == "2"){//put box in right column
          if(data.Trains[i].Min == "ARR"){//change arriving notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }
          else if (data.Trains[i].Min == "BRD"){//change boarding notification
            $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
          }else{//minutes ETA
        $(".dir1Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
      }else{//or the other column
        if(data.Trains[i].Min == "ARR"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Arriving </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }
        else if (data.Trains[i].Min == "BRD"){
          $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival' style='color:#9E152A'>Train ETA: Boarding </p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
        }else{//Minutes ETA
      $(".dir2Container").append("<div class='row train " + trainClass + "train'><p class='arrival'>Train ETA: " + data.Trains[i].Min + " Mins</p><p class='cars'>Number of Cars: " + data.Trains[i].Car + "</p><p class='destination'>Destination: " + data.Trains[i].DestinationName +"</p></div>");
      }
    }
  }
}//end For loop
    });//end ajaz
}



function menuClose(){
  $(".closeBtn").click(function(){
    $(".lineModal").css("width", "0%");
    $(".stationModal").css("width", "0%");
  });
  $(".newStation").click(function(){
    location.reload();
  });
}


$(document).ready(function () {
  $(".mainContainer").hide();
  $(".lineModal").css("width", "100%");
  lineSelect();
  menuClose();
});
