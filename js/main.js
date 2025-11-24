document.addEventListener('DOMContentLoaded', function () {
  // Archivo JS principal — genera las tarjetas de productos crediticios
  console.log('main.js cargado');

  const productos = [
    {
      id: 'libre-inversion',
      tipo: 'libre',
      nombre: 'Crédito Libre Inversión',
      tasa: '12.5% E.A.',
      montoDesde: '$1.000.000',
      montoHasta: '$100.000.000',
      plazoMax: '60 meses'
    },
    {
      id: 'vehiculo',
      tipo: 'vehiculo',
      nombre: 'Crédito Vehículo',
      tasa: '9.8% E.A.',
      montoDesde: '$5.000.000',
      montoHasta: '$200.000.000',
      plazoMax: '72 meses'
    },
    {
      id: 'vivienda',
      tipo: 'vivienda',
      nombre: 'Crédito Vivienda',
      tasa: '7.2% E.A.',
      montoDesde: '$20.000.000',
      montoHasta: '$500.000.000',
      plazoMax: '240 meses'
    },
    {
      id: 'educativo',
      tipo: 'educativo',
      nombre: 'Crédito Educativo',
      tasa: '6.5% E.A.',
      montoDesde: '$500.000',
      montoHasta: '$50.000.000',
      plazoMax: '120 meses'
    },
    {
      id: 'empresarial',
      tipo: 'empresarial',
      nombre: 'Crédito Empresarial',
      tasa: '11.0% E.A.',
      montoDesde: '$10.000.000',
      montoHasta: '$1.000.000.000',
      plazoMax: '180 meses'
    }
  ];

  function getIconSVG(tipo){
    // Devuelve un SVG simple según el tipo
    switch(tipo){
      case 'vehiculo':
        return `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 13l1-3h13l1 3v6H3v-6z" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="7.5" cy="18" r="1.5" fill="#2b6cb0"/>
            <circle cx="16.5" cy="18" r="1.5" fill="#2b6cb0"/>
          </svg>`;
      case 'vivienda':
        return `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 11l9-7 9 7" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M5 11v8h14v-8" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>`;
      case 'educativo':
        return `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2l9 4-9 4-9-4 9-4z" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M3 10.5v4.5c0 1.1.9 2 2 2h2" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;
      case 'empresarial':
        return `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#2b6cb0" stroke-width="1.2" fill="none"/>
            <path d="M7 7V4h10v3" stroke="#2b6cb0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>`;
      default:
        return `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="#2b6cb0" stroke-width="1.2" fill="none"/>
          </svg>`;
    }
  }

  function renderProductos(){
    const grid = document.getElementById('productos-grid');
    if(!grid) return;
    grid.innerHTML = productos.map(p => `
      <article class="product-card" role="article" aria-labelledby="${p.id}-title">
        <div class="product-top">
          <div class="product-icon" aria-hidden="true">${getIconSVG(p.tipo)}</div>
          <div>
            <div id="${p.id}-title" class="product-name">${p.nombre}</div>
            <div class="small-muted">Plazo máximo: ${p.plazoMax}</div>
          </div>
        </div>
        <div class="product-rate">${p.tasa}</div>
        <div class="product-meta">Monto disponible: <strong>${p.montoDesde}</strong> — <strong>${p.montoHasta}</strong></div>
        <div class="product-actions">
          <a class="btn-outline btn-detalles" href="solicitar.html?id=${p.id}" data-product="${p.id}" aria-label="Ver detalles de ${p.nombre}">Ver detalles</a>
          <a class="btn-primary" href="solicitar.html?solicitar=${p.id}" aria-label="Solicitar ${p.nombre}">Solicitar</a>
        </div>
      </article>
    `).join('');
  }

  // Mapa de requisitos por tipo de crédito
  const requisitosPorTipo = {
    libre: [
      'Documento de identidad (cédula).',
      'Certificación de ingresos o extractos bancarios.',
      'Comprobante de domicilio reciente.',
      'Formulario de solicitud firmado.'
    ],
    vehiculo: [
      'Documento de identidad (cédula).',
      'Cotización o factura del vehículo (si aplica).',
      'Certificación de ingresos o balance.',
      'Póliza SOAT y documentos del vehículo (si se requiere garantía).'
    ],
    vivienda: [
      'Documento de identidad (cédula).',
      'Avaluó o promesa de compraventa (si aplica).',
      'Certificación de ingresos y pronósticos financieros.',
      'Documentos del inmueble (escrituras, paz y salvo de predial).'
    ],
    educativo: [
      'Documento de identidad (cédula).',
      'Certificado de matrícula o carta de aceptación institucional.',
      'Plan de estudios y costos detallados.',
      'Certificación de ingresos o garante (si aplica).'
    ],
    empresarial: [
      'Documento de identidad (cédula) del representante legal.',
      'Estados financieros y balances de la empresa.',
      'Cámara de comercio y documentación legal de la empresa.',
      'Plan de negocio o proyección de flujo de caja.'
    ]
  };

  function showProductModal(productId){
    const p = productos.find(x => x.id === productId);
    if(!p) return;
    // Rellenar campos del modal
    const titleEl = document.getElementById('modal-title');
    const subEl = document.getElementById('modal-sub');
    const iconEl = document.getElementById('modal-icon');
    const tasaEl = document.getElementById('modal-tasa');
    const montoEl = document.getElementById('modal-monto');
    const plazoEl = document.getElementById('modal-plazo');
    const descEl = document.getElementById('modal-descripcion');
    const reqEl = document.getElementById('modal-requisitos');
    const solicitarBtn = document.getElementById('modal-solicitar');

    titleEl.textContent = p.nombre;
    subEl.textContent = `Plazo máximo: ${p.plazoMax}`;
    iconEl.innerHTML = getIconSVG(p.tipo);
    tasaEl.textContent = p.tasa;
    montoEl.textContent = `${p.montoDesde} — ${p.montoHasta}`;
    plazoEl.textContent = p.plazoMax;
    descEl.textContent = p.descripcion || 'Producto diseñado para ajustarse a distintas necesidades financieras.';

    // Requisitos: combinación de requisitos comunes + específicos por tipo
    const comunes = ['Documento de identidad válido.', 'Cuenta bancaria o medio de pago.', 'Formulario de solicitud completo.'];
    const tipoReq = requisitosPorTipo[p.tipo] || [];
    const lista = [...comunes, ...tipoReq];
    reqEl.innerHTML = lista.map(item => `<li>${item}</li>`).join('');

    solicitarBtn.setAttribute('href', `solicitar.html?solicitar=${p.id}`);

    // Mostrar modal usando API de Bootstrap
    const modalEl = document.getElementById('productoModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  // Delegación de eventos: detectar clicks en "Ver detalles"
  document.addEventListener('click', function(e){
    const target = e.target.closest('.btn-detalles');
    if(!target) return;
    e.preventDefault();
    const pid = target.getAttribute('data-product');
    if(pid) showProductModal(pid);
  });

  renderProductos();
});
