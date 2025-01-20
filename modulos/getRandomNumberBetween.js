function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let ruleta;
ruleta = getRandomNumberBetween(1, 27);
const ruleta_fija = ruleta;
let dado;

// --variables para llamar a los select por el id
let $provincia = document.getElementById('provincia'); // categoría estaciones
let $departamento = document.getElementById('departamento'); // categoría provincias o distritos

//let $valor_k = document.getElementById('valor_k')

let temp_min_ext;
let primer_numero;
let primer_codigo;
let primer_distrito;
let primera_estacion;
let primera_tmnd;
estacionData();
async function estacionData() {
  let e_lista_unica = [];
  let e_numeros = [];
  let e_codigos = [];
  let e_distritos = [];
  let e_estaciones = [];
  let e_latitudes = [];
  let e_longitudes = [];
  let e_ggdds = [];
  let e_zonas = [];
  let e_tmnds = [];
  const response = await fetch('0_estaciones_prueba.csv');
  const data = await response.text();
  let template = '';
  let template2 = '';
  const filas = data.split('\n').slice(1);
  filas.forEach(elemento => {
    //acá arranca el loop por el csv, cada fila es elemento

    const fila = elemento.split(',');
    const e_numero = fila[0];
    const e_codigo = fila[1];
    const e_distrito = fila[2];
    const e_estacion = fila[3];
    const e_latitud = fila[4];
    const e_longitud = fila[5];
    const e_ggdd = fila[6];
    const e_zona = fila[7];
    const e_tmnd = fila[8];
    e_numeros.push(e_numero);
    e_codigos.push(e_codigo);
    e_distritos.push(e_distrito);
    e_estaciones.push(e_estacion);
    e_latitudes.push(e_latitud);
    e_longitudes.push(e_longitud);
    e_ggdds.push(e_ggdd);
    e_zonas.push(e_zona);
    e_tmnds.push(e_tmnd);
  });

  // Acá puedo encontrar cualquier elemento de la lista con el índice de e_numero
  //console.log(e_estaciones[0])

  let codigos_unicos = [];
  let distritos_unicos = [];

  // acá tengo que aprovechar a meter el primer elemento

  for (let i = 0; i < e_codigos.length; i++) {
    if (e_codigos[i] == e_codigos[i - 1]) {} else {
      codigos_unicos.push(parseFloat(e_codigos[i]));
      distritos_unicos.push(e_distritos[i]);
    }
  }
  obtener_localstorage();
  function obtener_localstorage() {
    if (localStorage.getItem("climatologia")) {
      let ok_haydata = JSON.parse(localStorage.getItem("climatologia"));
      for (let i = 0; i < e_numeros.length; i++) {
        if (e_estaciones[i] == ok_haydata.ls_estacion) {
          template = `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`;
          template2 = `<option class="form-control" value="${e_codigos[i]}">${e_distritos[i]}</option>`;
          primer_codigo = e_codigos[i];
          primer_distrito = e_distritos[i];
          primera_estacion = e_estaciones[i];
          primera_tmnd = e_tmnds[i];
          for (let i = 0; i < e_codigos.length; i++) {
            if (e_codigos[i] == primer_codigo && e_estaciones[i] != primera_estacion) {
              template += `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`;
            } else {}
          }
          let conjunto_de_distritos = [];
          let conjunto_de_codigos = [];
          for (let i = 0; i < e_distritos.length; i++) {
            if (e_distritos[i] != e_distritos[i + 1]) {
              conjunto_de_distritos.push(e_distritos[i]);
              conjunto_de_codigos.push(e_codigos[i]);
            } else {}
          }
          for (let i = 0; i < conjunto_de_distritos.length; i++) {
            if (conjunto_de_distritos[i] == primer_distrito) {} else {
              template2 += `<option class="form-control" value="${conjunto_de_codigos[i]}">${conjunto_de_distritos[i]}</option>`;
            }
          }
        } else {}
      }
      $provincia.innerHTML = template;
      $departamento.innerHTML = template2;
    } else {
      for (let i = 0; i < distritos_unicos.length; i++) {
        if (codigos_unicos[i] == ruleta_fija) {
          // lo mando primero a la lista
          primer_distrito = distritos_unicos[i];
          template2 += `<option class="form-control" value="${codigos_unicos[i]}">${distritos_unicos[i]}</option>`;
        } else {
          //
        }
      }
      for (let i = 0; i < distritos_unicos.length; i++) {
        if (codigos_unicos[i] != ruleta_fija) {
          template2 += `<option class="form-control" value="${codigos_unicos[i]}">${distritos_unicos[i]}</option>`;
        } else {
          //
        }
      }
      let conjunto_codigos = [];
      let conjunto_estaciones = [];
      let conjunto_tmnd = [];
      let conjunto_numeros = [];
      for (let i = 0; i < e_numeros.length; i++) {
        if (e_codigos[i] == ruleta_fija) {
          conjunto_codigos.push(e_codigos[i]);
          conjunto_estaciones.push(e_estaciones[i]);
          conjunto_tmnd.push(e_tmnds[i]);
          conjunto_numeros.push(e_numeros[i]);
          //template += `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`
        } else {
          // 
        }
      }
      let dado2;
      dado2 = getRandomNumberBetween(1, conjunto_estaciones.length);
      let primer_numero;
      primer_codigo = conjunto_codigos[dado2 - 1];
      primera_estacion = conjunto_estaciones[dado2 - 1];
      primera_tmnd = conjunto_tmnd[dado2 - 1];
      primer_numero = conjunto_numeros[dado2 - 1];
      template = `<option class="form-control" value="${primer_numero}">${conjunto_estaciones[dado2 - 1]}</option>`;
      for (let i = 0; i < conjunto_estaciones.length; i++) {
        //console.log("probando el for")
        if (conjunto_estaciones[i] != conjunto_estaciones[dado2 - 1]) {
          template += `<option class="form-control" value="${conjunto_numeros[i]}">${conjunto_estaciones[i]}</option>`;
        } else {
          // 
        }
      }
      $provincia.innerHTML = template;
      $departamento.innerHTML = template2;
      guardar_localstorage();
      extractedFunc1();
    }
  }
}

