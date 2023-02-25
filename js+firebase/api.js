const firebaseConfig = {
  apiKey: "AIzaSyCA2t0wA4Ugj4t9-YQVL0DGyta0-c_e39Q",
  authDomain: "appsmoviles-7981f.firebaseapp.com",
  databaseURL: "https://appsmoviles-7981f-default-rtdb.firebaseio.com",
  projectId: "appsmoviles-7981f",
  storageBucket: "appsmoviles-7981f.appspot.com",
  messagingSenderId: "389288882280",
  appId: "1:389288882280:web:5cc1b89f769d36be548bdd",
  measurementId: "G-JM3YLM5PJP"
};

firebase.initializeApp(firebaseConfig);

function resetFields(){
  document.getElementById("Input1").value='';
  document.getElementById("Input2").value='';
  document.getElementById("Input3").value='selecciona';
  document.getElementById("Input4").value='';
  document.getElementById("Input5").value='';

}
function createR() {
  document.getElementById("Input1").disabled = false;
  var codigo = document.getElementById("Input1").value;
  var nombre = document.getElementById("Input2").value;
  var categoria= document.getElementById("Input3").value;
  var descripcion = document.getElementById("Input4").value;
  var imagen = document.getElementById("Input5").value;


  if (codigo.length > 0) {
      var producto = {
          codigo, 
          nombre,
          categoria,
          descripcion,
          imagen,
      }

      firebase.database().ref('Productos/' + codigo).update(producto).then(() => {
         resetFields();
      }).then(()=>{
         read();
      });

      swal("Listo!", "Agregado correctamente", "success");

      
  } 
  else {
      swal("Error", "Llena todos los campos","warning");
  }

  document.getElementById("Input1").disabled = false;
}

function read(){
  document.getElementById("Table1").innerHTML='';

  var ref = firebase.database().ref('Productos');
 
  ref.on("child_added", function(snapshot) {
      printRow(snapshot.val());
  });

}

function printRow(producto){
  
  if(producto!=null){
      var table = document.getElementById("Table1"); 

      var row = table.insertRow(-1);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.innerHTML = producto.codigo;
      cell2.innerHTML = producto.nombre; 
      cell3.innerHTML = producto.categoria;
      cell4.innerHTML = producto.descripcion; 
      cell5.innerHTML = producto.imagen; 
      cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${producto.codigo})">Eliminar</button>`;
      cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+producto.codigo+')">Modificar</button>';
  }
}

function deleteR(codigo){
  firebase.database().ref('Productos/' + codigo).set(null).then(() => {
    read();
  }).then(()=>{
     swal("Listo!", "Eliminado correctamente", "success");
  });
}

function seekR(codigo){
  var ref = firebase.database().ref('Productos/' + codigo);
  ref.on('value', function(snapshot) {
    updateR(snapshot.val());
  });
}

function updateR(producto){
  if(producto!=null)
  {
      document.getElementById("Input1").value=producto.codigo;
      document.getElementById("Input1").disabled = true;
      document.getElementById("Input2").value=producto.nombre;
      document.getElementById("Input3").value=producto.categoria;
      document.getElementById("Input4").value=producto.descripcion;
      document.getElementById("Input5").value=producto.imagen;

  }
}

function readQ(){
  document.getElementById("Table2").innerHTML='';
  var c = document.getElementById("B1").value;

  var ref = firebase.database().ref("Productos");
  ref.orderByChild("nombre").equalTo(c).on("child_added", function(snapshot) {
      printRowQ(snapshot.val());
  });

}


function printRowQ(producto){

  var table = document.getElementById("Table2"); 
  
  var row = table.insertRow(-1);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  
  cell1.innerHTML = producto.codigo;
  cell2.innerHTML = producto.nombre; 
  cell3.innerHTML = producto.categoria;
  cell4.innerHTML = producto.descripcion; 
 
}

/*imagen*/ 
