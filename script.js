// Lista de transações (armazenamento em memória)
const transacoes = [];

const formatarMoeda = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Chamada ao clicar no botão "Adicionar"
 */
function adicionarTransacao() {
  const valorInput = document.getElementById("valor");
  const tipoSelect = document.getElementById("tipo");
  const valor = Number(valorInput.value);
  const tipo = tipoSelect.value;

  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido! Deve ser um número maior que 0.");
    return;
  }

  transacoes.push({ valor, tipo });

  valorInput.value = "";
  valorInput.focus();

  atualizarTela();
}

/**
 * Redesenha a lista e recalcula os totais
 */
function atualizarTela() {
  const lista = document.getElementById("lista");
  const totalGanhoEl = document.getElementById("totalGanho");
  const totalGastoEl = document.getElementById("totalGasto");
  const lucroEl = document.getElementById("lucro");
  const tituloLucroEl = document.getElementById("tituloLucro");

  lista.innerHTML = "";

  let totalGanho = 0;
  let totalGasto = 0;

  transacoes.forEach((transacao) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${transacao.tipo.toUpperCase()}</span>
      <strong>${formatarMoeda(transacao.valor)}</strong>
    `;

    if (transacao.tipo === "ganho") {
      li.classList.add("item-ganho");
      totalGanho += transacao.valor;
    } else {
      li.classList.add("item-gasto");
      totalGasto += transacao.valor;
    }

    lista.appendChild(li);
  });

  totalGanhoEl.textContent = formatarMoeda(totalGanho);
  totalGastoEl.textContent = formatarMoeda(totalGasto);

  const resultado = totalGanho - totalGasto;
  lucroEl.textContent = formatarMoeda(resultado);

  if (resultado >= 0) {
    lucroEl.style.color = "#2ecc71";
    tituloLucroEl.textContent = "Lucro:";
  } else {
    lucroEl.style.color = "#ff6b6b";
    tituloLucroEl.textContent = "Prejuízo:";
  }
}