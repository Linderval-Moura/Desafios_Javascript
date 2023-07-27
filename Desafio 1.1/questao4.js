/*
Crie uma classe Turma que possui uma lista de Alunos. Cada aluno tem
matrícula e nome (obrigatórios) e duas notas (P1 e P2) que inicialmente estão sem valor. Durante
o semestre os alunos devem realizar essas provas, mas podem faltar a uma delas ou às duas.
Crie métodos para:
● Inserir um aluno na turma. Não podem ser inseridos dois alunos com a mesma matrícula.
● Remover um aluno da turma a partir da sua matrícula.
● Lançar a nota (seja ela P1 ou P2) de um aluno.
● Imprimir os alunos da turma em ordem alfabética de acordo com o layout a seguir. A nota final
é calculada como: (a) NF = (P1 + P2) / 2, para quem compareceu às duas provas; (b) NF = P1
/ 2 ou NF = P2 / 2, para quem faltou a uma das provas, e; (c) NF = 0, para quem faltou às
duas provas. Use uma casa decimal para as notas.

—---------------------------------------
Matricula Nome          P1  P2   NF
—---------------------------------------
12345   Ana de Almeida  8.0 9.5  8.8
23456   Bruno Carvalho  7.0 -    3.5
34567   Fernanda Abreu  -   8.5  4.3
45678   Joao Santos     -   -    0.0
—---------------------------------------

Em seguida, leia dados dos alunos e suas notas e imprima a lista de alunos. */

const prompt = require("prompt-sync")({ sigint: true });

class Aluno {
  constructor(matricula, nome) {
    this.matricula = matricula;
    this.nome = nome;
    this.p1 = undefined;
    this.p2 = undefined;
  }
}

class Turma {
  constructor() {
    this.alunos = [];
  }

  inserirAluno(matricula, nome) {
    if (this.alunos.some(aluno => aluno.matricula === matricula)) {
      console.log("Já existe um aluno com essa matrícula.");
      return;
    }

    const aluno = new Aluno(matricula, nome);
    this.alunos.push(aluno);
  }

  removerAluno(matricula) {
    const index = this.alunos.findIndex(aluno => aluno.matricula === matricula);

    if (index === -1) {
      console.log("Não foi encontrado um aluno com essa matrícula.");
      return;
    }

    this.alunos.splice(index, 1);
  }

  lancarNota(matricula, prova, nota) {
    const aluno = this.alunos.find(aluno => aluno.matricula === matricula);

    if (!aluno) {
      console.log("Não foi encontrado um aluno com essa matrícula.");
      return;
    }

    if (prova === "P1") {
      aluno.p1 = nota;
    } else if (prova === "P2") {
      aluno.p2 = nota;
    } else {
      console.log("Prova inválida. Informe 'P1' ou 'P2'.");
      return;
    }
  }

  imprimirAlunos() {
    console.log("----------------------------------------");
    console.log("Matricula Nome            P1   P2   NF");
    console.log("----------------------------------------");

    this.alunos.sort((a, b) => a.nome.localeCompare(b.nome));

    this.alunos.forEach(aluno => {
      const p1 = aluno.p1 !== undefined ? aluno.p1.toFixed(1) : "-";
      const p2 = aluno.p2 !== undefined ? aluno.p2.toFixed(1) : "-";
      let nf = 0;

      if (aluno.p1 !== undefined && aluno.p2 !== undefined) {
        nf = (aluno.p1 + aluno.p2) / 2;
      } else if (aluno.p1 !== undefined) {
        nf = aluno.p1 / 2;
      } else if (aluno.p2 !== undefined) {
        nf = aluno.p2 / 2;
      }

      console.log(
        `${aluno.matricula.toString().padEnd(8)} ${aluno.nome.padEnd(15)} ${p1.toString().padStart(4)} ${p2.toString().padStart(4)} ${nf.toFixed(1).toString().padStart(4)}`
      );
    });

    console.log("----------------------------------------");
  }
}

// Função para criar uma instância da classe Turma a partir dos dados lidos do terminal
function criarTurma(alunosData) {
  const turma = new Turma();

  alunosData.forEach(alunoData => {
    const { matricula, nome, p1, p2 } = alunoData;
    turma.inserirAluno(matricula, nome);
    if (p1 !== undefined) {
      turma.lancarNota(matricula, "P1", p1);
    }
    if (p2 !== undefined) {
      turma.lancarNota(matricula, "P2", p2);
    }
  });

  return turma;
}

// Função que ler dados e notas dos alunos
function lerDadosAlunos() {
    const alunosData = [];
  
    function lerDadosAluno() {
      const matricula = prompt("Digite a matrícula do aluno (ou 'sair' para encerrar): ");
      if (matricula.toLowerCase() === "sair") {
        const turma = criarTurma(alunosData);
        turma.imprimirAlunos();
        return;
      }
  
      const nome = prompt("Digite o nome do aluno: ");
      const p1 = prompt("Digite a nota da P1 (ou deixe em branco para não lançar a nota): ");
      const p2 = prompt("Digite a nota da P2 (ou deixe em branco para não lançar a nota): ");
  
      alunosData.push({
        matricula: parseInt(matricula),
        nome,
        p1: p1 !== "" ? parseFloat(p1) : undefined,
        p2: p2 !== "" ? parseFloat(p2) : undefined,
      });
  
      lerDadosAluno();
    }
  
    lerDadosAluno();
}
// Leitura dos dados
lerDadosAlunos();
