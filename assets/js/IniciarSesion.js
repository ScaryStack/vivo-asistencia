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

      // Redirigir según dominio
      setTimeout(() => {
        if (correo.endsWith(dominio1) || correo.endsWith(dominio3)) {
          window.location.href = "index.html"; // Página para alumnos
        } else if (correo.endsWith(dominio2)) {
          window.location.href = "index.html"; // Página para profesor
        }
      }, 1000);
    });
  }

  // --- MOSTRAR CORREO Y GESTIONAR SESIÓN ---
  const usuarioLogueado = document.getElementById("usuario-logueado");
  const cerrarSesionBtn = document.getElementById("cerrar-sesion");
  const correoGuardado = localStorage.getItem("usuarioCorreo");

  if (correoGuardado && usuarioLogueado) {
    usuarioLogueado.textContent = correoGuardado;

    if (cerrarSesionBtn) {
      cerrarSesionBtn.style.display = "inline-block";
      cerrarSesionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioCorreo");
        window.location.href = "ingresar.html";
      });
    }

    // --- Ajustar enlace del menú según dominio ---
    const enlacesNav = document.querySelectorAll("nav ul li a");
    enlacesNav.forEach((enlace) => {
      if (enlace.textContent.includes("Perfil")) {
        if (correoGuardado.endsWith("prueba1@duocuc.cl") || correoGuardado.endsWith("prueba3@gmail.com")) {
          enlace.setAttribute("href", "perfil.html");
          enlace.textContent = "Perfil";
        } else if (correoGuardado.endsWith("prueba2@profesor.duocuc.cl")) {
          enlace.setAttribute("href", "perfil_profesor.html");
          enlace.textContent = "Perfil Profesor";
        }
      }
    });
  }
});
