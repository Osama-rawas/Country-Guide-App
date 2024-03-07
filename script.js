const searchBtn = document.querySelector("#search-btn");
const countryInput = document.querySelector("#country-value");
const result = document.querySelector(".result");
searchBtn.onclick = () => {
  let countryName = countryInput.value;
  getCountry(countryName);
};

async function getCountry(countryName) {
  if (countryName.length == 0) {
    result.innerHTML = `<h3>The input field cannot be empty</h3>`;
    document.getElementById("country-value").focus();
  } else {
    try {
      const resp = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      const respData = await resp.json();
      addCountry(respData);
    } catch (r) {
      result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
    }
  }
}

function addCountry(countryData) {
  result.innerHTML = ` <img src="${
    countryData[0].flags.svg
  }" alt="flag" class="flag-img" />
  <h2>${countryData[0].name.common}</h2>
  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Official Name:</h4>
    <span>${countryData[0].name.official}</span>
  </div>
</div>
  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Capital:</h4>
    <span>${countryData[0].capital[0]}</span>
  </div>
</div>

  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Continents:</h4>
    <span>${countryData[0].continents[0]}</span>
  </div>
</div>
  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Population:</h4>
    <span>${countryData[0].population}</span>
  </div>
</div>
  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Currency:</h4>
    <span>${Object.values(countryData[0].currencies)[0].symbol}</span>  
    <span>${Object.values(countryData[0].currencies)[0].name}</span>
    
  </div>
</div>
  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Common Languages:</h4>
    <span>${Object.values(countryData[0].languages).join(", ")}</span>
  </div>
</div>
  <div class="wrapper">
  <div class="data-wrapper">
    <h4>Borders</h4>
    <span>${countryData[0].borders.join(", ")}</span>
  </div>
</div>

<div class="wrapper">
<div class="data-wrapper">
  <h4>Common Names:</h4>
  <span>${countryData[0].altSpellings.join(", ")}</span>
</div>
</div>
  `;
}