//ESCUCHADOR SELECTOR PROVINCIA
$departamento.addEventListener('change', () => {
  const numero_distrito_elegido = $departamento.value;
  estacionData();
  async function estacionData() {
    let e_numeros = [];
    let e_codigos = [];
    let e_distritos = [];
    let e_estaciones = [];
    let e_latitudes = [];
    let e_longitudes = [];
    let e_ggdds = [];
    let e_zonas = [];
    let e_tmnds = [];
    const response = await fetch('0_estaciones_prueba.csv');
    const data = await response.text();
    const filas = data.split('\n').slice(1);
    filas.forEach(elemento => {
      //acá arranca el loop por el csv, cada fila es elemento

      const fila = elemento.split(',');
      const e_numero = fila[0];
      const e_codigo = fila[1];
      const e_distrito = fila[2];
      const e_estacion = fila[3];
      const e_latitud = fila[4];
      const e_longitud = fila[5];
      const e_ggdd = fila[6];
      const e_zona = fila[7];
      const e_tmnd = fila[8];
      e_numeros.push(e_numero);
      e_codigos.push(e_codigo);
      e_distritos.push(e_distrito);
      e_estaciones.push(e_estacion);
      e_latitudes.push(e_latitud);
      e_longitudes.push(e_longitud);
      e_ggdds.push(e_ggdd);
      e_zonas.push(e_zona);
      e_tmnds.push(e_tmnd);
    });
    let cuenta_codigos_distritos = [];
    let cuenta_nombres_distritos = [];
    for (let i = 0; i < e_codigos.length; i++) {
      if (e_codigos[i] != e_codigos[i + 1]) {
        cuenta_codigos_distritos.push(e_codigos[i]);
        cuenta_nombres_distritos.push(e_distritos[i]);
      }
    }
    for (let i = 0; i < cuenta_codigos_distritos.length; i++) {
      if (cuenta_codigos_distritos[i] == numero_distrito_elegido) {
        primer_codigo = cuenta_codigos_distritos[i];
        primer_distrito = cuenta_nombres_distritos[i];
      }
    }
    let conjunto_estaciones = [];
    for (let i = 0; i < e_estaciones.length; i++) {
      if (e_distritos[i] == primer_distrito) {
        conjunto_estaciones.push(e_estaciones[i]);
      }
    }
    let template;
    let dado3;
    dado3 = getRandomNumberBetween(1, conjunto_estaciones.length);
    primera_estacion = conjunto_estaciones[dado3 - 1];
    for (let i = 0; i < e_numeros.length; i++) {
      if (e_estaciones[i] == primera_estacion) {
        primer_numero = e_numeros[i];
        primer_codigo = e_codigos[i];
        primera_tmnd = e_tmnds[i];
      }
    }
    template = `<option class="form-control" value="${primer_numero}">${primera_estacion}</option>`;
    for (let i = 0; i < e_estaciones.length; i++) {
      if (e_distritos[i] == primer_distrito) {
        if (e_estaciones[i] != primera_estacion) {
          template += `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`;
        }
      }
    }
    $provincia.innerHTML = template;
    guardar_localstorage();
    extractedFunc1();
    window.location.reload();
    //canvas_base()
    //obtener_localstorage()
    //leer_la_tabla()
  }
});

