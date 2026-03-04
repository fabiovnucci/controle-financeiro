// ===============================================
// Controle Financeiro - JS Básico com alerta
// ===============================================

// Criamos uma lista (array) para armazenar todas as transações
// Cada elemento será um objeto { valor, tipo }
let transacoes = []

// Função chamada quando o usuário clica no botão "Adicionar"
function adicionarTransacao() {
  // Pegamos o input de valor digitado pelo usuário
  const valorInput = document.getElementById("valor")
  // Pegamos o tipo de transação ("ganho" ou "gasto") do select
  const tipo = document.getElementById("tipo").value
  // Transformamos o valor digitado em número
  const valor = Number(valorInput.value)

  // -----------------------------------------------
  // Validação de entrada com lembrete para o usuário
  // -----------------------------------------------
  // Se o valor não for número ou for menor ou igual a 0
  if (valor <= 0 || isNaN(valor)) {
    // Mostramos um alerta explicando a regra
    alert("Digite um valor válido! Deve ser um número maior que 0.")
    // Sai da função para não adicionar nada inválido
    return
  }

  // -----------------------------------------------
  // Adiciona a transação válida à lista
  // -----------------------------------------------
  // Criamos um objeto com valor e tipo e adicionamos ao array
  transacoes.push({ valor, tipo })

  // -----------------------------------------------
  // Limpa o campo de input para o próximo valor
  // -----------------------------------------------
  valorInput.value = ""

  // -----------------------------------------------
  // Atualiza a tela para mostrar a lista e os totais
  // -----------------------------------------------
  atualizarTela()
}

// ===============================================
// Função para atualizar a lista e os totais na tela
// ===============================================
function atualizarTela() {
  // Pegamos o elemento HTML da lista de transações (<ul>)
  const lista = document.getElementById("lista")
  // Pegamos os elementos que vão mostrar os totais
  const totalGanhoEl = document.getElementById("totalGanho")
  const totalGastoEl = document.getElementById("totalGasto")
  const lucroEl = document.getElementById("lucro")

  // Limpa a lista no HTML para atualizar com os novos valores
  lista.innerHTML = ""

  // Inicializamos os totais
  let totalGanho = 0
  let totalGasto = 0

  // Percorremos todas as transações cadastradas
  transacoes.forEach(transacao => {
    // Criamos um item de lista (<li>) para cada transação
    const li = document.createElement("li")
    // Montamos o texto "GANHO - R$ 10" ou "GASTO - R$ 15"
    li.textContent = `${transacao.tipo.toUpperCase()} - R$ ${transacao.valor}`
    // Adicionamos o item à lista no HTML
    lista.appendChild(li)

    // Atualizamos os totais de acordo com o tipo
    if (transacao.tipo === "ganho") {
      totalGanho += transacao.valor
    } else {
      totalGasto += transacao.valor
    }
  })

  // Atualizamos os elementos da tela com os totais calculados
  totalGanhoEl.textContent = totalGanho
  totalGastoEl.textContent = totalGasto
  lucroEl.textContent = totalGanho - totalGasto
}