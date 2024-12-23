const url = "https://script.google.com/macros/s/AKfycbx6ySDNZU2q_00bvXcgDj0E0IpZWee6Ae_JVTaNO6BUTTqAbu2StyRKmSkktBpHEc6W/exec";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Processar os dados da planilha
                const relacionamentoLideres = {};
                const totalPorDepartamento = {};

                data.slice(1).forEach(item => { // Ignorar o cabeçalho
                    const depto = item[1]; // Coluna de departamento
                    const relacionamento = item[12]; // Coluna de relacionamento com líderes

                    if (!relacionamentoLideres[depto]) {
                        relacionamentoLideres[depto] = { Bom: 0, Regular: 0, Ruim: 0 };
                        totalPorDepartamento[depto] = 0;
                    }
                    relacionamentoLideres[depto][relacionamento]++;
                    totalPorDepartamento[depto]++;
                });

                const labels = Object.keys(relacionamentoLideres);
                const bom = labels.map(label => (relacionamentoLideres[label].Bom / totalPorDepartamento[label]) * 100);
                const regular = labels.map(label => (relacionamentoLideres[label].Regular / totalPorDepartamento[label]) * 100);
                const ruim = labels.map(label => (relacionamentoLideres[label].Ruim / totalPorDepartamento[label]) * 100);

                var ctx = document.getElementById('animatedBarChart').getContext('2d');
                var animatedBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Bom',
                            data: bom,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Regular',
                            data: regular,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Ruim',
                            data: ruim,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutBounce'
                        },
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