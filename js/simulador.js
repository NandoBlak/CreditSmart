document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    {
      id: 'libre-inversion',
      tipo: 'libre',
      nombre: 'Crédito Libre Inversión',
      tasa: '12.5% E.A.',
      montoDesde: '$1.000.000',
      montoHasta: '$100.000.000',
      montoMin: 1000000,
      montoMax: 100000000,
      plazoMax: '60 meses'
    },
    {
      id: 'vehiculo',
      tipo: 'vehiculo',
      nombre: 'Crédito Vehículo',
      tasa: '9.8% E.A.',
      montoDesde: '$5.000.000',
      montoHasta: '$200.000.000',
      montoMin: 5000000,
      montoMax: 200000000,
      plazoMax: '72 meses'
    },
    {
      id: 'vivienda',
      tipo: 'vivienda',
      nombre: 'Crédito Vivienda',
      tasa: '7.2% E.A.',
      montoDesde: '$20.000.000',
      montoHasta: '$500.000.000',
      montoMin: 20000000,
      montoMax: 500000000,
      plazoMax: '240 meses'
    },
    {
      id: 'educativo',
      tipo: 'educativo',
      nombre: 'Crédito Educativo',
      tasa: '6.5% E.A.',
      montoDesde: '$500.000',
      montoHasta: '$50.000.000',
      montoMin: 500000,
      montoMax: 50000000,
      plazoMax: '120 meses'
    },
    {
      id: 'empresarial',
      tipo: 'empresarial',
      nombre: 'Crédito Empresarial',
      tasa: '11.0% E.A.',
      montoDesde: '$10.000.000',
      montoHasta: '$1.000.000.000',
      montoMin: 10000000,
      montoMax: 1000000000,
      plazoMax: '180 meses'
    }
  ];

  function getIconSVG(tipo){
    switch(tipo){
      case 'vehiculo':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 13l1-3h13l1 3v6H3v-6z" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="18" r="1.5" fill="#2b6cb0"/><circle cx="16.5" cy="18" r="1.5" fill="#2b6cb0"/></svg>`;
      case 'vivienda':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 11l9-7 9 7" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 11v8h14v-8" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'educativo':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2l9 4-9 4-9-4 9-4z" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10.5v4.5c0 1.1.9 2 2 2h2" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'empresarial':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#2b6cb0" stroke-width="1.2"/><path d="M7 7V4h10v3" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      default:
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#2b6cb0" stroke-width="1.2"/></svg>`;
    }
  }

  const inputBusqueda = document.getElementById('busqueda');
  const selectRango = document.getElementById('rango');
  const grid = document.getElementById('productos-grid');
  const sinResultados = document.getElementById('sin-resultados');

  function render(lista){
    if(!grid) return;
    grid.innerHTML = lista.map(p => `
      <article class="product-card clickable" tabindex="0" role="button" aria-labelledby="${p.id}-title" data-product="${p.id}" aria-pressed="false">
        <div class="product-top">
          <div class="product-icon" aria-hidden="true">${getIconSVG(p.tipo)}</div>
          <div>
            <div id="${p.id}-title" class="product-name">${p.nombre}</div>
            <div class="small-muted">Plazo máximo: ${p.plazoMax}</div>
          </div>
        </div>
        <div class="product-rate">${p.tasa}</div>
        <div class="product-meta">Monto disponible: <strong>${p.montoDesde}</strong> — <strong>${p.montoHasta}</strong></div>
      </article>
    `).join('');
    sinResultados.style.display = lista.length ? 'none' : 'block';
  }

  function filtrar(){
    const texto = inputBusqueda.value.trim().toLowerCase();
    const rangoValor = selectRango.value;
    let filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));

    if(rangoValor !== 'todos'){
      const [minStr,maxStr] = rangoValor.split('-');
      const min = parseInt(minStr,10);
      const max = parseInt(maxStr,10);
      filtrados = filtrados.filter(p => p.montoMin >= min && p.montoMax <= max);
    }
    render(filtrados);
  }

  inputBusqueda.addEventListener('input', filtrar);
  selectRango.addEventListener('change', filtrar);

  render(productos);

  // Abrir nueva pestaña de simulación al hacer click o Enter
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card.clickable');
    if(!card) return;
    const pid = card.getAttribute('data-product');
    if(pid) window.open(`simular.html?id=${pid}`, '_blank');
  });

  grid.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      const card = e.target.closest('.product-card.clickable');
      if(!card) return;
      const pid = card.getAttribute('data-product');
      if(pid) window.open(`simular.html?id=${pid}`, '_blank');
    }
  });
});
