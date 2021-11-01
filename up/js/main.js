const bill = document.querySelector(
  ".container__left--amountInput__input input"
);
const numberOfPeople = document.querySelector(
  ".container__left--nop__input input"
);
const tipPercentages = document.querySelectorAll(
  ".container__left--tipPercentage__choices button"
);
const customTip = document.querySelector(
  ".container__left--tipPercentage__choices input"
);
const tip = document.querySelector(".tip");
const total = document.querySelector(".total");
const invalid = document.querySelector(
  ".container__left--nop__labels p:nth-child(2"
);
const reset = document.querySelector(".reset");

// EVENT LISTENERS

tipPercentages.forEach(function (entry) {
  entry.addEventListener("click", function (e) {
    tipPercentages.forEach((e) => {
      e.classList.remove("selected");
    });

    customTip.value = "";
    this.classList.add("selected");
    calculateTotal(parseInt(this.value));
  });
});

bill.addEventListener("input", function (e) {
  inputManager();
});

customTip.addEventListener("input", function (e) {
  if (parseInt(customTip.value < 0) || customTip.value === "") return;

  tipPercentages.forEach((e) => {
    e.classList.remove("selected");
  });
  calculateTotal(parseInt(customTip.value));
});

numberOfPeople.addEventListener("input", function () {
  if (this.value === "0") {
    this.classList.add("invalid");
    invalid.classList.add("invalid");
  } else {
    this.classList.remove("invalid");
    invalid.classList.remove("invalid");

    inputManager();
  }
});

reset.addEventListener("click", function () {
  bill.value = "";
  numberOfPeople.value = "";
  tip.textContent = "$0.00";
  total.textContent = "$0.00";

  tipPercentages.forEach((e) => {
    e.classList.remove("selected");
  });
});

// Functions

function calculateTotal(percentage) {
  if (
    bill.value === "" ||
    numberOfPeople.value === "" ||
    numberOfPeople.value === "0"
  ) {
    return;
  }

  let overallBill, nop, amountPerPerson;
  overallBill = parseFloat(bill.value);
  nop = parseInt(numberOfPeople.value);
  amountPerPerson = overallBill / nop;

  let tipPerPerson = (percentage / 100) * amountPerPerson;
  // let totalTip = currentTip * parseInt(numberOfPeople.value);
  let totalPerPerson = amountPerPerson + tipPerPerson;

  tip.textContent = `$${tipPerPerson.toFixed(2)}`;
  total.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function inputManager() {
  selectedPercentage = document.querySelector(".selected") || customTip;
  calculateTotal(parseInt(selectedPercentage.value));
}
