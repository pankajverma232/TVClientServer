    var rLoader;

App.onLaunch = function(options) {
//    // 1
//    var alert = createAlert("Hello World", ""); //leaving 2nd parameter with an empty string
//    navigationDocument.presentModal(alert);

    evaluateScripts(["http://localhost:8000/resourceLoader.js","http://localhost:8000/Presenter.js"], function(success) {
                    if(success) {
                    rLoader = new resourceLoader(options.BASEURL);
                    
                    rLoader.loadResource("http://localhost:8000/otherTemplate_xml.js", function(resource) {
                                                var doc = Presenter.makeDocument(resource);
                                                doc.addEventListener("select", Presenter.load.bind(Presenter)); //add this line
                                                Presenter.pushDocument(doc);
                                                });
                    } else {
                    var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
                    navigationDocument.presentModal(errorDoc);
                    }
                    });
    
   }

// 2
var createAlert = function(title, description) {
    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
    <alertTemplate>
    <title>${title}</title>
    <description>${description}</description>
    <button>
    <text>OK</text>
    </button>
    </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}