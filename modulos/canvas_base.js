function canvas_base() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
let selector_nombre = '';
materialData1();
async function materialData1() {
  // tengo que declarar las variables con "let m_columna = []" por cada columna csv

  let m_ides = [];
  let m_tipos = [];
  let m_categorias = [];
  let m_categorias_enes = [];
  let m_nombres = [];
  let m_densidades = [];
  let m_conductividades = [];
  let m_capacidades_termicas = [];
  let m_espesores = [];
  let m_resistencias_ascendentes = [];
  let m_resistencias_descendentes = [];
  let m_permeancias = [];
  let m_permeabilidades = [];
  let m_contenidos_energeticos = [];
  let m_emisiones = [];
  const response = await fetch('materiales.csv');
  const data = await response.text();
  let selector_categoria = '';
  const filas = data.split('\n').slice(1);
  filas.forEach(elemento => {
    const fila = elemento.split(',');
    const m_id = fila[0];
    const m_tipo = fila[1];
    const m_categoria = fila[2];
    const m_categoria_n = fila[3];
    const m_nombre = fila[4];
    const m_densidad = fila[5];
    const m_conductividad = fila[6];
    const m_capacidad_termica = fila[7];
    const m_espesor = fila[8];
    const m_resistencia_ascendente = fila[9];
    const m_resistencia_descendente = fila[10];
    const m_permeancia = fila[11];
    const m_permeabilidad = fila[12];
    const m_contenido_energetico = fila[13];
    const m_emision = fila[14];
    m_ides.push(m_id);
    m_tipos.push(m_tipo);
    m_categorias.push(m_categoria);
    m_categorias_enes.push(m_categoria_n);
    m_nombres.push(m_nombre);
    m_densidades.push(m_densidad);
    m_conductividades.push(m_conductividad);
    m_capacidades_termicas.push(m_capacidad_termica);
    m_espesores.push(m_espesor);
    m_resistencias_ascendentes.push(m_resistencia_ascendente);
    m_resistencias_descendentes.push(m_resistencia_descendente);
    m_permeancias.push(m_permeancia);
    m_permeabilidades.push(m_permeabilidad);
    m_contenidos_energeticos.push(m_contenido_energetico);
    m_emisiones.push(m_emision);
  });
  let m_catego_ok = [];
  for (let i = 0; i < m_categorias.length; i++) {
    if ($elemento_dom.value == "valor_muro") {
      if (m_tipos[i] != "horizontales") {
        if (m_categorias[i] != m_categorias[i - 1]) {
          selector_categoria += `<option class="form-control" value="${m_categorias[i]}">${m_categorias[i]}</option>`;
          m_catego_ok.push(m_categorias_enes[i]);
        }
      }
    } else if ($elemento_dom.value == "valor_cubierta") {
      if (m_tipos[i] != "camaras") {
        if (m_categorias[i] != m_categorias[i - 1]) {
          selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`;
          m_catego_ok.push(m_categorias_enes[i]);
        }
      }
    } else if ($elemento_dom.value == "valor_solado") {
      if (m_tipos[i] != "heterogeneos" && m_categorias_enes[i] && m_tipos[i] != "camaras") {
        if (m_categorias[i] != m_categorias[i - 1]) {
          selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`;
          m_catego_ok.push(m_categorias_enes[i]);
        }
      }
    }
  }
  $categoria_dom.innerHTML = selector_categoria;

  // acá tengo que agregar el llenado del selector de nombre que es para el caso primer categoria
  for (let i = 0; i < m_nombres.length; i++) {
    if (m_categorias_enes[0] == m_categorias_enes[i]) {
      selector_nombre += `<option class="form-control" value="${m_catego_ok[i]}">${m_nombres[i]}</option>`;
    }
  }
  $nombre_dom.innerHTML = selector_nombre;
  // hasta acá llenado selector de nombre para el caso primer categoria

  for (let i = 0; i < m_nombres.length; i++) {
    if (m_espesores[i] > 0 && $nombre_dom.value == m_ides[i]) {
      // buscar el input del espesor
      $espesor_dom.value = Number(m_espesores[i]);
      document.getElementById("espesor_dom").disabled = true;
    } else if (m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]) {
      $espesor_dom.value = 0;
      document.getElementById("espesor_dom").disabled = false;
    }
  }
}

///////////////////
/////////////////
///////////////////

