document.addEventListener("DOMContentLoaded", () => {
  // --- LOGIN ---
  const btnIngresar = document.getElementById("btn-ingresar");

  if (btnIngresar) {
    btnIngresar.addEventListener("click", () => {
      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
      const mensaje = document.getElementById("mensaje");
      const dominio1 = "prueba1@duocuc.cl";
      const dominio2 = "prueba2@profesor.duocuc.cl";
      const dominio3 = "prueba3@gmail.com";
      const contrasenaValida = "12345";

      // Validar correo
      if (!correo.endsWith(dominio1) && !correo.endsWith(dominio2) && !correo.endsWith(dominio3)) {
        mensaje.textContent = "Dirección de correo no válida";
        mensaje.style.color = "red";
        return;
      }

      // Validar contraseña
      if (contrasena !== contrasenaValida) {
        mensaje.textContent = "Contraseña incorrecta";
        mensaje.style.color = "red";
        return;
      }

      // Si ambas validaciones son correctas
      mensaje.textContent = "Acceso permitido";
      mensaje.style.color = "lightgreen";

      // Guardar correo en localStorage
      localStorage.setItem("usuarioCorreo", correo);

      // Redirigir al home
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }

  // --- MOSTRAR CORREO EN HOME ---
  const usuarioLogueado = document.getElementById("usuario-logueado");
  const correoGuardado = localStorage.getItem("usuarioCorreo");
  
  if (correoGuardado && usuarioLogueado) {
    // Solo actualizar el elemento de usuario logueado (esquina superior derecha)
    usuarioLogueado.textContent = correoGuardado;
    
    // Cambiar el enlace "Iniciar Sesión" por "Cerrar Sesión"
    const accesoSection = document.querySelector(".acceso");
    if (accesoSection) {
      accesoSection.innerHTML = `
        <a href="#" class="btn-acceso" id="cerrar-sesion">Cerrar Sesión</a>
      `;
      
      // Agregar funcionalidad al botón de cerrar sesión
      document.getElementById("cerrar-sesion").addEventListener("click", () => {
        localStorage.removeItem("usuarioCorreo");
        window.location.reload();
      });
    }
  }
});