let chart;

async function cargarDatos() {
  const res = await fetch('/api/logs');
  const logs = await res.json();

  document.getElementById('total').innerText = logs.length;

  const errores = logs.filter(l => l.status >= 400).length;
  document.getElementById('errores').innerText = errores;

  const totalTime = logs.reduce((acc, l) => acc + l.response_time, 0);
  const promedio = logs.length ? (totalTime / logs.length).toFixed(2) : 0;
  document.getElementById('latencia').innerText = promedio + ' ms';

  const tabla = document.getElementById('tabla');
  tabla.innerHTML = '';

  logs.forEach(log => {
    tabla.innerHTML += `
      <tr>
        <td>${log.id}</td>
        <td>${log.method}</td>
        <td>${log.endpoint}</td>
        <td>${log.status}</td>
        <td>${log.response_time}</td>
        <td>${log.fecha}</td>
      </tr>
    `;
  });

  const metodos = {};
  logs.forEach(l => {
    metodos[l.method] = (metodos[l.method] || 0) + 1;
  });

  const labels = Object.keys(metodos);
  const values = Object.values(metodos);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Requests por método',
        data: values,
        backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444']
      }]
    }
  });
}


async function cargarStatus() {
  try {
    await fetch('/api/status');
    document.getElementById('status').innerText = '🟢 ONLINE';
  } catch {
    document.getElementById('status').innerText = '🔴 OFFLINE';
  }
}


setInterval(() => {
  cargarDatos();
  cargarStatus();
}, 3000);

cargarDatos();
cargarStatus();
