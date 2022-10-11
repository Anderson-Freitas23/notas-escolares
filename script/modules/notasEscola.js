export default class NotasEscola {
  constructor(notas, btnCalc) {
    this.notas = document.querySelectorAll(notas);
    this.btnCalc = document.querySelector(btnCalc);
    this.previnirPadrao = this.previnirPadrao.bind(this);
  }
  insertAfter(newElement, reference) {
    reference.parentNode.insertBefore(newElement, reference.nextSibling);
  }
  createElementFunction() {
    const divInfo = document.createElement("div");
    this.insertAfter(divInfo, this.btnCalc);

    const fraseMedia = document.createElement("p");
    fraseMedia.innerText = "Sua nota final é: ";
    fraseMedia.classList.add("frase-media");
    divInfo.appendChild(fraseMedia);

    const notaFinal = document.createElement("span");
    notaFinal.classList.add("media");
    this.insertAfter(notaFinal, fraseMedia);

    const aprovado = document.createElement("p");
    aprovado.classList.add("aprovado");
    this.insertAfter(aprovado, notaFinal);

    this.fraseMedia = fraseMedia;
    this.aprovado = aprovado;
    this.notaFinal = notaFinal;
  }

  resetarNotas() {
    this.notas.forEach((nota) => {
      nota.innerText = "";
      nota.value = null;
    });
  }

  aprovadoOuNao(m) {
    if (m >= 6) {
      this.aprovado.innerText = "APROVADO";
      const corAprovada = "#391";
      this.aprovado.style.color = corAprovada;
      this.notaFinal.style.backgroundColor = corAprovada;
      this.fraseMedia.style.border = `${corAprovada} 2px solid`;
      this.fraseMedia.style.color = corAprovada;
    } else {
      this.aprovado.innerText = "REPROVADO";
      const corReprovada = "#d11";
      this.aprovado.style.color = corReprovada;
      this.notaFinal.style.backgroundColor = corReprovada;
      this.fraseMedia.style.border = `${corReprovada} 2px solid`;
      this.fraseMedia.style.color = corReprovada;
    }
    this.resetarNotas();
  }
  calcMedia(valorNotas) {
    const mediaFinal = valorNotas.reduce((antiga, atual) => {
      return +antiga + +atual;
    });
    this.notaFinal.innerText = Math.round(mediaFinal / 4);
    this.aprovadoOuNao(Math.round(mediaFinal / 4));
  }
  validarNota() {
    const valorNotas = [...this.notas].map((nota) => {
      return nota.value;
    });

    const existValue = valorNotas.every((nota) => {
      return nota;
    });

    const trueValue = valorNotas.every((nota) => {
      if (+nota >= 0 && +nota <= 10) {
        return +nota;
      }
    });

    if (trueValue === true && existValue === true) {
      this.calcMedia(valorNotas);
    }
  }
  previnirPadrao(event) {
    event.preventDefault();
    this.validarNota();
  }
  notasTip() {
    this.notas.forEach((nota) => {
      const notaErrada = document.createElement("span");
      notaErrada.innerText = "Digite uma nota válida de 0 a 10";
      notaErrada.style.color = "#012";

      this.insertAfter(notaErrada, nota);
      notaErrada.style.display = "none";

      nota.addEventListener("change", () => {
        if (nota.value < 0 || nota.value > 10) {
          notaErrada.style.display = "block";
        } else {
          notaErrada.style.display = "none";
        }
      });
    });
  }
  init() {
    if (this.notas.length && this.btnCalc) {
      this.createElementFunction();
      this.btnCalc.addEventListener("click", this.previnirPadrao);
      // btnReset.addEventListener("click", resetarNotas);
      this.notasTip();
    }
  }
}
