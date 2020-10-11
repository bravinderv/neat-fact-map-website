const fl = document.getElementById("fl");
const c = document.getElementById("c");
const gt = document.getElementById("gt");
const hl = document.getElementById("hl");
const hp = document.getElementById("hp");
const input = document.getElementById('addressTextBox');
const reCenterButton = document.getElementById('recenterButton');
//const contentBox = document.getElementById("entryContents");

var map;
var options;
var openInfoWindow;
var flChecked = false;
var cChecked = false;
var hlChecked = false;
var gtChecked = false;
var hpChecked = false;

flEntry = [];
flMarker = [];

histEntry = [];
histMarker = [];

gtEntry = [];
gtMarker = [];

umEntry = [];
umMarker = [];

hauEntry = [];
hauMarker = [];

function generateMap()
{
    var location = {lat: 33.879799,lng: -117.885231};
    options = {
        zoom:11, 
        center:location
    }
    map = new google.maps.Map(document.getElementById('map'),options);
    activatePlacesSearch();
    addMarker(location.lat, location.lng, "this is cal state fullerton");
}

function activatePlacesSearch()
{
    var autocomplete = new google.maps.places.Autocomplete(input);
    
}

function recenterMap(zoomNum, lt,long)
{
    var coord = {lat: lt, lng:long};
    options = {
        zoom:zoomNum, 
        center:coord
    };
    map.setCenter(coord);

}

function readFileAsCSV(contents, type)
{  
    
    let csvForm = contents.split("\n");
    si = csvForm.length;
    x = 0;
    entry = [];
    while (x < si)
    {       
        let com = csvForm[x].split(',');
        detail = [];
        for(let j = 0; j < com.length; j++)
        {
            if(j >= com.length-2 )
            {
                var fl = parseFloat(com[j]);
                detail.push(fl);
            }
            else
            {
                detail.push(com[j]);
            }
        }
        entry.push(detail); 
            /*fil = entry[x][0];
            adrs = entry[x][1];
            nt = entry[x][2];
            lt = entry[x][3];
            lg = entry[x][4];
            addFilmMarker(fil,adrs,nt,lt,lg);*/
        x++;     
    }
        
    if(type == 'film')
    {
        flEntry = entry;
        //createAllMarkers(flEntry, type);
        //hideFilmMarkers();
    }
    else if(type == 'history')
    {
        histEntry = entry;
        //createAllMarkers(histEntry, type);
        //hideHistoryMarkers();
    }
    else if(type == 'ghost')
    {
        gtEntry = entry;
        //createAllMarkers(gtEntry, type);
        //console.log(gtMarker);
        //hideGhostTownMarkers();
    }
    else if(type == 'murder')
    {
        umEntry = entry;
        //createAllMarkers(umEntry, type);
        //console.log(umMarker);
        //hideGhostTownMarkers();
    }
    else if(type == 'haunted')
    {
        hauEntry = entry;
        //console.log(hauEntry);
        //createAllMarkers(gtEntry, type);
        //hideGhostTownMarkers();
    }
             
}



function addGhostTownMarker(title, notes, lt, lg)
{
    cont = "<b>" + title + "</b> <br />" + 
    notes;

    var marker = new google.maps.Marker({
        position:{lat: lt,lng: lg},
        map:map,
        icon:'..dots/orange-dot.png'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: cont 

    });

    marker.addListener('click', function(){
        if(openInfoWindow)
        {
            openInfoWindow.close();
        }
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
        //contentBox.innerHTML = infoWindow.content;
    });

    gtMarker.push(marker);
}

function addHistoryMarker(sta, title, notes, lt, lg)
{
    cont = "<b>" + title + "</b> <br />" + 
    notes;

    var marker = new google.maps.Marker({
        position:{lat: lt,lng: lg},
        map:map,
        icon:'../dots/ltblue-dot.png'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: cont 

    });

    marker.addListener('click', function(){
        if(openInfoWindow)
        {
            openInfoWindow.close();
        }
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
        //contentBox.innerHTML = infoWindow.content;
    });

    histMarker.push(marker);
}