// ESCUCHADOR PARA CAMBIO DE CATEGORIA
$categoria_dom.addEventListener('change', () => {
  selector_nombre = "";
  materialData2();
  async function materialData2() {
    let m_ides = [];
    let m_tipos = [];
    let m_categorias = [];
    let m_categorias_enes = [];
    let m_nombres = [];
    let m_densidades = [];
    let m_conductividades = [];
    let m_capacidades_termicas = [];
    let m_espesores = [];
    let m_resistencias_ascendentes = [];
    let m_resistencias_descendentes = [];
    let m_permeancias = [];
    let m_permeabilidades = [];
    let m_contenidos_energeticos = [];
    let m_emisiones = [];
    const response = await fetch('materiales.csv');
    const data = await response.text();
    const filas = data.split('\n').slice(1);
    filas.forEach(elemento => {
      const fila = elemento.split(',');
      const m_id = fila[0];
      const m_tipo = fila[1];
      const m_categoria = fila[2];
      const m_categoria_n = fila[3];
      const m_nombre = fila[4];
      const m_densidad = fila[5];
      const m_conductividad = fila[6];
      const m_capacidad_termica = fila[7];
      const m_espesor = fila[8];
      const m_resistencia_ascendente = fila[9];
      const m_resistencia_descendente = fila[10];
      const m_permeancia = fila[11];
      const m_permeabilidad = fila[12];
      const m_contenido_energetico = fila[13];
      const m_emision = fila[14];
      m_ides.push(m_id);
      m_tipos.push(m_tipo);
      m_categorias.push(m_categoria);
      m_categorias_enes.push(m_categoria_n);
      m_nombres.push(m_nombre);
      m_densidades.push(m_densidad);
      m_conductividades.push(m_conductividad);
      m_capacidades_termicas.push(m_capacidad_termica);
      m_espesores.push(m_espesor);
      m_resistencias_ascendentes.push(m_resistencia_ascendente);
      m_resistencias_descendentes.push(m_resistencia_descendente);
      m_permeancias.push(m_permeancia);
      m_permeabilidades.push(m_permeabilidad);
      m_contenidos_energeticos.push(m_contenido_energetico);
      m_emisiones.push(m_emision);
    });
    let selector_categoria = "";
    let m_catego_ok = [];
    for (let i = 0; i < m_categorias.length; i++) {
      if ($elemento_dom.value == "valor_muro") {
        if (m_tipos[i] != "horizontales") {
          if (m_categorias[i] != m_categorias[i - 1]) {
            selector_categoria += `<option class="form-control" value="${m_categorias[i]}">${m_categorias[i]}</option>`;
            m_catego_ok.push(m_categorias_enes[i]);
            console.log(m_categorias[i]);
          }
        }
      } else if ($elemento_dom.value == "valor_cubierta") {
        if (m_tipos[i] != "camaras") {
          if (m_categorias[i] != m_categorias[i - 1]) {
            selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`;
            m_catego_ok.push(m_categorias_enes[i]);
          }
        }
      } else if ($elemento_dom.value == "valor_solado") {
        if (m_tipos[i] != "heterogeneos" && m_categorias_enes[i]) {
          if (m_categorias[i] != m_categorias[i - 1]) {
            selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`;
            m_catego_ok.push(m_categorias_enes[i]);
          }
        }
      }
    }
    let selector_nombre = "";

    //acá tengo que agregar el llenado del selector de nombre 
    for (let i = 0; i < m_nombres.length; i++) {
      if ($categoria_dom.value == m_categorias[i]) {
        selector_nombre += `<option class="form-control" value="${m_ides[i]}">${m_nombres[i]}</option>`;
      }
    }
    $nombre_dom.innerHTML = selector_nombre;
    for (let i = 0; i < m_nombres.length; i++) {
      if (m_espesores[i] > 0 && $nombre_dom.value == m_ides[i]) {
        // buscar el input del espesor
        $espesor_dom.value = Number(m_espesores[i]);
        document.getElementById("espesor_dom").disabled = true;
      } else if (m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]) {
        $espesor_dom.value = 0;
        document.getElementById("espesor_dom").disabled = false;
      }
    }
    for (let i = 0; i < m_nombres.length; i++) {
      if (m_espesores[i] > 0 && $nombre_dom.value == m_ides[i]) {
        // buscar el input del espesor
        $espesor_dom.value = Number(m_espesores[i]);
        document.getElementById("espesor_dom").disabled = true;
      } else if (m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]) {
        $espesor_dom.value = 0;
        document.getElementById("espesor_dom").disabled = false;
      }
    }
  }
});

