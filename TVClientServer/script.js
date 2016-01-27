
function getDocument(url) {
var request = new XMLHttpRequest();
request.responseType = "document";
request.addEventListener("load", function() {pushDoc(request.responseXML);}, false);
request.open("GET", url, true);
request.send();
return request;
}


function pushDoc(document) {
navigationDocument.pushDocument(document);
}

App.onLaunch = function(options) {
var templateURL = 'http://localhost:8000/stackTemplate.tvml';
//getDocument(templateURL);
navigationDocument.presentModal(alert("pankaj",templateURL));
}

App.onExit = function() {
console.log('App finished');
}

/*
function getDocumentContents(url, loadCallback) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() { loadCallback(templateXHR) }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}
*/

doneCallback: function(event) {
    //1
//    var self = this,
//    ele = event.target,
    videoURL = "http://www.ebookfrenzy.com/ios_book/movie/movie.mov"
    if(videoURL) {
        //2
        var player = new Player();
        var playlist = new Playlist();
        var mediaItem = new MediaItem("video", videoURL);
        
        player.playlist = playlist;
        player.playlist.push(mediaItem);
        player.present();
    }
}

var alert = function(str, doneCallback) {
    var alertXMLString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
    <alertTemplate>
    <title>Hey Listen!</title>
    <description>${str}</description>
    <button>
    <text>OK</text>
    </button>
    </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDOMElement = parser.parseFromString(alertXMLString, "application/xml");
    alertDOMElement.addEventListener("select", doneCallback, false);
    navigationDocument.presentModal(alertDOMElement);
}
