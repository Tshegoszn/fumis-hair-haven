const serviceSelect = document.getElementById("service");
const customOptions = document.getElementById("customOptions");
const emergencyOption = document.getElementById("emergencyOption");
const totalPriceEl = document.getElementById("totalPrice");

let total = 0;

// PRICING
const prices = {
  installation: 220,
  installStyle: 280,
  laundry: 110,
  bleaching: 120,
  plucking: 100,
  combo: 200,
  emergency: 50
};

// SERVICE CHANGE
serviceSelect.addEventListener("change", () => {
  total = 0;

  // Reset & hide conditional options
  customOptions.style.display = "none";
  emergencyOption.style.display = "none";
  document.getElementById("emergency").checked = false;

  if (serviceSelect.value === "installation") {
    total = prices.installation;
    emergencyOption.style.display = "block";
  }

  if (serviceSelect.value === "install-style") {
    total = prices.installStyle;
  }

  if (serviceSelect.value === "laundry") {
    total = prices.laundry;
  }

  if (serviceSelect.value === "customisation") {
    customOptions.style.display = "block";
    total = 0;
  }

  updateTotal();
});


// CUSTOMISATION OPTIONS
document.querySelectorAll("input[name='customType']").forEach(option => {
  option.addEventListener("change", () => {
    if (option.value === "bleaching") total = prices.bleaching;
    if (option.value === "plucking") total = prices.plucking;
    if (option.value === "combo") total = prices.combo;
    updateTotal();
  });
});

// EMERGENCY CHECK
document.getElementById("emergency").addEventListener("change", function () {
  if (this.checked) {
    total += prices.emergency;
  } else {
    total -= prices.emergency;
  }
  updateTotal();
});

function updateTotal() {
  totalPriceEl.textContent = `Total: R${total}`;
}

// SUBMIT
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("clientName").value;
  const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const whatsappNumber = "27792761800";

  const message = `
Hi Fumi’s Hair Haven 🌸

My name is ${name}.
Service: ${serviceText}
Date: ${date}
Time: ${time}

Total amount: R${total}

I understand a 50% deposit is required to secure my booking.
  `;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

