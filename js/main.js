let myJson = new XMLHttpRequest();

let jsonData = [];
myJson.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    jsonData = JSON.parse(this.responseText);
    showData(jsonData);
  }
};
myJson.open("GET", "../test.json");
myJson.send();

//  crit tbody in table
const showData = (arr) => {
  document.querySelector("tbody").innerHTML = "";
  let Festivalss = "";
  let Acteurss = ""

  for (let i = 0; i < arr.length; i++) {
    Festivalss = "";
    Acteurss = "";

    for (let j = 0; j < arr[i].Festivals.length; j++) {
      Festivalss += `<li>${arr[i].Festivals[j]}</li></br>`;
    }
    for (let k = 0; k < arr[i].Acteurs.length; k++) {
      Acteurss += `<li>
          ${arr[i].Acteurs[k].name}
          ${arr[i].Acteurs[k].prenom}
          ${arr[i].Acteurs[k].nationality}
          </li><br>`;
    }
    document.querySelector("tbody").innerHTML += `
    <tr>
        <td>${arr[i].titre}</td>
        <td>${arr[i].réalisateur}</td>
        <td>${arr[i].durée} min</td>
        <td>${arr[i].production}</td>
        <td>
        <img src="${arr[i].Poster}" alt="image" width=100 >
        </td>
        <td>
        <ul>${Festivalss}<br></ul>
        </td>
        <td>
        <ul>${Acteurss}</ul>
        </td>
    </tr>
`;
  }
};


//  serch
let SearchInput = document.getElementById("SearchInput")
let searchResult = [];
SearchInput.oninput = function () {
  searchResult.length = 0;
  jsonData.forEach((index) => {
    if (index.titre.toLowerCase().startsWith(SearchInput.value.toLowerCase())) {
      searchResult.push(index);
    }
    
    showData(searchResult);
  });
};

console.log(searchResult)

//  sort 
document.querySelectorAll("i").forEach((ele) => {
  ele.onclick = function () {
    let title = ele.getAttribute("data-title");
    let order = ele.getAttribute("data-order");

    if (order === "up") {
      arr = jsonData.sort((a, b) =>
        a[title] > b[title] ? -1 : b[title] > a[title] ? 1 : 0
      );
      showData(arr);
    } else if (order === "down") {
      arr = jsonData.sort((a, b) =>
        a[title] > b[title] ? 1 : b[title] > a[title] ? -1 : 0
      );
      showData(arr);
    }
  };
});




      SearchInput.focus()
