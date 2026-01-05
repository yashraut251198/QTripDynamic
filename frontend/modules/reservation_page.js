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

  if (reservations.length) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
    return;
  }

  const table = document.getElementById("reservation-table");
  table.innerHTML = ""; 

  reservations.forEach((reservation) => {

    const bookingDate = new Date(reservation.date).toLocaleDateString("en-IN");

    const bookingTime =
      new Date(reservation.time).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      ", " +
      new Date(reservation.time).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${bookingDate}</td>
      <td>${reservation.price}</td>
      <td>${bookingTime}</td>
      <td>
       <div id="${reservation.id}">
        <a
        class="reservation-visit-button"
        href="../detail/?adventure=${reservation.adventure}"
        >
         Visit Adventure
        </a>
      </div>
     </td>

    `;

    table.appendChild(row);
  });
}


export { fetchReservations, addReservationToTable };