function addFilmMarker(film, address, notes, lt, lg)
{
    cont = " Film/TV Show: <b>" + film + "</b> <br />" + 
    " Place: <i>" + address + "<\i> <br />" + 
    notes;
    var marker = new google.maps.Marker({
        position:{lat: lt,lng: lg},
        map:map,
        icon:'../dots/yellow-dot.png'
        //icon:'movie.jpg'
    });
    
    var infoWindow = new google.maps.InfoWindow({
        content: cont 

    });

    marker.addListener('click', function(){
        if(openInfoWindow)
        {
            openInfoWindow.close();
        }
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
        //contentBox.innerHTML = infoWindow.content;
        //contentBox.scrollIntoView();
    
        
    });

    flMarker.push(marker);
}

function addUnsolvedMarker(date,last,first,race,age,sex,city,state,lt,lg)
{
    cont = "Date: " + date + "<br>" + 
            "First Name: " + first + "<br>" +
            "Last Name: " + last + "<br>" +
            "Race: " + race + "<br>" +
            "sex: " + sex + "<br>" +
            "Location: " + city +',' + state;
            
    var marker = new google.maps.Marker({
        position:{lat: lt,lng: lg},
        map:map,
        icon:'dots/purple-dot.png'
        //icon:'movie.jpg'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: cont 

    });

    marker.addListener('click', function(){
        if(openInfoWindow)
        {
            openInfoWindow.close();
        }
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
        //contentBox.innerHTML = infoWindow.content;
        
    });
    
    umMarker.push(marker);
}

function addHauntedMarker(city, description, location, state, lt, lg)
{
    
    cont = "Location: " + location + "<br>" + 
        "City: " + city + "<br>" + 
        "State: " + state + "<br><br>" + description; 
        
    var marker = new google.maps.Marker({
        position:{lat: lt,lng: lg},
        map:map,
        icon:'dots/green-dot.png'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: cont 

    });

    marker.addListener('click', function(){
        if(openInfoWindow)
        {
            openInfoWindow.close();
        }
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
        //contentBox.innerHTML = infoWindow.content;
        
    });
    
    hauMarker.push(marker);
}

function createAllMarkers(entry, type)
{
    s = entry.length;
    for(let i = 0; i < (s - 1); i++)
    {
        if(type == "film")
        {
            console.log(entry[i][0]);
            fil = entry[i][0];
            adrs = entry[i][1];
            nt = entry[i][2];
            lt = entry[i][3];
            lg = entry[i][4];
            addFilmMarker(fil,adrs,nt,lt,lg);
        }
        else if(type == "history")
        {
            sta = entry[i][0];
            title = entry[i][1];
            nt = entry[i][2];
            lt = entry[i][3];
            lg = entry[i][4];
            addHistoryMarker(sta,title,nt,lt,lg);
        }
        else if(type == 'ghost')
        {
            title = entry[i][0];
            nt = entry[i][1];
            lt = entry[i][2];
            lg = entry[i][3];
            addGhostTownMarker(title,nt,lt,lg);
        }
        else if(type == 'murder')
        {
            date = entry[i][0];
            last = entry[i][1];
            first = entry[i][2];
            race = entry[i][3];
            age = entry[i][4];
            sex = entry[i][5];
            city = entry[i][6];
            state = entry[i][7];
            lat = entry[i][8];
            lng = entry[i][9];
            addUnsolvedMarker(date,last,first,race,age,sex,city,state,lat,lng);
        }
        else if(type == 'haunted')
        {
            city = entry[i][0];
            desc = entry[i][1];
            loc = entry[i][2];
            state = entry[i][3];
            lat = entry[i][4];
            lng = entry[i][5];
            addHauntedMarker(city, desc, loc, state, lat, lng);
        }
    }

}

