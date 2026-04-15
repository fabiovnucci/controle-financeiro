// Lista de transações (Armazenamento em memória)
let transacoes = []

/**
 * Função chamada ao clicar no botão "Adicionar"
 */
function adicionarTransacao() {
  const valorInput = document.getElementById("valor")
  const tipoSelect = document.getElementById("tipo")
  const valor = Number(valorInput.value)
  const tipo = tipoSelect.value

  if (valor <= 0 || isNaN(valor)) {
    alert("Digite um valor válido! Deve ser um número maior que 0.")
    return
  }

  transacoes.push({ valor, tipo })

  valorInput.value = ""
  valorInput.focus()

  atualizarTela()
}

/**
 * Função responsável por redesenhar a lista e recalcular os totais
 */
function atualizarTela() {
  const lista = document.getElementById("lista")
  const totalGanhoEl = document.getElementById("totalGanho")
  const totalGastoEl = document.getElementById("totalGasto")
  const lucroEl = document.getElementById("lucro")
  
  // 1. Tenta pegar o elemento que contém o texto "Lucro"
  // Se não existir no seu HTML, adicione id="tituloLucro" onde está escrito a palavra Lucro
  const tituloLucroEl = document.getElementById("tituloLucro")

  lista.innerHTML = ""

  let totalGanho = 0
  let totalGasto = 0

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  }

  transacoes.forEach(transacao => {
    const li = document.createElement("li")
    
    li.innerHTML = `
      <span>${transacao.tipo.toUpperCase()}</span>
      <strong>${formatarMoeda(transacao.valor)}</strong>
    `;
    
    if (transacao.tipo === "ganho") {
      li.classList.add("item-ganho")
      totalGanho += transacao.valor
    } else {
      li.classList.add("item-gasto")
      totalGasto += transacao.valor
    }

    lista.appendChild(li)
  })

  totalGanhoEl.textContent = formatarMoeda(totalGanho)
  totalGastoEl.textContent = formatarMoeda(totalGasto)
  
  // CÁLCULO E LÓGICA DE EXIBIÇÃO
  const resultadoLucro = totalGanho - totalGasto
  lucroEl.textContent = formatarMoeda(resultadoLucro)

  // 2. Mudança dinâmica de cor e de TEXTO
  if (resultadoLucro >= 0) {
    lucroEl.style.color = "#27ae60" // Verde
    if (tituloLucroEl) tituloLucroEl.textContent = "Lucro:"
  } else {
    lucroEl.style.color = "#e74c3c" // Vermelho
    if (tituloLucroEl) tituloLucroEl.textContent = "Prejuízo:"
  }
}
