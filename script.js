// 1. ANIMAÇÃO DE ROLAGEM SUAVE (SMOOTH SCROLL) PARA LINKS INTERNOS
const links = document.querySelectorAll('.navbar a[href^="#"]');

for (const link of links) {
    link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    window.scrollTo({
        top: offsetTop - 70, // Compensa a altura do menu fixo
        behavior: "smooth"
    });
}

// 2. LÓGICA DO SIMULADOR DE IMPACTO ECOLÓGICO (Manejo Regenerativo)
const btnCalcular = document.getElementById("btn-calcular");
const inputHectares = document.getElementById("hectares");

// Elementos de exibição de resultado
const resCo2 = document.getElementById("res-co2");
const resAgua = document.getElementById("res-agua");
const resSolo = document.getElementById("res-solo");

if (btnCalcular) {
    btnCalcular.addEventListener("click", function() {
        const ha = parseFloat(inputHectares.value);

        if (isNaN(ha) || ha <= 0) {
            alert("Por favor, insira uma quantidade válida de hectares superior a 0.");
            return;
        }

        // Fatores de impacto técnico aproximados por hectare/ano:
        // - Sequestro médio de CO2 em solo manejado/iLPF: 4.8 toneladas/ha/ano
        // - Economia/Proteção de água via manejo ecológico: ~15.5 milhões de litros/ha/ano (fluxo de bacia)
        // - Índice simbólico de restauração da biodiversidade biológica do solo
        const totalCo2 = (ha * 4.8).toFixed(1);
        const totalAgua = (ha * 15.5).toFixed(1);
        const totalSolo = Math.floor(ha * 1250); // ex: milhões de colônias regeneradas

        // Atualiza os valores na tela de forma dinâmica e formatada
        animateValue(resCo2, 0, parseFloat(totalCo2), 1000, " t");
        animateValue(resAgua, 0, parseFloat(totalAgua), 1000, " M/L");
        animateValue(resSolo, 0, totalSolo, 1000, " Mi");
    });
}

// Função utilitária para efeito visual de contagem subindo
function animateValue(obj, start, end, duration, suffix = "") {
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