function createAllFilmMarkers()
{
    console.log("film start");
    s = flEntry.length;
    for(let i = 0; i < (s - 1); i++)
    {
        fil = flEntry[i][0];
        adrs = flEntry[i][1];
        nt = flEntry[i][2];
        lt = flEntry[i][3];
        lg = flEntry[i][4];
        addFilmMarker(fil,adrs,nt,lt,lg);
    }
    console.log("film markers:");
    console.log(s);
}

function createAllHistoryMarkers()
{
    console.log("hist start");
    s = histEntry.length;
    for(let i = 0; i < (s - 1); i++)
    {
        sta = histEntry[i][0];
        title = histEntry[i][1];
        nt = histEntry[i][2];
        lt = histEntry[i][3];
        lg = histEntry[i][4];
        addHistoryMarker(sta,title,nt,lt,lg);
    }
    console.log("history markers:");
    console.log(s);
}

function createAllGhostMarkers()
{
    console.log("ghost town start");
    s = gtEntry.length;
    for(let i = 0; i < (s - 1); i++)
    {
        title = gtEntry[i][0];
        nt = gtEntry[i][1];
        lt = gtEntry[i][2];
        lg = gtEntry[i][3];
        addGhostTownMarker(title,nt,lt,lg);
    }
    console.log("ghost town markers:");
    console.log(s);
}

function createAllMurderMarkers()
{
    s = umEntry.length;
    for(let i = 0; i < (s - 1); i++)
    {
        date = umEntry[i][0];
        last = umEntry[i][1];
        first = umEntry[i][2];
        race = umEntry[i][3];
        age = umEntry[i][4];
        sex = umEntry[i][5];
        city = umEntry[i][6];
        state = umEntry[i][7];
        lat = umEntry[i][8];
        lng = umEntry[i][9];
        addUnsolvedMarker(date,last,first,race,age,sex,city,state,lat,lng);
    }
    console.log("murder markers:");
    console.log(s);
}

function createAllHauntedMarkers()
{
    s = hauEntry.length;
    for(let i = 0; i < (s - 1); i++)
    {
        city = hauEntry[i][0];
        desc = hauEntry[i][1];
        loc = hauEntry[i][2];
        state = hauEntry[i][3];
        lat = hauEntry[i][4];
        lng = hauEntry[i][5];
        addHauntedMarker(city, desc, loc, state, lat, lng);
    }
    console.log("haunted markers:");
    console.log(s);
}

function showAllFilmMarkers()
{
    si = flMarker.length;
    for(let i = 0; i < si; i++)
    {
        flMarker[i].setVisible(true);
    }
}

function hideFilmMarkers()
{
    si = flMarker.length;
    for(let i = 0; i < si; i++)
    {
        flMarker[i].setVisible(false);
    }
}

function showAllGhostTownMarkers()
{
    si = gtMarker.length;
    for(let i = 0; i < si; i++)
    {
        gtMarker[i].setVisible(true);
    }
}

function hideGhostTownMarkers()
{
    si = gtMarker.length;
    for(let i = 0; i < si; i++)
    {
        gtMarker[i].setVisible(false);
    }
}

function showAllHistoryMarkers()
{
    si = histMarker.length;
    for(let i = 0; i < si; i++)
    {
        histMarker[i].setVisible(true);
    }
}

function hideHistoryMarkers()
{
    si = histMarker.length;
    for(let i = 0; i < si; i++)
    {
        histMarker[i].setVisible(false);
    }
}

function showAllUnsolvedMarkers()
{
    si = umMarker.length;
    for(let i = 0; i < si; i++)
    {
        umMarker[i].setVisible(true);
    }
}

function hideUnsolvedMarkers()
{
    si = umMarker.length;
    for(let i = 0; i < si; i++)
    {
        umMarker[i].setVisible(false);
    }
}

function showAllHauntedMarkers()
{
    si = hauMarker.length;
    for(let i = 0; i < si; i++)
    {
        hauMarker[i].setVisible(true);
    }
}

function hideHauntedMarkers()
{
    si = hauMarker.length;
    for(let i = 0; i < si; i++)
    {
        hauMarker[i].setVisible(false);
    }
}

