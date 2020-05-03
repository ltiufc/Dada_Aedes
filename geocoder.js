
class Coordenada{

  constructor(lat=1,lng=1,count=1){
      this.lat = lat,
      this.lng = lng,
      this.count = count;
  }
}


  
$(document).ready(function(){
    $.get( "./LOCALIDADES.csv",function(data) {
    sales = [];
    var allRows = data.split(/\r?\n|\r/);
    var rowCells = allRows[1].split(',');
    /*for (var singleRow = 1; singleRow < allRows.length; singleRow++) {
      
      let newCoordenada = new Coordenadas(rowCells[0],rowCells[1])
      sales.push(newCoordenada);
    } 
    sales.forEach(element => {
    valores.push({lat:element.lat,lng:element.lng,count:element.price})
    });
    console.log(valores[0])*/

    var apikey = 'bbebf9f2c63e4f60915c152bdf391cc7';
    var CEP = "62900000"
    var localidade = rowCells[0]
    var cidade = "Russas"
    var endereco = rowCells[1]
    var Pais = "Brazil"
    

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
      + '?'
      + 'key=' + apikey
      + '&q=' + encodeURIComponent(endereco + ',' + localidade + ',' + CEP + ',' + cidade + ',' + Pais)
      + '&pretty=1'
      + '&countrycode=BRA'
      + '&roadinfo=1'
      + '&min_confidence=3'


    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    

    request.onload = function() {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      
      if (request.status == 200){ 
        // Success!
        values = []; 

        var data = JSON.parse(request.responseText);
        const {lat , lng} = data.results[0].geometry
        newCoordenada = new Coordenada(lat,lng)
        values.push(newCoordenada);
  
        data = [];

        values.forEach(element => {
          console.log(element)
          data.push({lat:element.lat,lng:element.lng,count:element.count})
        });
        
      var testData = {
          max: 8,
          data,

      }
    
      var baseLayer = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',{
          attribution: '...',
          maxZoom: 20,
          minZoom: 14,
      });
    
      var cfg = {
          "radius": 0.00040,
          "maxOpacity": .8,
          "scaleRadius": true,
          "useLocalExtrema": true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'count',
      };
    
      var heatmapLayer = new HeatmapOverlay(cfg);
    
    
    
      var Map = new L.Map('map-canvas', {
          center: new L.LatLng(-4.9278648,-37.9829375),
          zoom: 18,
          layers: [baseLayer, heatmapLayer]
      });
          
          
      heatmapLayer.setData(testData);

      } else if (request.status <= 500){ 
        // We reached our target server, but it returned an error
                            
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log(data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");        
    };

    request.send();  // make the request*/

  
  });
});

