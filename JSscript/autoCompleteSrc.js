
var poljeID = [];

function deleteRow(r, id) {

    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tablica").deleteRow(i);

    const index = poljeID.indexOf(id);
    poljeID.splice(index, 1);

    if (poljeID.length == 0) $("#tablica").css("visibility", "hidden");


    var tds = document.getElementById('tablica').getElementsByTagName('td');
    var sumaects = 0;
    var sumasati = 0;
    for (var is = 0; is < tds.length; is++) {
        if (tds[is].className == 'ectsi') {
            sumaects += isNaN(tds[is].innerHTML) ? 0 : parseInt(tds[is].innerHTML);
        } else if (tds[is].className == 'satii') {
            sumasati += isNaN(tds[is].innerHTML) ? 0 : parseInt(tds[is].innerHTML);
        }
    }


    document.getElementById("tablica").deleteTFoot();
    $("#tablica").append('<tfoot><tr><td>Ukupno:</td><td style="color:crimson;">' + sumaects + '</td><td style="color:crimson;">' + sumasati + '</td><td> </td><td> </td><td> </td><td> </td></tr></tfoot>');

}

// autoComplete.js input eventListener for search results event
document.querySelector("#autoComplete").addEventListener("results", (event) => {
    console.log(event);
});

// The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
    name: "kolegiji",
    data: {
        src: async function () {
            // Loading placeholder text
            document
                .querySelector("#autoComplete")
                .setAttribute("placeholder", "Loading...");
            // Fetch External Data Source
            const source = await fetch(
                'http://www.fulek.com/VUA/SUPIT/GetNastavniPlan'
            );

            const data = await source.json();

            // Post loading placeholder text
            document
                .querySelector("#autoComplete")
                .setAttribute("placeholder", "kolegiji");
            // Returns Fetched data
            return data;
        },
        key: ["label"],
        results: (list) => {
            // Filter duplicates
            const filteredResults = Array.from(
                new Set(list.map((value) => value.match))
            ).map((koolegij) => {
                return list.find((value) => value.match === koolegij);
            });

            return filteredResults;
        }
    },
    trigger: {
        event: ["input", "focus"]
    },
    placeHolder: "Započnite unos naziva kolegija...",
    searchEngine: "loose",
    highlight: true,
    maxResults: 7,
    resultItem: {
        content: (data, element) => {

            const key = Object.keys(data.value).find(
                (key) => data.value[key] === element.innerText
            );
            element.style = "display: flex; justify-content: space-between;";
            element.innerHTML = `<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                ${element.innerHTML}</span>
               
                `;
        }
    },

    onSelection: (feedback) => {

        var i = feedback.selection.value.value;

        $("#tablica").css("visibility", "visible");



        async function dohvatiiDodaj() {

            const response = await fetch('http://www.fulek.com/VUA/supit/GetKolegij/' + i);
            const data = await response.json();


            $("#tablica").append('<tr><td>' + data.kolegij + '</td><td class="ectsi">' + data.ects + '</td><td class="satii">' + data.sati + '</td><td>' + data.predavanja + '</td><td>' + data.vjezbe + '</td><td>' + data.tip + '</td><td><input class="buttomObrisi" type="button" value="Obriši" onclick="deleteRow(this,' + data.id + ')"></td></tr>');

            var tds = document.getElementById('tablica').getElementsByTagName('td');
            var sumaects = 0;
            var sumasati = 0;
            for (var is = 0; is < tds.length; is++) {
                if (tds[is].className == 'ectsi') {
                    sumaects += isNaN(tds[is].innerHTML) ? 0 : parseInt(tds[is].innerHTML);
                } else if (tds[is].className == 'satii') {
                    sumasati += isNaN(tds[is].innerHTML) ? 0 : parseInt(tds[is].innerHTML);
                }
            }




            document.getElementById("tablica").deleteTFoot();
            $("#tablica").append('<tfoot><tr><td>Ukupno:</td><td style="color:crimson;">' + sumaects + '</td><td style="color:crimson;">' + sumasati + '</td><td> </td><td> </td><td> </td><td> </td></tr></tfoot>');

        }


        if (!poljeID.includes(i)) {

            poljeID.push(i);
            dohvatiiDodaj();

        }

        
        const selection = feedback.selection.value[feedback.selection.key];
        document.querySelector("#autoComplete").value = selection;  

    }
});



