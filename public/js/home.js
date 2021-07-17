$(document).on("click", "#searchButton",function() {
    submitRequestFromHome()
    
})

$(document).on("keypress", "#searchTermInput", function (e) {
    if (e.which == 13 && $("#searchTermInput").val().trim() != "") {
        submitRequestFromHome()
    }
});

function submitRequestFromHome(){
    var searchTerm = $("#searchTermInput").val().trim();    
    if (searchTerm.length > 0) {
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(searchTerm);
        window.open(url,"_self")
        
    }
}