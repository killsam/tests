document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Captura dos dados do formulário
    const formData = {
      participante: document.getElementById("participante").value,
      departamento: document.getElementById("departamento").value,
      genero: document.getElementById("genero").value,
      faixa_Etaria: document.getElementById("faixa_Etaria").value,
      frequencia_de_Ansiedade: document.getElementById("frequencia_de_Ansiedade").value,
      nivel_Geral_de_Ansiedade: document.getElementById("nivel_Geral_de_Ansiedade").value,
      situacoes_de_Maior_Ansiedade: document.getElementById("situacoes_de_Maior_Ansiedade").value,
      tensao_Corporal_Regular: document.getElementById("tensao_Corporal_Regular").value,
      tensao_Corporal_no_Trabalho: document.getElementById("tensao_Corporal_no_Trabalho").value,
      cansaco_Mental: document.getElementById("cansaco_Mental").value,
      situacoes_de_Cansaco_Mental: document.getElementById("situacoes_de_Cansaco_Mental").value,
      relacionamento_com_Colegas: document.getElementById("relacionamento_com_Colegas").value,
      relacionamento_com_Lideres: document.getElementById("relacionamento_com_Lideres").value,
      diferenca_Real_x_Autoavaliacao: document.getElementById("diferenca_Real_x_Autoavaliacao").value,
    };
  
    // URL do Google Apps Script (Substitua pela sua URL)
    const url =
      "https://script.google.com/macros/s/AKfycbx6ySDNZU2q_00bvXcgDj0E0IpZWee6Ae_JVTaNO6BUTTqAbu2StyRKmSkktBpHEc6W/exec";
  
    // Configuração do envio
    fetch(url, {
      method: "POST",
      mode: "no-cors", // Importante para não ter bloqueio de CORS
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        document.getElementById("mensagem").innerHTML =
          "<p style='color: green;'>Dados enviados com sucesso!</p>";
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        document.getElementById("mensagem").innerHTML =
          "<p style='color: red;'>Erro ao enviar os dados. Tente novamente.</p>";
        console.error("Erro:", error);
      });
  });
  