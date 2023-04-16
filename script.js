var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  localStorage.setItem("searchInputVal", searchInputVal);

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './searchResults.html?q=' + searchInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
