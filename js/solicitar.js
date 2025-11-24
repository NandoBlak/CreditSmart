document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    { id:'libre-inversion', nombre:'Crédito Libre Inversión' },
    { id:'vehiculo', nombre:'Crédito Vehículo' },
    { id:'vivienda', nombre:'Crédito Vivienda' },
    { id:'educativo', nombre:'Crédito Educativo' },
    { id:'empresarial', nombre:'Crédito Empresarial' }
  ];

  const selTipo = document.getElementById('tipoCredito');
  productos.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nombre;
    selTipo.appendChild(opt);
  });

  // Prefill desde query params
  const params = new URLSearchParams(window.location.search);
  const pid = params.get('solicitar');
  const monto = params.get('monto');
  const plazo = params.get('plazo');

  if(pid && productos.some(p => p.id === pid)) selTipo.value = pid;
  if(monto) {
    const montoInput = document.getElementById('montoSolicitado');
    montoInput.value = monto;
  }
  if(plazo) {
    const plazoSel = document.getElementById('plazoMeses');
    if([...plazoSel.options].some(o => o.value === plazo)) plazoSel.value = plazo;
  }

  const form = document.getElementById('formSolicitud');
  const confirmBox = document.getElementById('confirm');
  const btnLimpiar = document.getElementById('btnLimpiar');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      confirmBox.style.display='block';
      confirmBox.textContent='Por favor completa todos los campos requeridos.';
      return;
    }
    const data = {
      nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
      cedula: document.getElementById('cedula').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      tipoCredito: selTipo.value,
      montoSolicitado: document.getElementById('montoSolicitado').value.trim(),
      plazoMeses: document.getElementById('plazoMeses').value,
      destinoCredito: document.getElementById('destinoCredito').value.trim(),
      empresa: document.getElementById('empresa').value.trim(),
      cargo: document.getElementById('cargo').value.trim(),
      ingresos: document.getElementById('ingresos').value.trim()
    };

    confirmBox.style.display='block';
    confirmBox.innerHTML = `<strong>Solicitud registrada.</strong><br>Nombre: ${data.nombreCompleto}<br>Cédula: ${data.cedula}<br>Email: ${data.email}<br>Teléfono: ${data.telefono}<br>Crédito: ${productos.find(p=>p.id===data.tipoCredito).nombre}<br>Monto: ${data.montoSolicitado}<br>Plazo: ${data.plazoMeses} meses<br>Destino: ${data.destinoCredito.substring(0,200)}${data.destinoCredito.length>200?'...':''}<br>Empresa: ${data.empresa}<br>Cargo: ${data.cargo}<br>Ingresos: ${data.ingresos}`;
  });

  btnLimpiar.addEventListener('click', () => {
    form.reset();
    confirmBox.style.display='none';
  });
});