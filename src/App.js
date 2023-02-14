import logo from './logo.svg';
import './App.css';
import Demo from "./demo";
import dataApi from "./demo-data/data-api";

console.log("dataApi", dataApi)
let idSeguroAnterior = null;
let idClienteAnterior = null;
let idSubClienteAnterior = null;
let idIndex = null;
let id = 0;
//crear nuevo array con la estructura de dataApi
let dataApiNew = [];

const addSeguro = (item, idLocal, parentId, idSeguroAnteriorParam) => {
    console.log(item)
  if(idSeguroAnteriorParam !== item.idSeguro){
    let data = {
      idSeguro: item.idSeguro,
      idCliente: item.idCliente,
      idSubCliente: item.idSubCliente,
      parentId: null,//null
      id: idLocal
    }
    idSeguroAnterior = item.idSeguro;
    idClienteAnterior = null;
    idSubClienteAnterior = null;
    id++;
    dataApiNew.push(data);
    return id-1;
  }
  return parentId;
}

const addCliente = (item, idLocal, parentId, idClienteAnteriorParam) => {
  if(idClienteAnteriorParam !== item.idCliente){
    let data = {
      idSeguro: item.idSeguro,
      idCliente: item.idCliente,
      idSubCliente: item.idSubCliente,
      parentId: parentId,
      id: idLocal
    }
    idClienteAnterior = item.idCliente;
    id++;
    dataApiNew.push(data);
    return id-1;
  }
  return parentId;
}

const addSubCliente = (item, idLocal, parentId, idSubClienteAnteriorParam) => {
  if(idSubClienteAnteriorParam !== item.idSubCliente){
    let data = {
      idSeguro: item.idSeguro,
      idCliente: item.idCliente,
      idSubCliente: item.idSubCliente,
      parentId: parentId,
      id: idLocal
    }
    idSubClienteAnterior = item.idSubCliente;
    dataApiNew.push(data);
    
    //recorrer el array de alertasFallasYExcesos y agregarlos a dataApiNew
    item.alertasFallasYExcesos.forEach((itemAlerta) => {
      id++;
      addAlerta(item, itemAlerta, id, idLocal);
    });
  }
  return id;
}

const addAlerta = (item, itemAlerta, idLocal, parentId) => {
  let data = {
    idSeguro: item.idSeguro,
    idCliente: item.idCliente,
    idSubCliente: item.idSubCliente,
    parentId: parentId,
    id: idLocal
  }
  dataApiNew.push(data);
}




dataApi.forEach((item) => {
  //recorrer las columnas del array dataApi
  for (const [key, value] of Object.entries(item)) {
    //si la columna es idSeguro
    if(key === "idSeguro"){
      //agregar a dataApiNew un objeto para seguro, otro para cliente y otro para subcliente
      idIndex = addSeguro(item, id, idIndex, idSeguroAnterior);
      console.log("idSeguroAnterior", idSeguroAnterior)
    }
    //si la columna es idCliente
    if(key === "idCliente"){
      //agregar a dataApiNew un objeto para cliente y otro para subcliente
      idIndex = addCliente(item, id, idIndex, idClienteAnterior);
    }
    //si la columna es idSubCliente
    if(key === "idSubCliente"){
      //agregar a dataApiNew un objeto para subcliente
      id = addSubCliente(item, id, idIndex, idSubClienteAnterior);
      id++;
      idSubClienteAnterior = value;
    }
    
  }
});


console.log("dataApiNew", dataApiNew)

function App() {
  return (
    <Demo />
  );
}

export default App;

