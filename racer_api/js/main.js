const getData = async (season,round) =>{
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data
};

const loadData = async(season,round) =>{
    const racers = await getData(season,round);
    console.log(racers)
    loadTableData(racers)
};


let form = document.querySelector('#dataForm')

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let query_season = document.querySelector('#season');
    let query_round = document.querySelector('#round');
    console.log(`This is the data I got from the User: ${query_season.value}, ${query_round.value}`)
    loadData(query_season.value, query_round.value)
})

function loadTableData(items) {
    const table = document.getElementById("table");
    let tableHeaderRowCount = 1;
    let rowCount = table.rows.length;
    for (let i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    let driverList = items.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 7)
    driverList.forEach( item => {
        let row = table.insertRow();
        let position = row.insertCell(0);
        position.innerHTML = item.position;
        let name = row.insertCell(1);
        name.innerHTML = `${item.Driver.givenName} ${item.Driver.familyName}`;
        let nationality = row.insertCell(2);
        nationality.innerHTML = item.Driver.nationality;
        let sponsor = row.insertCell(3);
        sponsor.innerHTML = item.Constructors[0].constructorId;
        let points = row.insertCell(4);
        points.innerHTML = item.points;
        
    });
  }
  