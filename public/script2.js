function btnClicked() {
    const query = document.querySelector('div > #videolink').value;
    const xhr = new XMLHttpRequest();

    if (query.length > 0) {
        xhr.open('POST', '/query');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const data = JSON.parse(xhr.responseText);
                renderResults(data);
            }
        }
        xhr.send(query);
    }
}

function renderResults(data) {
    const outpute = document.getElementById('from-server');

    let result = '';

    for (e of data) {
        result += `
        <div class="mb-2" style="max-width: 200px;">
            <div><img src="${e.thumbnail}" style="width: 200px;" alt=""></div>
            <h6 style="word-wrap: break-word;">${e.title}</h6>
        </div>`
    }

    outpute.innerHTML = result;
}