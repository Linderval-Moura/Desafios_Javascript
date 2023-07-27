/*
Crie a classe Vertice e implemente nessa classe:

● Atributos numéricos x e y privados com leitura pública.
● Construtor para inicializar os valores de x e y.
● Método getter distancia para calcular a distância euclidiana
 de um vértice a outro.
● Método move para mover o vértice para outra posição (x, y).
● Método equals para verificar se dois vértices são iguais.

Em seguida, leia valores do usuário para criar 3 vértices e 
chamar os métodos implementados na classe. */
const prompt = require("prompt-sync")({ sigint: true });

class Vertice {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  distancia(outroVertice) {
    const dx = outroVertice.x - this._x;
    const dy = outroVertice.y - this._y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  move(x, y) {
    this._x = x;
    this._y = y;
  }

  equals(outroVertice) {
    return this._x === outroVertice.x && this._y === outroVertice.y;
  }
}

function criarVertices() {
  const vertices = [];

  function lerDadosVertice(i) {
    const x = parseFloat(prompt(`Digite a coordenada x do vértice ${i + 1}: `));
    const y = parseFloat(prompt(`Digite a coordenada y do vértice ${i + 1}: `));
    const vertice = new Vertice(x, y);
    vertices.push(vertice);

    if (i < 2) {
      lerDadosVertice(i + 1);
    } else {
      chamarMetodos(vertices);
    }
  }

  lerDadosVertice(0);
}

function chamarMetodos(vertices) {
  const [v1, v2, v3] = vertices;

  console.log("Vertices criados:");
  console.log("Vertice 1:", v1.x, v1.y);
  console.log("Vertice 2:", v2.x, v2.y);
  console.log("Vertice 3:", v3.x, v3.y);
  console.log();

  const distanciaV1V2 = v1.distancia(v2);
  const distanciaV1V3 = v1.distancia(v3);
  const distanciaV2V3 = v2.distancia(v3);

  console.log("Distância entre V1 e V2:", distanciaV1V2.toFixed(2));
  console.log("Distância entre V1 e V3:", distanciaV1V3.toFixed(2));
  console.log("Distância entre V2 e V3:", distanciaV2V3.toFixed(2));
  console.log();

  console.log("Movendo V1 para (10, 10)...");
  v1.move(10, 10);
  console.log("Novas coordenadas de V1:", v1.x, v1.y);
  console.log();

  console.log("V1 é igual a V2?", v1.equals(v2));
  console.log("V2 é igual a V3?", v2.equals(v3));
}

criarVertices();

module.exports = Vertice;