//ESCUCHADOR SELECTOR ESTACIÓN CLIMÁTICA
$provincia.addEventListener('change', () => {
  estacionData();
  async function estacionData() {
    let e_numeros = [];
    let e_codigos = [];
    let e_distritos = [];
    let e_estaciones = [];
    let e_latitudes = [];
    let e_longitudes = [];
    let e_ggdds = [];
    let e_zonas = [];
    let e_tmnds = [];
    const response = await fetch('0_estaciones_prueba.csv');
    const data = await response.text();
    const filas = data.split('\n').slice(1);
    filas.forEach(elemento => {
      //acá arranca el loop por el csv, cada fila es elemento

      const fila = elemento.split(',');
      const e_numero = fila[0];
      const e_codigo = fila[1];
      const e_distrito = fila[2];
      const e_estacion = fila[3];
      const e_latitud = fila[4];
      const e_longitud = fila[5];
      const e_ggdd = fila[6];
      const e_zona = fila[7];
      const e_tmnd = fila[8];
      e_numeros.push(e_numero);
      e_codigos.push(e_codigo);
      e_distritos.push(e_distrito);
      e_estaciones.push(e_estacion);
      e_latitudes.push(e_latitud);
      e_longitudes.push(e_longitud);
      e_ggdds.push(e_ggdd);
      e_zonas.push(e_zona);
      e_tmnds.push(e_tmnd);
    });
    primer_codigo = e_codigos[$provincia.value - 1];
    primer_distrito = e_distritos[$provincia.value - 1];
    primera_estacion = e_estaciones[$provincia.value - 1];
    primera_tmnd = e_tmnds[$provincia.value - 1];
    guardar_localstorage();
    extractedFunc1();
    window.location.reload();
  }
});

/////////////////////////////////////////////////////////////////////////
//////////////         TIPOLOGÍA      //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// conecta al DOM

let $elemento_dom = document.getElementById('elemento_dom');

// ESCUCHADOR PARA CAMBIO DE ELEMENTO (TIPOLOGÍA)
$elemento_dom.addEventListener('change', () => {
  algo2();
  extractedFunc2();
  if ($elemento_dom.value == "valor_muro") {
    localStorage.setItem("Tipo", "Muro");
  }
  if ($elemento_dom.value == "valor_cubierta") {
    localStorage.setItem("Tipo", "Cubierta");
    algo2();
    extractedFunc2();
  }
  if ($elemento_dom.value == "valor_solado") {
    localStorage.setItem("Tipo", "Solado");
    algo2();
    extractedFunc2();
  }
  location.reload();
});

// ALMACENA OPCIÓN DE TIPOLOGÍA
localStorage.setItem("Clave", "Valor");
localStorage.removeItem("Clave", "Valor");
if (localStorage.getItem("Tipo") == null) {
  localStorage.setItem("Tipo", "Muro");
  let selector_tipo = `
  <option class="form-control" value="valor_muro">Muro</option>
  <option class="form-control" value="valor_cubierta">Cubierta</option>
  <option class="form-control" value="valor_solado">Solado</option>
  `;
  $elemento_dom.innerHTML = selector_tipo;
} else if (localStorage.getItem("Tipo") == "Muro") {
  let selector_tipo = `
  <option class="form-control" value="valor_muro">Muro</option>
  <option class="form-control" value="valor_cubierta">Cubierta</option>
  <option class="form-control" value="valor_solado">Solado</option>
  `;
  $elemento_dom.innerHTML = selector_tipo;
} else if (localStorage.getItem("Tipo") == "Cubierta") {
  let selector_tipo = `
  <option class="form-control" value="valor_cubierta">Cubierta</option>
  <option class="form-control" value="valor_muro">Muro</option>
  <option class="form-control" value="valor_solado">Solado</option>
  `;
  $elemento_dom.innerHTML = selector_tipo;
} else if (localStorage.getItem("Tipo") == "Solado") {
  let selector_tipo = `
    <option class="form-control" value="valor_solado">Solado</option>        
    <option class="form-control" value="valor_cubierta">Cubierta</option>
    <option class="form-control" value="valor_muro">Muro</option>          
  `;
  $elemento_dom.innerHTML = selector_tipo;
}

/////////////////////////////////////////////////////////////////////////
//////////////         MATERIALES          //////////////////////////////////
/////////////////////////////////////////////////////////////////////////

let $categoria_dom = document.getElementById('categoria_dom'); // conectando con el selector DOM
let $nombre_dom = document.getElementById('nombre_dom'); // conectando con el selector DOM
let $espesor_dom = document.getElementById('espesor_dom'); // conectado con el input numérico espesor

let $conductividad_dom = document.getElementById('conductividad_dom'); // conectado al dom - NO VISIBLE
let $resistencia_ascendente_dom = document.getElementById('resistencia_ascendente_dom'); //
let $resistencia_descendente_dom = document.getElementById('resistencia_descendente_dom'); //

let $permeabilidad_vapor_dom = document.getElementById('permeabilidad_vapor_dom'); //
let $resistencia_vapor_dom = document.getElementById('resistencia_vapor_dom'); //

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
ctx.save();