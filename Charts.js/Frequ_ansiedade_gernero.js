          fetch(url)
            .then(response => response.json())
            .then(data => {
                // Processar os dados da planilha
                const faixaEtaria = {};
                const totalPorFaixa = {};

                data.slice(1).forEach(item => { // Ignorar o cabeçalho
                    const faixa = item[3]; // Coluna de faixa etária
                    const frequencia = item[4]; // Coluna de frequência de ansiedade

                    if (!faixaEtaria[faixa]) {
                        faixaEtaria[faixa] = { Frequentemente: 0, 'Algumas vezes': 0, Raramente: 0, Nunca: 0 };
                        totalPorFaixa[faixa] = 0;
                    }
                    faixaEtaria[faixa][frequencia]++;
                    totalPorFaixa[faixa]++;
                });

                const labels = Object.keys(faixaEtaria);
                const frequentemente = labels.map(label => (faixaEtaria[label].Frequentemente / totalPorFaixa[label]) * 100);
                const algumasVezes = labels.map(label => (faixaEtaria[label]['Algumas vezes'] / totalPorFaixa[label]) * 100);
                const raramente = labels.map(label => (faixaEtaria[label].Raramente / totalPorFaixa[label]) * 100);
                const nunca = labels.map(label => (faixaEtaria[label].Nunca / totalPorFaixa[label]) * 100);

                var ctx = document.getElementById('AnsiedadeFetaria').getContext('2d');
                var AnsiedadeFetaria = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Frequentemente',
                            data: frequentemente,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Algumas vezes',
                            data: algumasVezes,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Raramente',
                            data: raramente,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Nunca',
                            data: nunca,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
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