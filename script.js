//Created this page using classwork 06-27 mini-project javascript as a reference
//Changed it to save the value to local storage and pull from local storage on Search Results page

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  
  localStorage.setItem("searchInputVal", searchInputVal);
  var searchResults = './searchResults.html';

  location.assign(searchResults);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
