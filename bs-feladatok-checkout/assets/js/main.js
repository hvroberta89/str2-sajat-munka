'use strict'

const selectedCountry = document.querySelector("#inputCountry");
const inputState = document.querySelector("#inputState");

async function getStates() {
  let url = "../db/state.json";
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function uploadStates(country) {
  let states = await getStates();
  const options = inputState.querySelectorAll("option");
  options.forEach(o => o.remove());
  states[country].forEach(state => {
    inputState.options[inputState.options.length] = new Option(state, state);
  });
};


selectedCountry.addEventListener("change", () => {
  const country = selectedCountry.value
  uploadStates(country);
});



