import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint + '/reservations')
    const data = await res.json()
    return data;
  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
    return;
  }

  document.getElementById("no-reservation-banner").style.display = "none";
  document.getElementById("reservation-table-parent").style.display = "block";

  const table = document.getElementById("reservation-table");

  reservations.forEach(reservation => {
    const row = document.createElement("tr");

    const bookingDate = new Date(reservation.date).toLocaleDateString("en-IN");

    const bookingDateVerbose = new Date(reservation.time).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const bookingTimeOnly = new Date(reservation.time).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });

    const bookingTime = `${bookingDateVerbose} , ${bookingTimeOnly}`;


    row.innerHTML = `
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${bookingDate}</td>
      <td>${reservation.price}</td>
      <td>${bookingTime}</td>
      <td>
        <div class="reservation-visit-button" id="${reservation.id}"><a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a></div>
      </td>
    `;

    table.appendChild(row);
  });
}


export { fetchReservations, addReservationToTable };
