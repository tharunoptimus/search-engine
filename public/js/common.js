$(document).ready(function () {
    if(resultObject !== undefined){
        $(".resultsDiv").html(decideWhatToPrint(resultObject));
    }
});

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

function createSiteResultHtml (results) {
    var html = "";
    results.forEach(result => {
        var descriptionThing = (result.description).length <= 300 ? result.description : result.description.substring(0, 300) + "...";
        html = html + `
        <div class='resultDiv'>
            <div class='resultUrl'>
                <a class='resultTitleUrl' href='${result.url}'>${result.url}</a>
            </div>
            <div class='resultTitle'>
                <a class='resultTitleUrl' href='${result.url}'>${result.title}</a>
            </div>
            <div class='resultDescription'>
                ${result.description}
            </div>
        </div>`;
    });
    return html;
}

function decideWhatToPrint(resultsObject) {
    var html = "";
    console.log(resultsObject.length)
    if (resultsObject.length == 0) {
        html ="<span class='noResults'>No Results Found</span>";
    } else {
        var urlParams = getCurrentURLParameters();
        if(urlParams.type == null) {
            html = createSiteResultHtml(resultsObject);
        }
    }

    return html;
}