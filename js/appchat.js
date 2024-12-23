document.addEventListener("DOMContentLoaded", function () {
  const url = "https://script.google.com/macros/s/AKfycbx6ySDNZU2q_00bvXcgDj0E0IpZWee6Ae_JVTaNO6BUTTqAbu2StyRKmSkktBpHEc6W/exec";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error("A resposta da API não é uma lista de dados válida.");
      }

      // Cria mapas para armazenar os dados agrupados dinamicamente
      const faixasFeminino = new Map();
      const faixasMasculino = new Map();

      // Processa os dados retornados
      data.forEach((row, index) => {
        if (index === 0) return; // Ignora o cabeçalho

        const genero = row[2];
        const faixaEtaria = row[3];
        

        if (genero === "Feminino") {
          faixasFeminino.set(faixaEtaria, (faixasFeminino.get(faixaEtaria) || 0) + 1);
        } else if (genero === "Masculino") {
          faixasMasculino.set(faixaEtaria, (faixasMasculino.get(faixaEtaria) || 0) + 1);
        }
        
      });

      // Converte os mapas para objetos para exibição
      const faixasFemininoObj = Object.fromEntries(faixasFeminino);
      const faixasMasculinoObj = Object.fromEntries(faixasMasculino);

      // Exibe os dados processados na página
      const resultado = document.getElementById("resultado");
      resultado.textContent = JSON.stringify({ faixasFeminino: faixasFemininoObj, faixasMasculino: faixasMasculinoObj }, null, 2);

      // Cria os gráficos
      const ctxFeminino = document.getElementById("graficoFeminino").getContext("2d");
      const ctxMasculino = document.getElementById("graficoMasculino").getContext("2d");

      // Gráfico para o grupo Feminino
      new Chart(ctxFeminino, {
        type: "bar",
        data: {
          labels: Array.from(faixasFeminino.keys()),
          datasets: [
            {
              label: "Quantidade",
              data: Array.from(faixasFeminino.values()),
              backgroundColor: "#FF6384",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      // Gráfico para o grupo Masculino
      new Chart(ctxMasculino, {
        type: "bar",
        data: {
          labels: Array.from(faixasMasculino.keys()),
          datasets: [
            {
              label: "Quantidade",
              data: Array.from(faixasMasculino.values()),
              backgroundColor: "#36A2EB",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    })
    .catch(error => {
      console.error("Erro ao buscar ou processar os dados:", error);
      document.getElementById("resultado").textContent = "Erro ao buscar ou processar os dados: " + error.message;
    });
});
