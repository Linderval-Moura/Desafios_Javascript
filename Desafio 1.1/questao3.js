/*
Usando a classe Vértice do exercício anterior, crie a classe Poligono,
que possui 3 ou mais vértices. Nessa classe implemente:
● Construtor para inicializar os vértices do polígono (pelo menos 3 vértices). Gere uma exceção
  caso o polígono não tenha ao menos 3 vértices.
● Método booleano addVertice para adicionar um novo vértice v ao polígono. Se o vértice já
  existe no polígono o método não deve adicioná-lo novamente e retornar falso.
● Método getter perimetro para retornar o perímetro do polígono.
● Método getter qtdVertices para retornar a quantidade de vértices do polígono. Em seguida, 
  leia valores do usuário para criar um polígono e chamar os métodos implementados na classe.  
*/
const prompt = require("prompt-sync")({ sigint: true });
const Vertice = require('./questao1');

class Poligono {
  constructor(...vertices) {
    if (vertices.length < 3) {
      throw new Error('O polígono deve ter pelo menos 3 vértices.');
    }

    this._vertices = [];

    for (const vertice of vertices) {
      if (!this._verticeExiste(vertice)) {
        this._vertices.push(vertice);
      }
    }
  }

  addVertice(vertice) {
    if (this._verticeExiste(vertice)) {
      return false;
    }

    this._vertices.push(vertice);
    return true;
  }

  get perimetro() {
    let perimetro = 0;

    for (let i = 0; i < this._vertices.length - 1; i++) {
      const verticeAtual = this._vertices[i];
      const proximoVertice = this._vertices[i + 1];
      perimetro += verticeAtual.distancia(proximoVertice);
    }

    // Adicionar a distância entre o último vértice e o primeiro vértice
    const ultimoVertice = this._vertices[this._vertices.length - 1];
    const primeiroVertice = this._vertices[0];
    perimetro += ultimoVertice.distancia(primeiroVertice);

    return perimetro;
  }

  get qtdVertices() {
    return this._vertices.length;
  }

  _verticeExiste(vertice) {
    for (const v of this._vertices) {
      if (v.equals(vertice)) {
        return true;
      }
    }
    return false;
  }
}

function criarPoligono() {
  const vertices = [];
  let continuarAdicionando = true;

  while (continuarAdicionando) {
    const x = parseFloat(prompt('Digite o valor de x do vértice: '));
    const y = parseFloat(prompt('Digite o valor de y do vértice: '));
    const vertice = new Vertice(x, y);

    vertices.push(vertice);

    const resposta = prompt('Deseja adicionar mais um vértice? (s/n): ');
    if (resposta.toLowerCase() !== 's') {
      continuarAdicionando = false;
    }
  }

  try {
    const poligono = new Poligono(...vertices);
    console.log('Polígono criado:');
    console.log('Perímetro:', poligono.perimetro);
    console.log('Quantidade de vértices:', poligono.qtdVertices);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

criarPoligono();
