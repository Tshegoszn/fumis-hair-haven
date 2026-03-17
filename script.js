/* =========================
   1. ELEMENTS
========================= */
const serviceSelect = document.getElementById("service");
const customOptions = document.getElementById("customOptions");
const emergencyOption = document.getElementById("emergencyOption");
const emergencyCheckbox = document.getElementById("emergency");
const totalPriceEl = document.getElementById("totalPrice");
const bookingForm = document.getElementById("bookingForm");

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");


/* =========================
   2. STATE
========================= */
let total = 0;


/* =========================
   3. PRICING
========================= */
const prices = {
  installation: 220,
  installStyle: 280,
  laundry: 110,
  bleaching: 120,
  plucking: 100,
  combo: 200,
  emergency: 50
};


/* =========================
   4. HELPERS
========================= */
function updateTotal() {
  totalPriceEl.textContent = `Total: R${total}`;
}

function resetOptions() {
  customOptions.style.display = "none";
  emergencyOption.style.display = "none";
  emergencyCheckbox.checked = false;
}


/* =========================
   5. SERVICE SELECTION
========================= */
serviceSelect.addEventListener("change", () => {
  total = 0;
  resetOptions();

  switch (serviceSelect.value) {
    case "installation":
      total = prices.installation;
      emergencyOption.style.display = "block";
      break;

    case "install-style":
      total = prices.installStyle;
      break;

    case "laundry":
      total = prices.laundry;
      break;

    case "customisation":
      customOptions.style.display = "block";
      break;
  }

  updateTotal();
});


/* =========================
   6. CUSTOMISATION OPTIONS
========================= */
document.querySelectorAll("input[name='customType']").forEach(option => {
  option.addEventListener("change", () => {
    total = prices[option.value];
    updateTotal();
  });
});


/* =========================
   7. EMERGENCY OPTION
========================= */
emergencyCheckbox.addEventListener("change", () => {
  total += emergencyCheckbox.checked ? prices.emergency : -prices.emergency;
  updateTotal();
});


/* =========================
   8. FORM SUBMIT (WHATSAPP)
========================= */
bookingForm.addEventListener("submit", (e) => {
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


/* =========================
   9. MOBILE MENU
========================= */
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


/* =========================
   10. SCROLL ANIMATION (CARDS)
========================= */
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {

      // stagger effect
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 150);

    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => observer.observe(card));
