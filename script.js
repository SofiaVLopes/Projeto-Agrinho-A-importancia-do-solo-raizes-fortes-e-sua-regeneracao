// ==========================================
// 1. MENU HAMBÚRGUER (MOBILE)
// ==========================================
const botaoMenu = document.getElementById("botao-menu");
const menuPrincipal = document.getElementById("menu-principal");

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", function() {
        // Liga/desliga as classes que fazem o menu aparecer e o botão virar X
        botaoMenu.classList.toggle("ativo");
        menuPrincipal.classList.toggle("aberto");
    });

    // Fecha o menu se clicar em qualquer link dele (para rolar até a seção)
    const linksMenu = menuPrincipal.querySelectorAll("a");
    linksMenu.forEach(link => {
        link.addEventListener("click", () => {
            botaoMenu.classList.remove("ativo");
            menuPrincipal.classList.remove("aberto");
        });
    });
}


// ==========================================
// 2. ACESSIBILIDADE: MODO NOTURNO
// ==========================================
const btnContraste = document.getElementById("btn-contraste");

if (btnContraste) {
    btnContraste.addEventListener("click", function() {
        // Coloca ou tira a classe 'modo-noturno' no body do HTML
        document.body.classList.toggle("modo-noturno");
    });
}


// ==========================================
// 3. ACESSIBILIDADE: TAMANHO DA FONTE
// ==========================================
const btnAumentar = document.getElementById("btn-aumentar-fonte");
const btnDiminuir = document.getElementById("btn-diminuir-fonte");

let tamanhoTextoAtual = 100; // Começa em 100%

if (btnAumentar && btnDiminuir) {
    btnAumentar.addEventListener("click", function() {
        if (tamanhoTextoAtual < 140) { // Limite máximo para não quebrar o site
            tamanhoTextoAtual += 10;
            document.body.style.fontSize = tamanhoTextoAtual + "%";
        }
    });

    btnDiminuir.addEventListener("click", function() {
        if (tamanhoTextoAtual > 80) { // Limite mínimo
            tamanhoTextoAtual -= 10;
            document.body.style.fontSize = tamanhoTextoAtual + "%";
        }
    });
}


// ==========================================
// 4. LÓGICA DO SIMULADOR ECOLÓGICO
// ==========================================
const btnCalcular = document.getElementById("btn-calcular");
const inputHectares = document.getElementById("hectares");

const resCo2 = document.getElementById("res-co2");
const resAgua = document.getElementById("res-agua");
const resSolo = document.getElementById("res-solo");

if (btnCalcular) {
    btnCalcular.addEventListener("click", function() {
        const ha = parseFloat(inputHectares.value);

        if (isNaN(ha) || ha <= 0) {
            alert("Por favor, digite uma quantidade de hectares maior que zero!");
            return;
        }

        // Cálculos matemáticos baseados nos dados ambientais
        const totalCo2 = (ha * 4.8).toFixed(1);
        const totalAgua = (ha * 15.5).toFixed(1);
        const totalSolo = Math.floor(ha * 1250); 

        // Efeito visual de números subindo de forma dinâmica
        animarValores(resCo2, 0, parseFloat(totalCo2), 1000, " t");
        animarValores(resAgua, 0, parseFloat(totalAgua), 1000, " M/L");
        animarValores(resSolo, 0, totalSolo, 1000, " Mi");
    });
}

function animarValores(obj, start, end, duration, suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = progress * (end - start) + start;
        
        if (Number.isInteger(end)) {
            obj.innerHTML = Math.floor(currentValue).toLocaleString('pt-BR') + suffix;
        } else {
            obj.innerHTML = currentValue.toFixed(1).replace('.', ',') + suffix;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}