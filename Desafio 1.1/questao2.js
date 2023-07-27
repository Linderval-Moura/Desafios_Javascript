/*
Usando a classe Vertice do exercício anterior, 
crie a classe Triangulo, que possui 3 vértices (privados com leitura pública). 
Nessa classe implemente:
● Construtor para inicializar os vértices do triângulo. 
Gere uma exceção caso os vértices não formem um triângulo.
● Método equals para verificar se dois triângulos são iguais.
● Método getter perimetro para retornar o perímetro do triângulo.
● Método tipo para retornar o tipo do triângulo (equilátero, isósceles ou escaleno).
● Método clone para clonar um triângulo.
● Método getter area para retornar a área do triângulo. 
Para calcular a área do triângulo use: área = S . (S − a). (S − b). (S − c)
onde a, b e c são os lados do triângulo e S é o perímetro dividido por 2, ou seja S = (a+b+c)/2.

Em seguida, leia valores do usuário para criar 3 triângulos e 
chamar os métodos implementados na classe. 
 */
const prompt = require("prompt-sync")({ sigint: true });
const Vertice = require('./questao1');

class Triangulo {
  constructor(vertice1, vertice2, vertice3) {
    this._vertice1 = vertice1;
    this._vertice2 = vertice2;
    this._vertice3 = vertice3;
    
  }

  get vertice1() {
    return this._vertice1;
  }

  get vertice2() {
    return this._vertice2;
  }

  get vertice3() {
    return this._vertice3;
  }

  equals(outroTriangulo) {
    return (
      this._vertice1.equals(outroTriangulo.vertice1) &&
      this._vertice2.equals(outroTriangulo.vertice2) &&
      this._vertice3.equals(outroTriangulo.vertice3)
    );
  }

  get perimetro() {
    const lado1 = this._vertice1.distancia(this._vertice2);
    const lado2 = this._vertice2.distancia(this._vertice3);
    const lado3 = this._vertice3.distancia(this._vertice1);
    return lado1 + lado2 + lado3;
  }

  get tipo() {
    const lado1 = this._vertice1.distancia(this._vertice2);
    const lado2 = this._vertice2.distancia(this._vertice3);
    const lado3 = this._vertice3.distancia(this._vertice1);

    if (lado1 === lado2 && lado2 === lado3) {
      return 'Equilátero';
    } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
      return 'Isósceles';
    } else {
      return 'Escaleno';
    }
  }

  clone() {
    const vertice1 = new Vertice(this._vertice1.x, this._vertice1.y);
    const vertice2 = new Vertice(this._vertice2.x, this._vertice2.y);
    const vertice3 = new Vertice(this._vertice3.x, this._vertice3.y);
    return new Triangulo(vertice1, vertice2, vertice3);
  }

  get area() {
    const lado1 = this._vertice1.distancia(this._vertice2);
    const lado2 = this._vertice2.distancia(this._vertice3);
    const lado3 = this._vertice3.distancia(this._vertice1);
    const semiperimetro = this.perimetro / 2;
    return Math.sqrt(
      semiperimetro * (semiperimetro - lado1) * (semiperimetro - lado2) * (semiperimetro - lado3)
    );
  }

  _formamTriangulo(vertice1, vertice2, vertice3) {
    const lado1 = vertice1.distancia(vertice2);
    const lado2 = vertice2.distancia(vertice3);
    const lado3 = vertice3.distancia(vertice1);
    return lado1 + lado2 > lado3 && lado2 + lado3 > lado1 && lado3 + lado1 > lado2;
  }
}

function criarTriangulo() {
  const x1 = parseFloat(prompt('Digite o valor de x do vértice 1: '));
  const y1 = parseFloat(prompt('Digite o valor de y do vértice 1: '));
  const x2 = parseFloat(prompt('Digite o valor de x do vértice 2: '));
  const y2 = parseFloat(prompt('Digite o valor de y do vértice 2: '));
  const x3 = parseFloat(prompt('Digite o valor de x do vértice 3: '));
  const y3 = parseFloat(prompt('Digite o valor de y do vértice 3: '));

  const vertice1 = new Vertice(x1, y1);
  const vertice2 = new Vertice(x2, y2);
  const vertice3 = new Vertice(x3, y3);

  try {
    const triangulo = new Triangulo(vertice1, vertice2, vertice3);
    console.log('Triângulo criado:');
    console.log('Vértice 1:', triangulo.vertice1);
    console.log('Vértice 2:', triangulo.vertice2);
    console.log('Vértice 3:', triangulo.vertice3);
    console.log('Perímetro:', triangulo.perimetro);
    console.log('Tipo:', triangulo.tipo);
    console.log('Área:', triangulo.area);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

criarTriangulo();

module.exports = Triangulo;