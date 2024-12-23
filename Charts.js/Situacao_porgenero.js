     
             fetch(url)
            .then(response => response.json())
            .then(data => {
                // Processar os dados da planilha
                const situacoesGenero = {};
                const totalPorSituacao = {};

                data.slice(1).forEach(item => { // Ignorar o cabeçalho
                    const situacao = item[6]; // Coluna de situação de maior ansiedade
                    const genero = item[2]; // Coluna de gênero

                    if (!situacoesGenero[situacao]) {
                        situacoesGenero[situacao] = { Masculino: 0, Feminino: 0 };
                        totalPorSituacao[situacao] = 0;
                    }
                    situacoesGenero[situacao][genero]++;
                    totalPorSituacao[situacao]++;
                });

                const labels = Object.keys(situacoesGenero);
                const masculino = labels.map(label => (situacoesGenero[label].Masculino / totalPorSituacao[label]) * 100);
                const feminino = labels.map(label => (situacoesGenero[label].Feminino / totalPorSituacao[label]) * 100);

                var ctx = document.getElementById('stackedBarChart').getContext('2d');
                var stackedBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Masculino',
                            data: masculino,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Feminino',
                            data: feminino,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                stacked: true
                            },
                            y: {
                                stacked: true,
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return value + '%';
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    