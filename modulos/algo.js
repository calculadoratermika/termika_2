function algo() {
  console.log("click en vaciar");
  let db;
  const request = indexedDB.open('listado', 1);
  request.onsuccess = () => {
    db = request.result;
    clearData();
  };
  extractedFunc0();
  window.location.reload();
}
$btnempty.addEventListener('click', () => {
  algo();
});
console.log("admitancia");
console.log("espesor, conductividad, densidad y capacidad calorífica");