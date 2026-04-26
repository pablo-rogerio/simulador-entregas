let fila = [];
let historico = [];

function atualizarTela() {
    let listaFila = document.getElementById("fila");
    let listaHistorico = document.getElementById("historico");
    let contador = document.getElementById("contador");

    listaFila.innerHTML = "";
    listaHistorico.innerHTML = "";

    fila.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.nome} - ${p.cidade} (${p.pais})`;
        listaFila.appendChild(li);
    });

    historico.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.nome} - ${p.cidade} (${p.pais})`;
        listaHistorico.appendChild(li);
    });

    contador.textContent = `Pacotes na fila: ${fila.length}`;
}

async function adicionarPacote() {
    try {
        let res = await fetch("https://randomuser.me/api/");
        let data = await res.json();

        let user = data.results[0];

        let pacote = {
            nome: user.name.first,
            cidade: user.location.city,
            pais: user.location.country
        };

        fila.push(pacote);
        atualizarTela();

    } catch (erro) {
        alert("Erro ao carregar API");
        console.error(erro);
    }
}

function entregarPacote() {
    if (fila.length === 0) {
        alert("Fila vazia!");
        return;
    }

    let atual = document.getElementById("atual");
    let pacote = fila.shift();

    atual.textContent = `Entregando para ${pacote.nome}...`;

    setTimeout(() => {
        historico.push(pacote);
        atualizarTela();

        atual.textContent = "Nenhuma entrega em andamento";
        alert(`Entregue para ${pacote.nome}!`);

    }, 2000);
}