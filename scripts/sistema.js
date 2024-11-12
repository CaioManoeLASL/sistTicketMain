const rows = 5;
const cols = 5;
let parkingLot = Array.from(Array(rows), () => Array(cols).fill(null));

const tarifaBase = 25.00; //até 3 hora
const tarifaAdicional = 15.00; // por hora extra
const tolerancia = 15; // minutos

const estados = {
    'DF' : ['JJK', 'JKL', 'JLL'],
    'GO' : ['JKK', 'JLM', 'JMK'],
    'MG' : ['JJL', 'JKM', 'JKJ']
};

export function adicionarCarro() {
    const placa = document.getElementById("placaEntrada").value.toUpperCase();
    const horaEntrada = document.getElementById("horaEntrada").value;

    if (!placa || !horaEntrada) return alert("Por favor, preencha todos os campos.");
    if (!validarPlaca(placa)) return alert("Placa inválida");
    if (verificarCarroNoEstacionamento(placa)) return alert("Carro já está estacionado");

    const horaEntradaDate = new Date(`1970-01-01T${horaEntrada}:00`);
    const aberturaEstacionamento = new Date(`1970-01-01T10:00:00`);
    const fechamentoEstacionamento = new Date(`1970-01-01T20:00:00`);
    if (horaEntradaDate < aberturaEstacionamento || horaEntradaDate > fechamentoEstacionamento) return alert("O estacionamento só funciona após as 10:00 e até 20:00");

    const estado = verificarEstado(placa);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (parkingLot[i][j] === null) {
                parkingLot[i][j] = { placa, horaEntrada, estado };
                atualizarMatriz();
                document.getElementById("ticket").innerText = `Entrada registrada! Placa: ${placa} | Estado: ${estado}`;
                return;
            }
        }
    }
    alert("estacionamento cheio!");
}

export function removerCarro(){
    const placa = document.getElementById("placaSaida").value.toUpperCase();
    const horaSaida = document.getElementById("horaSaida").value;

    if (!placa || !horaEntrada) return alert("Por favor, preencha todos os campos.");
    if (!validarPlaca(placa)) return alert("Placa inválida");
    
    const horaSaidaDate = new Date(`1970-01-01T${horaSaida}:00`);
    const aberturaEstacionamento = new Date(`1970-01-01T10:00:00`);
    const fechamentoEstacionamento = new Date(`1970-01-01T20:00:00`);
    if (horaSaidaDate < aberturaEstacionamento || horaSaidaDate > fechamentoEstacionamento) return alert("O estacionamento só funciona após as 10:00 e até 20:00");

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const carro = parkingLot[i][j];
            if (carro && carro.placa === placa) {
                const valor = calcularTarifa(carro.horaEntrada, horaSaida);
                if (valor === null) return alert("Hora de saída deve ser maior que a da entrada");
                parkingLot[i][j] = null;
                mostrarTicket(placa, valor);
                atualizarMatriz();
                return;
            }
        }
    }
    alert("Carro não encontrado!");
}

function verificarCarroNoEstacionamento(placa) {
    return parkingLot.some(row => row.some(cell => cell && cell.placa === placa));
}

function atualizarMatriz() {
    const matrixBody = document.getElementById("matrixBody")
    matrixBody.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            if (parkingLot[i][j]) {
                const { placa, estado } = parkingLot[i][j];
                cell.innerText = cell.innerHTML = `${placa} (${estado})`
            } else {
                cell.innerHTML = "Livre";
            }
            row.appendChild(cell);
        }
        matrixBody.appendChild(row);
    }
}

function calcularTarifa(horaEntrada, horaSaida) {
    const entrada = new Date(`1970-01-01T${horaEntrada}:00`);
    const saida = new Date(`1970-01-01T${horaSaida}:00`);

    if (saida <= entrada) return null;

    const minutosTotais = Math.ceil((saida - entrada) / (1000 * 60));
    if (minutosTotais <= tolerancia) return 0;

    const horasTotais = Math.ceil((minutosTotais - tolerancia) / 60);
    return horasTotais <= 3 ? tarifaBase : tarifaBase + (horasTotais - 3) * tarifaAdicional;
}

function mostrarTicket(placa, valor) {
    document.getElementById("ticket").innerText = `Placa: ${placa} | Valor a pagar: R$${valor.toFixed(2)}`;
}

function verificarEstado(placa) {
    const prefixo = placa.slice(0, 3);
    for (const [estado, combinacoes] of Object.entries(estados)) {
        if (combinacoes.includes(prefixo)) return estado;
    }
    return "Outro";
}

function validarPlaca(placa) {
    return /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa);
}

export function activate() {
    atualizarMatriz();
}