function addMarker(lt,lg, cont)
{
    var marker = new google.maps.Marker({
        position:{lat: lt,lng: lg},
        map:map
    });

    var infoWindow = new google.maps.InfoWindow({
        content:cont
    });

    marker.addListener('click', function(){
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
        console.log(infoWindow);
        console.log(openInfoWindow);
        
    });

    marker.setVisible(false);

}

function geocode(addressString){
    var coordinates =[0,0];
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: addressString},function(results, status)
    {
        if( status == google.maps.GeocoderStatus.OK )
        {
             coordinates = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
             recenterMap(14, coordinates[0], coordinates[1]);
        }
        else
        {
            alert ('Geocode was not successful for the following reason: ' + status);
        }

    });
}

function main(){
    type = 'film';
    window.scrollTo(400, 0);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            //console.log("type is : " + type);
            readFileAsCSV(xmlhttp.responseText, type)
        }
    };

    type = 'film';
    xmlhttp.open("GET","data/FLNoCommaTest.csv",false);
    xmlhttp.send();
    //createAllFilmMarkers();

    type = 'history';
    xmlhttp.open("GET","data/HistorialLocationsUS.csv",false);
    xmlhttp.send();
    //createAllHistoryMarkers();

    type = 'ghost';
    xmlhttp.open("GET","data/GTCompleteUS.csv",false);
    xmlhttp.send();
    //createAllGhostMarkers();
    
    type = 'murder';
    xmlhttp.open("GET","data/UMFormatted.csv",false);
    xmlhttp.send();
    //createAllMurderMarkers();
    
    type = 'haunted';
    xmlhttp.open("GET","data/hauntedLocationsFormatted.csv",false);
    xmlhttp.send();
    //createAllHauntedMarkers();
    
    reCenterButton.addEventListener('click', function(){
        console.log(input.value);
        var address = input.value;
        console.log(address);
        geocode(address);
    })

    fl.addEventListener('change', function(){
        console.log(1);
        if(fl.checked){
            console.log(2);
            if(flChecked == false)
            {
                console.log(3);
                createAllMarkers(flEntry,'film');
                console.log(4);
                flChecked == true;
            }
            else{
                console.log(5);
                showAllFilmMarkers();
            }    
        }
        else{
            console.log(-1);
            if(openInfoWindow)
            {
                console.log(-2);
                openInfoWindow.close();
            }
            hideFilmMarkers();
        }
    })

    c.addEventListener('change', function(){
        if(c.checked){
            if(cChecked == false)
            {
                cChecked = true;
                createAllMarkers(umEntry,'murder');
                
            }
            else
            {
                showAllUnsolvedMarkers()
            }
        }
        else{
            if(openInfoWindow)
            {
                openInfoWindow.close();
            }
            hideUnsolvedMarkers()
        }
    })

    hl.addEventListener('change', function(){
        if(hl.checked){
            if(hlChecked == false)
            {
                hlChecked = true;
                createAllMarkers(histEntry,'history');
            }
            else{
                showAllHistoryMarkers();
            }
        }
        else
        {
            if(openInfoWindow)
            {
                openInfoWindow.close();
            }
            hideHistoryMarkers();
        }
    })

    gt.addEventListener('change', function(){
        if(gt.checked){
            if(gtChecked == false)
            {
                gtChecked == true;
                createAllMarkers(gtEntry,'ghost');
            }
            else{
                showAllGhostTownMarkers();
            } 
        }
        else{
            if(openInfoWindow)
            {
                openInfoWindow.close();
            }
            hideGhostTownMarkers();
        }
    })

    hp.addEventListener('change', function(){
        if(hp.checked){
            if(hpChecked == false)
            {
                hpChecked = true;
                createAllMarkers(hauEntry,'haunted');
            }
            else{
                showAllHauntedMarkers();
            }

        }
        else{
            if(openInfoWindow)
            {
                openInfoWindow.close();
            }
            hideHauntedMarkers();
        }
    })

    window.addEventListener("keypress", function(e)
    {
        var address = input.value;
        if(e.keyCode==13)
        {
            geocode(address);
        }
    })

}

main();
