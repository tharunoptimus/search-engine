var urlParams = getCurrentURLParameters();
var imageCountsArray = [];

$(document).ready(function () {

	if(window.location.hostname !== 'localhost') {
		if (location.protocol !== 'https:') {
			location.replace(`https:${location.href.substring(location.protocol.length)}`);
		}
	}
    printResults();
});

$(document).on("click", "#searchPageSearchButton",function() {
    submitRequestFromSearchPage();
})

$(document).on("keypress", "#subSearchTermInput", function (e) {
    if (e.which == 13 && $("#subSearchTermInput").val().trim() != "") {
        submitRequestFromSearchPage();
    }
});


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
    if(urlParams.type == null) {
        applyBorderBottomToTab(true);
        // Printing Site Results
        if (resultsObject.length == 0) {
            html ="<span class='noResults'>No Results Found</span>";
            paginationButtonsController(false)
        } else {
            html = createSiteResultHtml(resultsObject);
            paginationButtonsController(true)
        }
    }
    else {
        applyBorderBottomToTab(false);
        // Printing Images
        if (resultsObject.length == 0) {
            html ="<span class='noResults'>No Results Found</span>";
            paginationButtonsController(false)
        } else {
            html = createImageResultHtml(resultsObject);
            imageCountsArray.forEach(data => {
                loadImage(data.url, data.uniqueClass);
            });
            paginationButtonsController(true)
        }
        
    }

    return html;
}

function paginationButtonsController (condition) {
    if(condition) {
        if(urlParams.start == null) {
            // First page of the results
            $("#previousButton").hide();
        }
    
    }
    else {
        $("#nextButton").hide();
        if(urlParams.start == null || parseInt(urlParams.start) == 0) { $("#previousButton").hide(); }
    }
}

// document element on click function
$(document).on("click", "#previousButton", function () {
    console.log("clicked previous button")
    var q = urlParams.q;
    var start = urlParams.start != null ? parseInt(urlParams.start) : 0;
    var type = urlParams.type != null ? "&type=" + urlParams.type : "";

    if(start == 0 || start < 10) {
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(q) + type;
        window.open(url,"_self")
        return;
    }

    if (start >= 10) { 
        start = start - 10;

        if(start == 0) { start = "" }
        else {start = "&start=" + start; }
        
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(q) + start + type;
        window.open(url,"_self")
    }
    
})

$("#nextButton").on("click", function () {
    console.log("clicked me")
})

$(document).on("click", "#nextButton", function () {
    console.log("clicked me")
    var q = urlParams.q;
    var start = urlParams.start != null ? parseInt(urlParams.start) : 0;
    var type = urlParams.type != null ? "&type=" + urlParams.type : "";

    start = start + 10;
    start = "&start=" + start;
    var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(q) + start + type;
    window.open(url,"_self")
})

function printResults () {
    if(resultObject !== undefined){
        if(urlParams.type == null) {
            $(".resultsDiv").html(decideWhatToPrint(resultObject));
            $(".imagesDiv").remove();
        }
        else {
            $(".imagesDiv").html(decideWhatToPrint(resultObject));
            $(".resultsDiv").remove();
        } 
    }
}

function applyBorderBottomToTab(value) {
    if(value) {
        $("#sitesSpanTab").addClass("appendBorder");
    }
    else {
        $("#imagesSpanTab").addClass("appendBorder");
    }
}

function createImageResultHtml (results) {
    var html = "";
    for (let i = 0; i < results.length; i++) {
        let alt = results[i].alt !== undefined ? results[i].alt : "";
        let url = results[i].url !== undefined ? results[i].url : "#";
        let id = results[i]._id;
        let uniqueClass = 'image' + i;
        imageCountsArray.push({url, uniqueClass});

        html = html + `
        <div class='gridItem image${i}'>
           <a href='${url}' data-id='${id}'>
                <span class='details'>${alt}</span>
           </a>
        </div>`;
    }

    return html;
}

function loadImage(src, className) {
    var image = $("<img/>");

    image.on("load", function () {
        $("." + className + " a").append(image);
    });

    image.on("error", function () {
        $("." + className).remove();
    });

    image.attr("src", src);
}


// find the child element img src if the parent item is clicked
$(document).on("click", ".gridItem", function (e) {
    e.preventDefault()
    var url = $(this).find("a").attr("href");
    var alt = $(this).find("span.details").text();
    var urlSplit = url.split("//");
    var urlHost = urlSplit[1];
    var urlHostSplit = urlHost.split("/");
    var urlHostName = urlHostSplit[0];
    
    
    $("#showImagePreview").modal("show");
    $("#previewImage").attr("src", url);
    var captionHTML = `<a href="${url}"> ${alt} </a>`
    $("#previewImageCaption").html(captionHTML);
    $("#previewImageLink").attr("href", urlHostName);

    $("#previewImageLink").html("Visit Website");

})

// on clicking #sitesSpanTab do something
$("#sitesSpanTab").on("click", function () {
    changeSearchType(true)
})

$("#imagesSpanTab").on("click", function () {
    changeSearchType(false)
})

function changeSearchType (type) {
    var q = urlParams.q;
    if(type) {
        type = "";
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(q) + type;
        // window.open(url,"_self")
        console.log("clicked sites span")
        console.log(url)
        window.open(url, "_self")
    }
    else {
        type = "&type=images";
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(q) + type;
        window.open(url,"_self")
    }
}