document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    { id:'libre-inversion', tipo:'libre', nombre:'Crédito Libre Inversión', tasa:'12.5% E.A.', montoDesde:'$1.000.000', montoHasta:'$100.000.000', montoMin:1000000, montoMax:100000000, plazoMaxMeses:60 },
    { id:'vehiculo', tipo:'vehiculo', nombre:'Crédito Vehículo', tasa:'9.8% E.A.', montoDesde:'$5.000.000', montoHasta:'$200.000.000', montoMin:5000000, montoMax:200000000, plazoMaxMeses:72 },
    { id:'vivienda', tipo:'vivienda', nombre:'Crédito Vivienda', tasa:'7.2% E.A.', montoDesde:'$20.000.000', montoHasta:'$500.000.000', montoMin:20000000, montoMax:500000000, plazoMaxMeses:240 },
    { id:'educativo', tipo:'educativo', nombre:'Crédito Educativo', tasa:'6.5% E.A.', montoDesde:'$500.000', montoHasta:'$50.000.000', montoMin:500000, montoMax:50000000, plazoMaxMeses:120 },
    { id:'empresarial', tipo:'empresarial', nombre:'Crédito Empresarial', tasa:'11.0% E.A.', montoDesde:'$10.000.000', montoHasta:'$1.000.000.000', montoMin:10000000, montoMax:1000000000, plazoMaxMeses:180 }
  ];

  function getIconSVG(tipo){
    switch(tipo){
      case 'vehiculo': return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13l1-3h13l1 3v6H3v-6z" stroke="#2b6cb0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="18" r="1.5" fill="#2b6cb0"/><circle cx="16.5" cy="18" r="1.5" fill="#2b6cb0"/></svg>`;
      case 'vivienda': return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11l9-7 9 7" stroke="#2b6cb0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 11v8h14v-8" stroke="#2b6cb0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'educativo': return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l9 4-9 4-9-4 9-4z" stroke="#2b6cb0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10.5v4.5c0 1.1.9 2 2 2h2" stroke="#2b6cb0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'empresarial': return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#2b6cb0" stroke-width="1.4"/><path d="M7 7V4h10v3" stroke="#2b6cb0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      default: return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#2b6cb0" stroke-width="1.4"/></svg>`;
    }
  }

  // Obtener id del query string
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const producto = productos.find(p => p.id === id) || productos[0];

  // Referencias DOM
  const iconEl = document.getElementById('producto-icon');
  const nombreEl = document.getElementById('producto-nombre');
  const plazoEl = document.getElementById('producto-plazo');
  const tasaEl = document.getElementById('producto-tasa');
  const montosEl = document.getElementById('producto-montos');
  const montoInput = document.getElementById('monto');
  const mesesInput = document.getElementById('meses');
  const tasaDisplay = document.getElementById('tasa-anual-fija');
  const btnCalcular = document.getElementById('btn-calcular');
  const btnReset = document.getElementById('btn-reset');
  const resultadosEl = document.getElementById('resultados');

  // Cargar datos
  iconEl.innerHTML = getIconSVG(producto.tipo);
  nombreEl.textContent = producto.nombre;
  plazoEl.textContent = `Plazo máximo: ${producto.plazoMaxMeses} meses`;
  tasaEl.textContent = producto.tasa;
  montosEl.textContent = `Rango estimado de monto: ${producto.montoDesde} — ${producto.montoHasta}`;

  // Prellenar inputs
  montoInput.min = producto.montoMin;
  montoInput.max = producto.montoMax;
  montoInput.value = Math.round((producto.montoMin + producto.montoMax) / 2 / 10000) * 10000; // punto medio redondeado a 10k
  mesesInput.min = 1;
  mesesInput.max = producto.plazoMaxMeses;
  mesesInput.value = Math.min( Math.round(producto.plazoMaxMeses/2), producto.plazoMaxMeses );
  const tasaNum = parseFloat(producto.tasa.replace(/[^0-9.,]/g,'').replace(',','.'));
  tasaDisplay.textContent = `${tasaNum.toFixed(2)}% E.A.`;

  function formatoPesos(x){
    return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(x);
  }

  function calcular(){
    const P = parseFloat(montoInput.value) || 0;
    const n = parseInt(mesesInput.value,10) || 1;
    const tasaAnual = tasaNum/100; // tasa fija E.A.
    if(P<=0 || n<=0 || tasaAnual<0){
      resultadosEl.style.display='none';
      return;
    }
    // Convertir tasa efectiva anual a tasa efectiva mensual
    const i = Math.pow(1 + tasaAnual, 1/12) - 1; // tasa mensual equivalente
    // Fórmula cuota: P * i / (1 - (1+i)^-n)
    const cuota = i === 0 ? P / n : P * i / (1 - Math.pow(1 + i, -n));
    const totalPagado = cuota * n;
    const totalInteres = totalPagado - P;

    resultadosEl.innerHTML = `
      <strong>Resultados estimados</strong><br>
      Monto solicitado: <strong>${formatoPesos(P)}</strong><br>
      Plazo: <strong>${n} meses</strong><br>
      Tasa anual efectiva: <strong>${(tasaAnual*100).toFixed(2)}% E.A.</strong><br>
      Tasa mensual equivalente: <strong>${(i*100).toFixed(3)}% M.E.</strong><br>
      Cuota mensual aproximada: <strong>${formatoPesos(Math.round(cuota))}</strong><br>
      Total pagado: <strong>${formatoPesos(Math.round(totalPagado))}</strong><br>
      Intereses aproximados: <strong>${formatoPesos(Math.round(totalInteres))}</strong>
    `;
    resultadosEl.style.display='block';
  }

  btnCalcular.addEventListener('click', calcular);
  btnReset.addEventListener('click', () => {
    montoInput.value = Math.round((producto.montoMin + producto.montoMax) / 2 / 10000) * 10000;
    mesesInput.value = Math.min( Math.round(producto.plazoMaxMeses/2), producto.plazoMaxMeses );
    resultadosEl.style.display='none';
  });

  // Recalcular automáticamente al cambiar
  [montoInput, mesesInput].forEach(el => el.addEventListener('input', () => {
    resultadosEl.style.display='none';
  }));
});