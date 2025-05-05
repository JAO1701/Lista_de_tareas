// Obtener la referencia a la lista de tareas
var taskList = document.getElementById('task-list');

// Obtener referencia al input de horario específico
var specificTimeInput = document.getElementById('specific-time-input');

// Cargar las tareas almacenadas en el Local Storage al cargar la página
window.addEventListener('load', function() {
  loadTasksFromLocalStorage();
});

// Agregar evento al formulario para agregar tareas
document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener los valores de los campos del formulario
  var taskInput = document.getElementById('task-input').value;
  var dateInput = document.getElementById('date-input').value;
  var periodInput = document.getElementById('period-input').value;
  var specificTime = specificTimeInput.value;

  // Crear un objeto tarea con los valores
  var task = {
    task: taskInput,
    date: dateInput,
    period: periodInput,
    specificTime: specificTime,
  };

  // Agregar la tarea a la lista
  addTaskToList(task);

  // Limpiar los campos del formulario
  document.getElementById('task-input').value = '';
  document.getElementById('date-input').value = '';
  document.getElementById('period-input').value = 'morning';
  specificTimeInput.value = '';

  // Guardar la tarea en el Local Storage
  saveTaskToLocalStorage(task);
});

// Agregar una tarea a la lista
function addTaskToList(task) {
  var taskItem = document.createElement('li');
  var taskText = document.createElement('span');
  var separator1 = document.createElement('span');
  var dateText = document.createElement('span');
  var separator2 = document.createElement('span');
  var periodText = document.createElement('span');
  var separator3 = document.createElement('span');
  var deleteBtn = document.createElement('button');

  taskText.classList.add('task');
  separator1.classList.add('separator');
  dateText.classList.add('date');
  separator2.classList.add('separator');
  periodText.classList.add('period');
  separator3.classList.add('separator');
  deleteBtn.classList.add('delete-btn');

  taskText.textContent = task.task;
  dateText.textContent = formatDate(task.date);
  deleteBtn.textContent = 'Eliminar';

  // Agregar evento al botón de eliminar
  deleteBtn.addEventListener('click', function() {
    // Eliminar la tarea de la lista
    taskItem.remove();

    // Eliminar la tarea del Local Storage
    deleteTaskFromLocalStorage(task);
  });

  // Agregar los elementos a la tarea
  taskItem.appendChild(taskText);
  taskItem.appendChild(separator1);
  taskItem.appendChild(dateText);
  taskItem.appendChild(separator2);

  if (task.period === 'specific') {
    var timeText = document.createElement('span');
    timeText.classList.add('time');
    timeText.textContent = `a las: ${task.specificTime}`;
    taskItem.appendChild(separator3);
    taskItem.appendChild(timeText);
  } else {
    periodText.textContent = formatPeriod(task.period);
    taskItem.appendChild(separator3);
    taskItem.appendChild(periodText);
  }

  taskItem.appendChild(separator3);
  taskItem.appendChild(deleteBtn);

  // Agregar la tarea a la lista de tareas
  taskList.appendChild(taskItem);
}

// Habilitar/deshabilitar el input de horario específico
document.getElementById('period-input').addEventListener('change', function() {
  specificTimeInput.disabled = (this.value !== 'specific');
  specificTimeInput.style.display = (this.value === 'specific') ? 'block' : 'none';
});

function formatDate(date) {
  if (!date) return ''; // Agregar una validación para evitar errores si 'date' es undefined
  const parts = date.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}/${year}`;
}

// Función para formatear el período del día en español
function formatPeriod(period) {
  switch (period) {
    case 'morning':
      return 'Mañana';
    case 'afternoon':
      return 'Tarde';
    case 'evening':
      return 'Noche';
    default:
      return '';
  }
}

// Cargar las tareas almacenadas en el Local Storage
function loadTasksFromLocalStorage() {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log('Cargando tareas desde Local Storage:', tasks);
  tasks.forEach(function(task) {
    addTaskToList(task);
  });
}
// Guardar una tarea en el Local Storage
function saveTaskToLocalStorage(task) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('Guardando tarea en Local Storage:', tasks);
}

// Eliminar una tarea del Local Storage
function deleteTaskFromLocalStorage(task) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var updatedTasks = tasks.filter(function(t) {
    return t.task !== task.task || t.date !== task.date || t.period !== task.period || t.specificTime !== task.specificTime;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  console.log('Eliminando tarea de Local Storage:', updatedTasks);
}


// Función para obtener la fecha y hora actual y mostrarla en el widget
function updateClock() {
  var now = new Date();
  var clockElement = document.getElementById('clock');
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = now.toLocaleDateString('es-ES', options);
  // Capitalizar la primera letra del día
  formattedDate = formattedDate.replace(/^\w/, c => c.toUpperCase());
  // Capitalizar la primera letra del mes
  formattedDate = formattedDate.replace(/\b\w{4,}\b/g, c => c.charAt(0).toUpperCase() + c.slice(1));
  formattedDate += ' - ' + now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2) + ' Hs.';
  clockElement.textContent = formattedDate;
}

// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);

// Llamar a la función para mostrar la hora por primera vez
updateClock();


// Obtener la fecha actual
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
var yyyy = today.getFullYear();

// Formatear la fecha actual en el formato necesario para el campo de fecha
var minDate = yyyy + '-' + mm + '-' + dd;

// Obtener referencia al campo de fecha
var dateInput = document.getElementById('date-input');

// Establecer la fecha mínima como el valor del atributo min del campo de fecha
dateInput.setAttribute('min', minDate);



var playlist = [
  { name: 'BACK IN BLACK - Ac Dc', src: 'Music/BACK IN BLACK - Ac Dc.mp3' },
  { name: 'BURN IT DOWN - Linkin Park', src: 'Music/BURN IT DOWN - Linkin Park.mp3' },
  { name: 'CASTLE OF GLASS - Linkin Park', src: 'Music/CASTLE OF GLASS - Linkin Park.mp3' },
  { name: 'LOSE YOURSELF - Eminem', src: 'Music/Eminem - Lose Yourself.mp3' },
  { name: 'IN THE END - Linkin Park', src: 'Music/In The End - Linkin Park.mp3' },
  { name: 'NEW DIVIDE - Linkin Park', src: 'Music/New Divide - Linkin Park.mp3' },
  { name: 'NUMB - Linkin Park', src: 'Music/Numb - Linkin Park.mp3' },
  { name: 'WHAT I DONE - Linkin Park', src: 'Music/WHAT I DONE - Linkin Park.mp3' },
  { name: 'HEROES - Zayde Wolf', src: 'Music/ZAYDE WOLF - HEROES.mp3' },
  // Agrega las rutas de acceso a los demás archivos MP3
];

var currentSongIndex = 0;
var audioPlayer = new Audio();

function playSong(index) {
  var song = playlist[index];
  audioPlayer.src = song.src;
  audioPlayer.play();
}

function play() {
  var song = playlist[currentSongIndex];
  audioPlayer.src = song.src;
  audioPlayer.play();
  document.getElementById("SongName").textContent = song.name;
  updateSongName();
}

function pause() {
  audioPlayer.pause();
  document.getElementById("SongName").textContent = playlist[currentSongIndex].name;
  updateSongName();
}

function next() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
  document.getElementById("SongName").textContent = playlist[currentSongIndex].name;
  updateSongName();
}

function prev() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  playSong(currentSongIndex);
  document.getElementById("SongName").textContent = playlist[currentSongIndex].name;
  updateSongName();
}

function updateSongName() {
  var currentSong = playlist[currentSongIndex];
  document.getElementById("SongName").textContent = currentSong.name;
}
