function leer_la_tabla() {
  if (indexedDB && form) {
    let db;
    const request = indexedDB.open('listado', 1);
    request.onsuccess = () => {
      db = request.result;
      readData();
    };
    request.onupgradeneeded = () => {
      db = request.result;
      const objectStore = db.createObjectStore('capas', {
        autoIncrement: true
      });
    };
    request.onerror = error => {
      console.log('Error con la indexedDB', error);
    };

    // Esta es la función que entra a leer la base de datos local.
    const readData = () => {
      const transaction = db.transaction(['capas'], 'readonly');
      const objectStore = transaction.objectStore('capas');
      const request = objectStore.openCursor();
      request.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
          cursor.continue();
        } else {
          //console.log("no hay más capas")
        }
      };
    };

    // Este escucha el botón submit que es el simbolo +
    // Acá está agregando data a localStorage con addData(data2)
    // TENGO QUE DECLARAR CADA TIPO DE BOTÓN Y ARMAR UN EVENTLISTENER PARA CADA BOTÓN.

    form.addEventListener('submit', e => {
      e.preventDefault();
      let data2;
      materialData4();
      async function materialData4() {
        data2 = "";
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

        // Esto se está ejecutando cuando apreto el botón "+"

        if (e.target.espesor_dom.value > 0) {
          if ($elemento_dom.value == "valor_muro") {
            // elemento muro con espesor prestablecido

            if (m_resistencias_ascendentes[e.target.nombre_dom.value] == m_resistencias_descendentes[e.target.nombre_dom.value] && Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) > 0) {
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8) / 1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_ascendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };
            } else {
              // esta opción es para elementos de muros que no tienen prestablecido el espesor

              const espesor_de_calculo = Number(parseFloat(e.target.espesor_dom.value).toFixed(8));
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: espesor_de_calculo / 1000,
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(espesor_de_calculo / 1000 / m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };
            }
          } else if ($elemento_dom.value == "valor_cubierta") {
            // caso 1: materiales con valor (>0) en res_asc o valores dif. de ascente != descendente
            if (Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) > 0 || Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) != Number(m_resistencias_descendentes[e.target.nombre_dom.value])) {
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8) / 1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_ascendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };

              // caso 2: materiales con valor 0 en res_ascendente
            } else if (Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) == 0) {
              const espesor_de_calculo = Number(parseFloat(e.target.espesor_dom.value).toFixed(8));
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8) / 1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(e.target.espesor_dom.value / 1000 / m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };
            }
          } else if ($elemento_dom.value == "valor_solado") {
            // caso 1 : materiales con valor (>0) en res_desce y q sean diferentes asce != desce
            // la resistencia toma el valor dado para DESCENDENTE
            if (Number(m_resistencias_descendentes[e.target.nombre_dom.value]) > 0 && Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) != Number(m_resistencias_descendentes[e.target.nombre_dom.value])) {
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8) / 1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_descendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };

              // caso 2: materiales con valor = 0 en resist. descendente
            } else if (Number(m_resistencias_descendentes[e.target.nombre_dom.value]) == 0) {
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8) / 1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(e.target.espesor_dom.value / 1000 / m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };
            } else {
              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8) / 1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_descendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              };
            }
          }
          const addData = data => {
            const transaction = db.transaction(['capas'], 'readwrite');
            const objectStore = transaction.objectStore('capas');
            const request = objectStore.add(data);
          };
          addData(data2);
          window.location.reload();
        } else {
          console.log("esto debería ser un mensaje de error");
        }
      }
    });
  }
}

// la temperatura de diseño interior debería variar según el Nivel A/B/C
const temp_dis_int = 18;

// imprimir la temperatura interior

ctx.font = "14px Calibri";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText(`Temp. int.:${temp_dis_int}º C`, canvas.width / 6, canvas.height / 4.65);
if ($elemento_dom.value == "valor_muro") {
  $res_sup_int_dom.value = .13;
} else if ($elemento_dom.value == "valor_cubierta") {
  $res_sup_int_dom.value = .1;
} else {
  $res_sup_int_dom.value = .17;
}
posleer_la_tabla();