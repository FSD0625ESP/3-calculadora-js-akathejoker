// Funciones básicas del ejercicio
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function product(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}
function clear() {
  const pantalla = document.getElementById("valor-pantalla");
  pantalla.textContent = "0";
}

// getElements
const calculadora = document.getElementById("calculadora");
const pantalla = document.getElementById("valor-pantalla");
let operacion = "";

// ---- Sonido de click (sonido realista) ----
const sonidoClick = new Audio("/sonidos/mouse-click.mp3"); // ajusta la ruta si lo tienes en otra carpeta
sonidoClick.preload = "auto";

function reproducirClick() {
  try {
    // Reinicia para permitir clicks seguidos sin esperar a que termine
    sonidoClick.currentTime = 0;
    sonidoClick.play();
  } catch (e) {
    // Por si el navegador bloquea el sonido antes de una interacción
    // (a partir del primer click ya debería funcionar)
  }
}
// -------------------------------------------

// Mostrar en pantalla
function mostrar() {
  pantalla.textContent = operacion || "0";
}

// Calcular operacion
function calcular(expr) {
  let operador;
  if (expr.includes("+")) operador = "+";
  else if (expr.includes("-")) operador = "-";
  else if (expr.includes("*")) operador = "*";
  else if (expr.includes("/")) operador = "/";

  if (!operador) return null;

  const partes = expr.split(operador);
  if (partes.length !== 2) return null;

  const a = parseFloat(partes[0]);
  const b = parseFloat(partes[1]);

  if (isNaN(a) || isNaN(b)) return null;

  if (operador === "+") return add(a, b);
  if (operador === "-") return substract(a, b);
  if (operador === "*") return product(a, b);
  if (operador === "/") return b === 0 ? "Error" : division(a, b);
}

// Que funcione al hacer click
calculadora.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;

  // Reproducir sonido para cualquier botón de la calculadora
  reproducirClick();

  const tecla = boton.dataset.tecla;
  const accion = boton.dataset.accion;

  if (tecla) {
    operacion += tecla;
    mostrar();
  }

  if (accion === "limpiar") {
    operacion = "";
    clear();
  }

  if (accion === "borrar") {
    operacion = operacion.slice(0, -1);
    mostrar();
  }

  if (accion === "igual") {
    const resultado = calcular(operacion);
    if (resultado !== null) {
      operacion = String(resultado); // Resultado en pantalla
      mostrar();
    }
  }
});

// Mostrar 0 al abrir la app
mostrar();

//-------------OBSERVACIONES:--------------
/*
Me ha costado bastante el ejercicio y he tenido que apoyarme bastante en chatgpt para poder entender ciertas cosas.
No obstante, aún sin entender alguna que otra cosa, sobre todo lo del sonido al hacer click, he ido aprendiendo a medida que he practicado y solucionado problemas.

*/
