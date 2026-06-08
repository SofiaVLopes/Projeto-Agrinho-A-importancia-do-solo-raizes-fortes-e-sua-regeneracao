/**
 * Alterna a identidade visual do site entre Modo Claro e Modo Escuro
 * Manipula as variáveis de ambiente definidas no :root do CSS
 */
function alternarModoEscuro() {
    const body = document.body;
    const btnTema = document.getElementById('btn-tema');
    
    // Liga/Desliga a classe seletora no body
    body.classList.toggle('modo-escuro');
    
    // Atualiza o texto do botão para guiar o usuário
    if (body.classList.contains('modo-escuro')) {
        btnTema.textContent = 'Modo Claro';
    } else {
        btnTema.textContent = 'Modo Escuro';
    }
}

/**
 * Processa os dados do simulador e gera os resultados matemáticos de impacto ambiental
 */
function processarDadosAmbientais() {
    // Captura os elementos de entrada
    const nomeOriginal = document.getElementById('input-nome').value;
    const hectaresTexto = document.getElementById('input-hectares').value;
    
    // Limpa espaços extras
    const nome = nomeOriginal.trim();
    const hectares = parseFloat(hectaresTexto);

    // Validação de segurança dos campos obrigatórios
    if (nome === "" || isNaN(hectares) || hectares <= 0) {
        alert("Por favor, preencha seu nome e uma quantidade válida de hectares (maior que 0).");
        return;
    }

    /* CÁLCULOS BIOLÓGICOS ESTIMADOS (Baseados em dados reais de manejo regenerativo):
       - Cada hectare de plantio regenerativo retém em média 2,5 toneladas de CO2 equivalente por ano.
       - A conservação do solo e bacias preserva cerca de 120 mil litros (120 m³) de água por hectare/ano.
    */
    const toneladasCO2 = (hectares * 2.5).toFixed(1);
    const milLitrosAgua = (hectares * 120).toLocaleString('pt-BR');

    // Injeta os dados tratados diretamente na interface (Manipulação do DOM)
    document.getElementById('saudacao-usuario').textContent = `🌿 Excelente iniciativa, ${nome}!`;
    document.getElementById('calc-co2').textContent = toneladasCO2;
    document.getElementById('calc-agua').textContent = milLitrosAgua;

    // Torna a caixa de resultados visível aplicando a classe CSS correspondente
    const caixaResultado = document.getElementById('ca
