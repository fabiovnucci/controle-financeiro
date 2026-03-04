// Lista de transações
let transacoes = []

// Função chamada ao clicar em "Adicionar"
function adicionarTransacao() {
  const valorInput = document.getElementById("valor")
  const tipo = document.getElementById("tipo").value
  const valor = Number(valorInput.value)

  // Validação: valor > 0
  if (valor <= 0 || isNaN(valor)) {
    alert("Digite um valor válido! Deve ser um número maior que 0.")
    return
  }

  // Adiciona transação
  transacoes.push({ valor, tipo })

  // Limpa input
  valorInput.value = ""

  // Atualiza tela
  atualizarTela()
}

// Atualiza lista e totais
function atualizarTela() {
  const lista = document.getElementById("lista")
  const totalGanhoEl = document.getElementById("totalGanho")
  const totalGastoEl = document.getElementById("totalGasto")
  const lucroEl = document.getElementById("lucro")

  // Limpa lista
  lista.innerHTML = ""

  let totalGanho = 0
  let totalGasto = 0

  transacoes.forEach(transacao => {
    const li = document.createElement("li")
    li.textContent = `${transacao.tipo.toUpperCase()} - R$ ${transacao.valor}`
    
    // Adiciona classe para cor
    li.classList.add(transacao.tipo)

    lista.appendChild(li)

    if (transacao.tipo === "ganho") {
      totalGanho += transacao.valor
    } else {
      totalGasto += transacao.valor
    }
  })

  totalGanhoEl.textContent = totalGanho
  totalGastoEl.textContent = totalGasto
  lucroEl.textContent = totalGanho - totalGasto
}