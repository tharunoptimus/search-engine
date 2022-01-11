var searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', function (event) {
	submitRequestFromHome(false)
});

var imageSearchButton = document.querySelector('#imageSearchButton');
imageSearchButton.addEventListener('click', function (event) {
	submitRequestFromHome(true)
});

document.querySelector("#searchTermInput").addEventListener("keypress", function (e) {
    if (e.which == 13 && document.querySelector("#searchTermInput").value.trim() != "") {
        submitRequestFromHome(false)
    }
});

function submitRequestFromHome(image){
    var searchTerm = searchTermInput.value.trim();
    var extend = '';
    if(image) { var extend = "&type=images"; } 
    if (searchTerm.length > 0) {
        var url = window.location.protocol + "//" + window.location.host + "/search?q=" + encodeURIComponent(searchTerm) + extend;
        window.open(url,"_self")
        
    }
}

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('serviceworker.js')
            .then((reg) => console.log('Success: ', reg.scope))
            .catch((err) => console.log('Failure: ', err));
    })
} 