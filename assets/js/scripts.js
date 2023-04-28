// Declaração das constantes
const inputs = document.querySelectorAll("input");
const wrapper = document.querySelector("#wrapper");
const object = document.querySelector("#object");
const controller = document.querySelector("#controller");
const displayShadow = document.querySelector("#displayShadow");
const webkitDisplayShadow = document.querySelector("#webkitDisplayShadow");

const shadow = {
  xDirection: 8,
  yDirection: 8,
  blur: 10,
  spread: 10,
  opacity: 0.75,
  shadowColor: "#000000",
  backgroundColor: "#4b48ea",
  inset: false,
  checkBackground: true,
};

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    shadowGenerator(input.id, input.type, input.value, input.checked);
  });
});

shadowGenerator();

function shadowGenerator(id, type, value, checked) {
  // Sincroniza todas as entradas (ranges e numbers)
  syncInputs(id, type, value);

  shadow[id] = value;
  // Checa se o checkbox está marcado ou não
  if (type === "checkbox") {
    shadow[id] = checked;
  }

  // Pega as cores
  const shadowColorRGBA = hexToRGBA(shadow.shadowColor, shadow.opacity);
  const backgroundColorRGBA = hexToRGBA(shadow.backgroundColor);

  // Molde para sombra
  const shadowNormal = `${shadow.xDirection}px ${shadow.yDirection}px ${
    shadow.blur
  }px ${
    shadow.spread
  }px ${shadowColorRGBA}, ${-shadow.xDirection}px ${-shadow.yDirection}px ${
    shadow.blur
  }px ${shadow.spread}px rgba(255, 255, 255, ${shadow.opacity - 0.15})`;

  const shadowInset = `inset ${shadow.xDirection}px ${shadow.yDirection}px ${
    shadow.blur
  }px ${
    shadow.spread
  }px ${shadowColorRGBA}, inset ${-shadow.xDirection}px ${-shadow.yDirection}px ${
    shadow.blur
  }px ${shadow.spread}px rgba(255, 255, 255, ${shadow.opacity - 0.15})`;

  // Verificando qual propriedade do opacity
  const shadowPropety = shadow.inset ? shadowInset : shadowNormal;

  // Adicionando cores e sombra nas caixas
  object.style.backgroundColor = shadow.backgroundColor;
  object.style.boxShadow = shadowPropety;
  controller.style.boxShadow = shadowPropety;

  if (shadow.checkBackground) {
    wrapper.style.backgroundColor = backgroundColorRGBA;
  } else {
    wrapper.style.backgroundColor = "#ffffff";
  }

  // Atualiza o mostrador
  displayShadow.innerHTML = `: ${shadowPropety} ; `;
  webkitDisplayShadow.innerHTML = `: ${shadowPropety} ;`;
}

// Verifica cor e opacidade do quadrado e background
function hexToRGBA(color, opacity) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const rgba = opacity
    ? `rgba(${r}, ${g}, ${b}, ${opacity})`
    : `rgba(${r}, ${g}, ${b}, 0.9)`;

  return rgba;
}

function syncInputs(id, type, value) {
  if (type === "range") {
    document.querySelector(`#${id}Num`).value = value;
    shadow[id] = value;
  }
  if (type === "number") {
    const idName = id.slice(0, -3);
    document.querySelector(`#${idName}`).value = value;
    shadow[idName] = value;
  }
  if (type === "text") {
    const idName = id.slice(0, -3);
    document.querySelector(`#${idName}`).value = value;
    shadow[idName] = value;
  }
  if (type === "color") {
    document.querySelector(`#${id}Num`).value = value;
    shadow[id] = value;
  }
}
