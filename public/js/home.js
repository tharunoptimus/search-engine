$(document).on("click", "#searchButton",function() {
    submitRequestFromHome(false)
    
})

$(document).on("click", "#imageSearchButton",function() {
    submitRequestFromHome(true)
    
})

$(document).on("keypress", "#searchTermInput", function (e) {
    if (e.which == 13 && $("#searchTermInput").val().trim() != "") {
        submitRequestFromHome(false)
    }
});

function submitRequestFromHome(image){
    var searchTerm = $("#searchTermInput").val().trim();
    var extend = '';
    if(image) { var extend = "&type=images"; } 
    if (searchTerm.length > 0) {
        var url = window.location.protocol + "//" + window.location.host + "/search/?q=" + encodeURIComponent(searchTerm) + extend;
        window.open(url,"_self")
        
    }
}