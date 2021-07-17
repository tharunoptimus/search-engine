$(document).on("click", "#searchButton",function() {
    submitRequestFromHome()
    
})

$(document).on("keypress", "#searchTermInput", function (e) {
    if (e.which == 13 && $("#searchTermInput").val().trim() != "") {
        submitRequestFromHome()
    }
});

$(document).on("click", "#searchPageSearchButton",function() {
    submitRequestFromSearchPage();
})



$(document).on("keypress", "#subSearchTermInput", function (e) {
    if (e.which == 13 && $("#subSearchTermInput").val().trim() != "") {
        submitRequestFromSearchPage();
    }
});

function submitRequestFromHome(){
    var searchTerm = $("#searchTermInput").val().trim();    
    if (searchTerm.length > 0) {
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(searchTerm);
        window.open(url,"_self")
        
    }
}

function submitRequestFromSearchPage() {
    var params = getCurrentURLParameters();
    if($("#subSearchTermInput").val().trim() == "") return;
    var q = $("#subSearchTermInput").val().trim();
    var type = params.type != null ? "&type=" + params.type : "";
    var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(q) + type;
    window.open(url,"_self")
}

function getCurrentURLParameters() {
    var currentURL = window.location.href;
    var url = new URL(currentURL);
    var q = url.searchParams.get("q");
    var start = url.searchParams.get("start");
    var type = url.searchParams.get("type");
    var urlParams = {
        "q": q,
        "start": start !== null ? start : null,
        "type": type !== null ? type : null
    }

    return urlParams;
}

function isValidURL(url) {
    var pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    return pattern.test(url);
}