//ESCUCHADOR PARA CAMBIO DE NOMBRE DE MATERIAL
$nombre_dom.addEventListener('change', () => {
  materialData3();
  async function materialData3() {
    let m_ides = [];
    let m_tipos = [];
    let m_categorias = [];
    let m_categorias_enes = [];
    let m_nombres = [];
    let m_densidades = [];
    let m_conductividades = [];
    let m_capacidades_termicas = [];
    let m_espesores = [];
    let m_resistencias_ascendentes = [];
    let m_resistencias_descendentes = [];
    let m_permeancias = [];
    let m_permeabilidades = [];
    let m_contenidos_energeticos = [];
    let m_emisiones = [];
    const response = await fetch('materiales.csv');
    const data = await response.text();
    const filas = data.split('\n').slice(1);
    filas.forEach(elemento => {
      const fila = elemento.split(',');
      const m_id = fila[0];
      const m_tipo = fila[1];
      const m_categoria = fila[2];
      const m_categoria_n = fila[3];
      const m_nombre = fila[4];
      const m_densidad = fila[5];
      const m_conductividad = fila[6];
      const m_capacidad_termica = fila[7];
      const m_espesor = fila[8];
      const m_resistencia_ascendente = fila[9];
      const m_resistencia_descendente = fila[10];
      const m_permeancia = fila[11];
      const m_permeabilidad = fila[12];
      const m_contenido_energetico = fila[13];
      const m_emision = fila[14];
      m_ides.push(m_id);
      m_tipos.push(m_tipo);
      m_categorias.push(m_categoria);
      m_categorias_enes.push(m_categoria_n);
      m_nombres.push(m_nombre);
      m_densidades.push(m_densidad);
      m_conductividades.push(m_conductividad);
      m_capacidades_termicas.push(m_capacidad_termica);
      m_espesores.push(m_espesor);
      m_resistencias_ascendentes.push(m_resistencia_ascendente);
      m_resistencias_descendentes.push(m_resistencia_descendente);
      m_permeancias.push(m_permeancia);
      m_permeabilidades.push(m_permeabilidad);
      m_contenidos_energeticos.push(m_contenido_energetico);
      m_emisiones.push(m_emision);
    });
    for (let i = 0; i < m_nombres.length; i++) {
      if (m_espesores[i] > 0 && $nombre_dom.value == m_ides[i]) {
        // buscar el input del espesor
        $espesor_dom.value = Number(m_espesores[i]);
        document.getElementById("espesor_dom").disabled = true;
      } else if (m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]) {
        $espesor_dom.value = 0;
        document.getElementById("espesor_dom").disabled = false;
      }
    }
  }
});

////////////////////////////////////////
///////////////   CAPAS ///////////////
////////////////////////////////////////

// Establecer variables de acuerdo a listado iram

// ID - Número (Invisible)

// Nombre - Texto @materiales
// Espesor - Número (m) @materiales
// Lambda - Número (W/m2.K) @materiales

// Resistencia horizontal u ascendente - Número (m2.K/W) @materiales
// Resistencia descendente - Número (m2.K/W) @materiales

// Resistencia de uso - Número (m2.K/W) @elección condicional

// transmitancia térmica - Número (W/m2.K) @cálculo simple

// Temperatura - Número (ºC) @cálculo simple

// VAPOR
// Permeancia al vapor de agua - Número (g/m2.h.kPa) @materiales
// Permeabilidad al vapor de agua - Número (g/m.h.kPa) @materiales

// Resistencia al paso del vapor de agua - Número (m2.h.kPa/g) @cálculo simple o uso

// Humedad relativa - Fracción (%) @cálculo
// Presión de vapor por capa - Número (kPa) @cálculo
// Temperatura de rocío - Número (ºC) | @tabla o calculadora psicrométrica

// Delta temperatura - Número (ºC) | @cálculo

///////////////////////////////////////////////////////////////////////////////////////////

let $valor_k = document.getElementById('valor_k');
let $temp_dis_ext_dom = document.getElementById('temp_dis_ext_dom'); // conectado al dom - NO VISIBLE
let $res_sup_int_dom = document.getElementById('res_sup_int_dom'); // conectado al dom - NO VISIBLE

obtener_localstorage();