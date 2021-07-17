$(document).ready(function () {
    (function () {
        var cssFa = document.createElement("link");
        cssFa.href =
            "https://kit-pro.fontawesome.com/releases/v5.12.1/css/pro.min.css";
        cssFa.rel = "stylesheet";
        cssFa.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(cssFa);
    
        var cssMain = document.createElement("link");
        cssMain.href = "/css/main.css";
        cssMain.rel = "stylesheet";
        cssMain.type = "text/css";
        document.getElementById("maincss").disabled = true;
        document.getElementsByTagName("head")[0].appendChild(cssMain);
    })();
});

$(document).on("click", "#searchButton",function() {
    submitRequestFromHome()
    
})

$(document).on("keypress", "#searchTermInput", function (e) {
    if (e.which == 13 && $("#searchTermInput").val() != "") {
        submitRequestFromHome()
    }
});

function submitRequestFromHome(){
    var searchTerm = $("#searchTermInput").val().trim();    
    if (searchTerm.length > 0) {
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + searchTerm;
        window.open(url,"_self")
        
    }
}

function isValidURL(url) {
    var pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    return pattern.test(url);
}