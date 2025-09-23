function getSalaRandom() {
  //Rangos de salas disponibles
  const rangos = [
    [100, 145],
    [200, 245],
    [300, 345],
    [400, 445],
    [500, 545],
    [600, 645]
  ];

  //Sala aleatoria
  const rango = rangos[Math.floor(Math.random() * rangos.length)];

  //Número aleatorio dentro del rango
  return Math.floor(Math.random() * (rango[1] - rango[0] + 1)) + rango[0];
}

function mostrarClase(nombre) {
  const sala = getSalaRandom();
  const horaInicio = Math.floor(Math.random() * 10) + 12; //entre 8:00 y 22:00
  const horaFin = horaInicio + 2; //siempre 2 horas después

  document.getElementById("detalle-info").innerHTML = `
    <h3>${nombre}</h3>
    <p>Sala N° ${sala}</p>
    <p>De ${horaInicio}:00 hrs a ${horaFin}:00 hrs</p>
  `;
}

//Funciones de botones
function marcarAsistencia() {
  alert("Asistencia marcada ✅");
}

function marcarSalida() {
  alert("Salida marcada 👋");
}
