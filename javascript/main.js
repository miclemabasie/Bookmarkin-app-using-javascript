// Listen for form submision

const form = document.getElementById("myform")
const btn = document.getElementById("submit")

fetchBookmarks()

form.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    // Get form values
    var siteUrl = document.getElementById("siteUrl").value;
    var siteName = document.getElementById("siteName").value;

    if (!validateForm(siteName, siteUrl))
        var bookmark = {
            name: siteName,
            url: siteUrl
        }

    console.log(bookmark)


    // Local Storage Testing stores only string so we have to parse the data
    // localStorage.setItem('test', 'Hello world')
    // console.log(localStorage.getItem("test"))
    // localStorage.removeItem('test')
    // console.log(localStorage.getItem("test"))


    // Test if bookmark is null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark)
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    } else {
        // Get all the existing bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) // Convert the string into a json array
        // Add the newly created bookmark to it
        bookmarks.push(bookmark)
        // Save it back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    }
    fetchBookmarks()

    // Prevent form from submitting
    e.preventDefault();

}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please feel in the form")
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Pleas use a valid url");
        return false;
    }

    return true

}

// Fetch from localStorage
function fetchBookmarks() {

    // GEt bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults')

    // Build output
    bookmarksResults.innerHTML = '<h1>This is Test </h1>';

    if (bookmarks !== null) {
        for (var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url

            bookmarksResults.innerHTML += `<div class="well">
            <h3>${name}
            <a class="btn btn-default" targer="_blank" href="${url}">Visit</a>
            <a onclick="deleteBookmark('${url}')" class="btn btn-danger" id="del" targer="_blank" href="#">Delete</a>
        `

        }
    }
}

function deleteBookmark(url) {
    // Get all all the items from storage and remove that with the 
    // given url and reset the rest of the items
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    // Loop through bookmarks to check which on corresponse
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            // Remove from array
            bookmarks.splice(i, 2)
        }
    }
    // Re-Set localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    fetchBookmarks()
}