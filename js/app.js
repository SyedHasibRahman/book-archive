const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));

}


const displaySearchResult = books => {
    // Count total
    const total = books.length;
    const totalCount = document.getElementById('total-count');
    totalCount.innerHTML = `<h3>Total ${total} results founded</h3>`;
    // main div to display results 
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (total !== 0) {
        books.forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadBookDetail( )" class="col"> 
                <div class="card border border-success border-2">
                    <img height="250px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..."> 
                    <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <p class="card-text fw-bold">Author: <span class="text-success"> ${book.author_name} </span></p>
                    <p class="card-text"> Publisher: ${book.publisher} </p>
                    <p class="card-text"><small class="text-muted"> First publishing year: ${book.first_publish_year}</small></p>
                  </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);

        });
    }
    else {
        totalCount.innerHTML = `<h3>Please type a valid name</h3>`;
    }

}