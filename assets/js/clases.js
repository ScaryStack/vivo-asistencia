function mostrarDetalle(clase) {
  const detalle = document.getElementById("detalle-info");
  detalle.innerHTML = `
    <p><strong>${clase}</strong></p>
    <p>Sala Nº ${(Math.floor(Math.random() * 100) + 1)}</p>
    <p>De ${Math.floor(Math.random() * 12 + 8)}:00 hrs a ${Math.floor(Math.random() * 12 + 9)}:00 hrs</p>
  `;
}

function marcarAsistencia() {
    alert("Asistencia marcada ✅");
}

function marcarSalida() {
    alert("Salida marcada 👋");
}