// Lógica para calcular precios en función de las reglas del negocio
const PRICES = {
  july: 2100,
  august: 2200,
  other: 450,
  weekend: 900,
  weekend_3nights: 1350,
  christmas: 1500,
  new_year: 1500
};

const MAX_PEOPLE = 15;

function calculatePrice(checkIn, checkOut, numPeople) {
  if (numPeople > MAX_PEOPLE) {
    alert(`El máximo de personas permitido es ${MAX_PEOPLE}.`);
    return;
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

  if (nights < 1) {
    alert("Por favor selecciona fechas válidas.");
    return;
  }

  // Comprobar si las fechas están en julio o agosto
  const isJuly = checkInDate.getMonth() === 6 && nights >= 7;
  const isAugust = checkInDate.getMonth() === 7 && nights >= 7;

  let totalPrice = 0;

  if (isJuly) {
    totalPrice = PRICES.july;
  } else if (isAugust) {
    totalPrice = PRICES.august;
  } else {
    // Calcular para otros meses
    if (nights >= 2) {
      totalPrice = nights * PRICES.other;
    } else {
      alert("La estancia mínima fuera de julio y agosto es de 2 noches.");
      return;
    }

    // Calcular fines de semana (viernes a domingo)
    if (nights === 2) {
      totalPrice = PRICES.weekend;
    } else if (nights === 3) {
      totalPrice = PRICES.weekend_3nights;
    }

    // Navidades y Nochevieja
    if (isChristmas(checkInDate)) {
      totalPrice = PRICES.christmas;
    } else if (isNewYear(checkInDate)) {
      totalPrice = PRICES.new_year;
    }
  }

  showPricePopup(totalPrice);
}

// Mostrar ventana emergente con el precio y mensaje adicional
function showPricePopup(totalPrice) {
  const pricePopup = document.createElement('div');
  pricePopup.innerHTML = `
    <p>El precio total para tu reserva es de <strong>${totalPrice}€</strong>.</p>
    <p>Para consultar disponibilidad, contacte con nosotros mediante <a href="mailto:almimbral@gmail.com">email</a> o llámenos al <a href="tel:+34625108015">(+34) 625 108 015</a>.</p>
  `;
  pricePopup.style.position = 'fixed';
  pricePopup.style.top = '50%';
  pricePopup.style.left = '50%';
  pricePopup.style.transform = 'translate(-50%, -50%)';
  pricePopup.style.backgroundColor = 'white';
  pricePopup.style.color = 'black';
  pricePopup.style.padding = '20px';
  pricePopup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  pricePopup.style.borderRadius = '10px';
  pricePopup.style.textAlign = 'center';
  pricePopup.style.zIndex = '1001';

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Cerrar';
  closeButton.style.marginTop = '10px';
  closeButton.style.padding = '10px 20px';
  closeButton.style.backgroundColor = '#4CAF50';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(pricePopup);
  });

  pricePopup.appendChild(closeButton);
  document.body.appendChild(pricePopup);
}

// Determina si las fechas seleccionadas caen en Navidad
function isChristmas(date) {
  const month = date.getMonth();
  const day = date.getDate();
  return month === 11 && day >= 24 && day <= 26;
}

// Determina si las fechas seleccionadas caen en Nochevieja
function isNewYear(date) {
  const month = date.getMonth();
  const day = date.getDate();
  return (month === 11 && day === 31) || (month === 0 && day === 1);
}

// Evento para calcular el precio al hacer clic en "Disponibilidad y precios"
function checkAvailability() {
  const checkIn = document.getElementById("check-in-date").value;
  const checkOut = document.getElementById("check-out-date").value;
  const numPeople = parseInt(document.getElementById("num-people").value, 10);

  calculatePrice(checkIn, checkOut, numPeople);
}

// Funciones preexistentes
function viewPhoneNumber() {
  alert("El teléfono del cortijo es (+34) 625 108 015");
}

function toggleReservationForm() {
  const formSection = document.getElementById('reservation-form');
  const toggleButton = document.getElementById('toggle-form-button');

  // Alternar visibilidad del formulario
  formSection.classList.toggle('hidden');

  // Cambiar visibilidad del botón usando clases
  if (formSection.classList.contains('hidden')) {
    toggleButton.classList.remove('hidden'); // Mostrar botón
  } else {
    toggleButton.classList.add('hidden'); // Ocultar botón
    document.getElementById('check-in-date').focus(); // Enfocar el primer campo
  }
}

// Cerrar el formulario con "Escape"
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const formSection = document.getElementById('reservation-form');
    if (!formSection.classList.contains('hidden')) {
      toggleReservationForm();
    }
  }
})

function sendEmail() {
  const checkIn = document.getElementById("check-in-date").value;
  const checkOut = document.getElementById("check-out-date").value;
  const numPeople = document.getElementById("num-people").value;

  if (!checkIn || !checkOut || !numPeople) {
      alert("Por favor, completa todos los campos antes de enviar el mensaje.");
      return;
  }

  const subject = "Solicitud de reserva en Cortijo Almimbral";
  const body = `Hola, quiero hacer una reserva con los siguientes detalles:%0A%0A
  - Fecha de entrada: ${checkIn}%0A
  - Fecha de salida: ${checkOut}%0A
  - Número de personas: ${numPeople}%0A%0A
  Por favor, envíenme más información. Gracias.`;

  window.location.href = `mailto:almimbral@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}

;

