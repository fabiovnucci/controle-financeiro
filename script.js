// Lista de transações (Armazenamento em memória)
let transacoes = []

/**
 * Função chamada ao clicar no botão "Adicionar"
 * Captura os dados, valida e atualiza o sistema
 */
function adicionarTransacao() {
  const valorInput = document.getElementById("valor")
  const tipoSelect = document.getElementById("tipo")
  const valor = Number(valorInput.value)
  const tipo = tipoSelect.value

  // Validação: Garante que o usuário digite um número positivo
  if (valor <= 0 || isNaN(valor)) {
    alert("Digite um valor válido! Deve ser um número maior que 0.")
    return
  }

  // Adiciona o objeto da transação ao array
  transacoes.push({ valor, tipo })

  // Limpa o campo de entrada para a próxima digitação
  valorInput.value = ""
  valorInput.focus()

  // Atualiza a interface do usuário
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

  // Limpa a lista atual para evitar duplicação ao redesenhar
  lista.innerHTML = ""

  let totalGanho = 0
  let totalGasto = 0

  /**
   * Helper: Formata números para o padrão de moeda brasileiro (R$ 0,00)
   */
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  }

  // Percorre o array de transações para criar os elementos visuais
  transacoes.forEach(transacao => {
    const li = document.createElement("li")
    
    // Define o conteúdo interno com HTML para separar o rótulo do valor
    li.innerHTML = `
      <span>${transacao.tipo.toUpperCase()}</span>
      <strong>${formatarMoeda(transacao.valor)}</strong>
    `;
    
    // Adiciona as classes para as bordinhas coloridas no CSS
    if (transacao.tipo === "ganho") {
      li.classList.add("item-ganho")
      totalGanho += transacao.valor
    } else {
      li.classList.add("item-gasto")
      totalGasto += transacao.valor
    }

    lista.appendChild(li)
  })

  // Atualiza os elementos de resumo com os valores formatados
  totalGanhoEl.textContent = formatarMoeda(totalGanho)
  totalGastoEl.textContent = formatarMoeda(totalGasto)
  
  // Cálculo do lucro líquido
  const resultadoLucro = totalGanho - totalGasto
  lucroEl.textContent = formatarMoeda(resultadoLucro)

  // Mudança dinâmica de cor no Lucro (Opcional: Verde para positivo, vermelho para negativo)
  lucroEl.style.color = resultadoLucro >= 0 ? "#27ae60" : "#e74c3c"
}