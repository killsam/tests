

fetch(url)
    .then(response => response.json())
    .then(data => {
        // Processar os dados da planilha
        const departamento = {};
        const totalPorDepartamento = {};

        data.slice(1).forEach(item => { // Ignorar o cabeçalho
            const depto = item[1]; // Coluna de departamento
            const nivel = item[5]; // Coluna de nível geral de ansiedade

            if (!departamento[depto]) {
                departamento[depto] = { Nenhum: 0, Baixo: 0, Médio: 0, Alto: 0 };
                totalPorDepartamento[depto] = 0;
            }
            departamento[depto][nivel]++;
            totalPorDepartamento[depto]++;
        });

        const labels = Object.keys(departamento);
        const nenhum = labels.map(label => (departamento[label].Nenhum / totalPorDepartamento[label]) * 100);
        const baixo = labels.map(label => (departamento[label].Baixo / totalPorDepartamento[label]) * 100);
        const medio = labels.map(label => (departamento[label].Médio / totalPorDepartamento[label]) * 100);
        const alto = labels.map(label => (departamento[label].Alto / totalPorDepartamento[label]) * 100);

        var ctx = document.getElementById('radarChart').getContext('2d');
        var radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Nenhum',
                    data: nenhum,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }, {
                    label: 'Baixo',
                    data: baixo,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Médio',
                    data: medio,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }, {
                    label: 'Alto',
                    data: alto,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
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