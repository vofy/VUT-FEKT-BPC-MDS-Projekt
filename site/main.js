function addRow() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(table.rows.length); // vložení řádku do tabulky
    var cellId = row.insertCell(0); // vytvoření sloupce
    var cellSecond = row.insertCell(1); // druhý sloupec
    cellId.innerHTML = table.rows.length - 1; // nastavení textu sloupce
    position++;
}

function showModal() {
    var playerModal = document.getElementById('playerModal');
    playerModal.show();
}

function include() {
    var includes = document.getElementsByTagName("include");

    for (let element of includes) {
        fetch(element.getAttribute("src"), {
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
            }
        })
        .then(response => {
            return response.text()
        })
        .then(data => {
            element.innerHTML = data;
        });
    }
}

window.onload = include;