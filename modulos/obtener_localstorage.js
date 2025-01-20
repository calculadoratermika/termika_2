function obtener_localstorage() {
  if (localStorage.getItem("climatologia")) {
    let ok_haydata = JSON.parse(localStorage.getItem("climatologia"));
    ctx.font = "14px Calibri";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Temp. ext.: ${ok_haydata.ls_tmnd}º C`, canvas.width / 2 + canvas.width / 3.1, canvas.height / 3 * 2.4);
    $temp_dis_ext_dom.value = Number(ok_haydata.ls_tmnd);
  } else {}
}

// DESDE ACÁ COPIÉ Y PEGUÉ PSYCHROLIB /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\