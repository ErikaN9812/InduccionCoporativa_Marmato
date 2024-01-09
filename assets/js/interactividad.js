$(document).ready(function () {

  //TRACKING
  $("#actividad_1").on("click", function() {
    trackingManager.startTracking("actividad_1");
    trackingManager.stopTracking("actividad_1");
  });

  $("#actividad_2").on("click", function() {
      trackingManager.startTracking("actividad_2");
      trackingManager.stopTracking("actividad_2");
  });

  $("#actividad_3").on({
    play:function(){
      trackingManager.startTracking("actividad_3");
      trackingManager.stopTracking("actividad_3");
    }
  });

  $("#actividad_4").on({
    play:function(){
      trackingManager.startTracking("actividad_4");
      trackingManager.stopTracking("actividad_4");
    }
  });

  $("#actividad_5").on({
    play:function(){
      trackingManager.startTracking("actividad_5");
      trackingManager.stopTracking("actividad_5");
    }
  });

  $("#actividad_6").on({
    play:function(){
      trackingManager.startTracking("actividad_6");
      trackingManager.stopTracking("actividad_6");
    }
  });

  $("#actividad_7").on({
    play:function(){
      trackingManager.startTracking("actividad_7");
      trackingManager.stopTracking("actividad_7");
    }
  });

  $("#actividad_8").on({
    play:function(){
      trackingManager.startTracking("actividad_8");
      trackingManager.stopTracking("actividad_8");
    }
  });

  $("#actividad_9").on({
    play:function(){
      trackingManager.startTracking("actividad_9");
      trackingManager.stopTracking("actividad_9");
    }
  });

  $("#llamada-correcta").on({
    play:function(){
      trackingManager.startTracking("llamada-correcta");
      trackingManager.stopTracking("llamada-correcta");
    }
  });

  $("#grupo_whatsapp").on("click", function() {
    trackingManager.startTracking("grupo_whatsapp");
    trackingManager.stopTracking("grupo_whatsapp");
  });

  
  // Comportamiento de acordeón en dispositivos móviles
  $(".accordion-label").click(function () {
    $(this).siblings(".accordion-content").slideToggle();
  });

  setTimeout(() => {
    $(".actVorF .tol").html($(".itemQ").length);
  }, "2000");

  $("#drop1, #drop2, #drop3, #drop4, #drop5, #drop6").on("droppable:drop",
    function (e) {
      $(this).addClass("corret");
      actualizarProgreso(); // Llama a la función para actualizar el progreso
    }
  );

  $("#grupo_whatsapp").click(function () {
    window.open('https://chat.whatsapp.com/G91Vr9cBLlwAWaXGmS1cB9','_blank');
  });

  arrastrarElemento();
  actualizarGrafico();
  actualizarGrafico2();
  listaLlamadaCorrecta();
  listaLlamadaIncorrecta();
  pausarMultimedia();
  reproducirAudioImagen();

  var selects = document.querySelectorAll('.select-opcion');

  // Itera sobre cada select y agrega un evento de cambio
  selects.forEach(function(select) {
      select.addEventListener('change', function() {
          // Obtén el valor y la imagen asociada de la opción seleccionada
          var selectedValue = select.value;
          var selectedImage = select.options[select.selectedIndex].getAttribute('data-image');

          // Obtén la imagen dentro del div padre del select actual
          var image = select.closest('.actividad_slide_14').querySelector('.img-estructura');

          // Cambia la fuente de la imagen según la opción seleccionada
          image.src = 'assets/img/' + (selectedImage);
      });
  });

  
  var logoImage = document.getElementById("logoImage");
  function checkScreenWidth() {
      var newImageSrc = window.innerWidth <= 768 ? "assets/img/logo_slide_05_movil.png" : "assets/img/logoW.png";
      logoImage.src = newImageSrc;
  }
  window.onload = checkScreenWidth;
  window.addEventListener("resize", checkScreenWidth);

  //Actualizar el progreso del curso cada vez que se avanza en los slides
  $("#next").on('click', function() {
    updateProgress();
  });

});

function updateProgress(){
  let code_course = $('#course_code').val();
  let module_id = $('#module_id').val(); 
  $.ajax({
      type: "POST",
      url: "../../../functions_helpers.php?progress_courses",
      dataType: "json",
      data:
      {
          code_course: code_course,
          module_id: module_id
      },
      success: function(result)
      {
          let courseProgress = result.course_progress;

          if (courseProgress === null || courseProgress === undefined) {
              $('#course-progress').html('<strong>0.0%</strong>');
          }else{
              $('#course-progress').html('<strong>' + courseProgress + '%</strong>');
          }
      }
  });
}

function reproducirAudioImagen(){
  var audioActual = null;
  let rutaActual = '';
  var elementosInline = document.querySelectorAll('.inline');

  elementosInline.forEach(function (elemento) {
      elemento.addEventListener('click', function () {

          let rutaAudio = elemento.getAttribute('data-audio');

          if (audioActual !== null) {
              audioActual.pause();
          }

          let nuevoAudio = new Audio(rutaAudio);
          
          if (rutaAudio === rutaActual) {
            nuevoAudio.pause();
          } else {
              nuevoAudio.play();
              audioActual = nuevoAudio;
              rutaActual = rutaAudio;
          }

          $("#prev, #next").on("click", function () {
            nuevoAudio.pause();
          });

      });
  });
}

// let cont;
// let video_slide_14 = document.getElementById("slide_14_actividad");

// video_slide_14.ontimeupdate = function () {
//   slide_14_actividad();
// };

// function slide_14_actividad() {
//   if (cont !== parseInt(video_slide_14.currentTime)) {
//     switch (parseInt(video_slide_14.currentTime)) {
//       case 7:
//         action();
//         $(".slide_14 .ctItem01").show();
//         break;
//       case 15:
//         action();
//         $(".slide_14 .ctItem02").show();
//         break;
//       case 25:
//         action();
//         $(".slide_14 .ctItem03").show();
//         break;
//     }
//     cont = parseInt(video_slide_14.currentTime);
//   }
// }

var result;
var elemt;
function actividad_slide_14(el, e) {
  result = e;
  elemt = el;
  $(".slide_14 .ctItem > div p").removeClass();
  $(el).addClass("act");
}
function valid() {
  $(".slide_14 .ctItem > div p").removeClass();
  if (result) {
    $(".slide_14 .ctItem .inst").html("Respuesta correcta");
    $(".slide_14 .ctItem .inst").show();
    $(".slide_14 .ctItem button").hide();
    $(".record").show();
    $(elemt).addClass("true");
    video_slide_14.play(6);

  } else {
    $(".slide_14 .ctItem .inst").html("Respuesta incorrecta");
    $(".slide_14 .ctItem .inst").show();
    $(elemt).addClass("false");
  }
}
function action() {
  $(".slide_14 .ctItem").hide();
  $(".slide_14 .ctItem button").show();
  $(".slide_14 .ctItem .inst").hide();
  $(".record").hide();
  video_slide_14.pause();
}

function pausarMultimedia() {
  var allMediaElements = document.querySelectorAll("audio, video");

  allMediaElements.forEach(function (mediaElement) {
    mediaElement.addEventListener("play", function () {
      allMediaElements.forEach(function (otherMediaElement) {
        if (otherMediaElement !== mediaElement && !otherMediaElement.paused) {
          otherMediaElement.pause();
        }
      });
    });
  });

  //Funcionalidad que permite pausar los elementos multimedias que se este reproduciendo
  $("#prev, #next").on("click", function () {
    let allMediaElements = $("audio, video");
    // Pausar cada elemento multimedia
    allMediaElements.each(function () {
      if (!this.paused) {
        this.pause();
      }
    });
  });
}

function listaLlamadaIncorrecta() {
  let incorrect = document.getElementById("llamada-incorrecta");
  let listItems = document.querySelectorAll(".custom-list-incorrect li");

  let selectedLi = null;

  function clickli(event) {
    const selectedIndex = Array.from(listItems).indexOf(event.currentTarget);

    const existingIcon = event.currentTarget.querySelector(".fa");
    const existingBadge = event.currentTarget.querySelector(".badge");

    if (existingIcon) {
      event.currentTarget.removeChild(existingIcon);
    }
    if (existingBadge) {
      event.currentTarget.removeChild(existingBadge);
    }

    if (selectedIndex === 0 || selectedIndex === 2) {
      // event.currentTarget.classList.add("active");
      // event.currentTarget.style.backgroundColor = "#89cf89";
      const checkIcon = document.createElement("i");
      checkIcon.className = "fa fa-check";
      checkIcon.style.color = "#009200";
      checkIcon.setAttribute("aria-hidden", "true");
      event.currentTarget.insertBefore(
        checkIcon,
        event.currentTarget.firstChild
      );
    } else {
      // event.currentTarget.classList.add("desactive");
      // event.currentTarget.style.backgroundColor = "#db8a8a";
      const checkIcon = document.createElement("i");
      checkIcon.className = "fa fa-question";
      checkIcon.style.color = "#df2828";
      checkIcon.setAttribute("aria-hidden", "true");
      event.currentTarget.insertBefore(
        checkIcon,
        event.currentTarget.firstChild
      );
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.innerText = "Faltante";
      badge.style.backgroundColor = "#EF455F";
      badge.style.borderRadius = "9px";
      badge.style.padding = "6px";
      badge.style.margin = "6px";
      event.currentTarget.appendChild(badge);
    }

    selectedLi = selectedIndex;
  }

  incorrect.addEventListener("play", function () {
    textoIncorrecto = $("#textoIncorrecto");
    textoIncorrecto.css("display", "block");
    listItems.forEach((item, index) => {
      item.style.display = "block";
      item.addEventListener("click", clickli);
    });
  });
}

function listaLlamadaCorrecta() {
  const correct = document.getElementById("llamada-correcta");
  const listItems = document.querySelectorAll(".custom-list-correct li");

  const cues = [
    { time: 0, index: 0 },
    { time: 8, index: 1 },
    { time: 12, index: 2 },
    { time: 20, index: 3 },
    { time: 25, index: 4 },
    { time: 30, index: 5 },
    { time: 35, index: 6 },
    { time: 39, index: 7 },
  ];

  const executedCues = {};

  correct.addEventListener("timeupdate", function () {
    const currentTime = Math.floor(correct.currentTime);
    cues.forEach((cue) => {
      if (currentTime === cue.time && !executedCues[cue.index]) {
        listItems[cue.index].style.display = "block";
        listItems[cue.index].classList.add("active");
        const checkIcon = document.createElement("i");
        checkIcon.className = "fa fa-check";
        checkIcon.style.color = "#009200";
        checkIcon.setAttribute("aria-hidden", "true");
        listItems[cue.index].insertBefore(
          checkIcon,
          listItems[cue.index].firstChild
        );
        executedCues[cue.index] = true;
      }
    });
  });
}

function playVideoInterval() {
  const videoBackground = document.querySelector(".video-background");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.loop = true;

  const sourceElement = document.createElement("source");
  sourceElement.src = "assets/video/miningprocess.mp4";
  sourceElement.type = "video/mp4";

  videoElement.appendChild(sourceElement);
  videoBackground.appendChild(videoElement);
  videoElement.play();
}

function reiniciarActividad(el) {
  corret = 0;
  completion2 = 0.0;
  actualizarGrafico2();
  $(".actFin").hide();
  $(".btn-reintentar").hide();
  $(".itemQ").removeClass("hideT view");
  $(".itemQ").removeClass("view");

  $(el).parents(".itemQ").addClass("hideT");
  $(".actVorF .inc").html(1);

  let view = ".actVorF > div:nth-child(2)";
  $(view).addClass("view");

  for (let i = 1; i <= 6; i++) {
    let imgID = "#img_slide19_" + (i < 10 ? "0" : "") + i;
    if(imgID==='#img_slide19_02' || imgID==='#img_slide19_04'){
      $(imgID).attr("src", "assets/img/slide19_" + (i < 10 ? "0" : "") + i + ".jpg");
    }else{
      $(imgID).attr("src", "assets/img/slide19_" + (i < 10 ? "0" : "") + i + ".png");
    }
  }


}

let completion2 = 0.0;
const totalElements2 = 6; // Número total de elementos a arrastrar
const borderWidth2 = 15; // Ancho del borde

function actualizarGrafico2() {
  const canvas = document.getElementById("donutChart02");
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja el círculo amarillo en el borde
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80; // Radio del círculo
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI;

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.lineWidth = borderWidth2;
  context.strokeStyle = "white"; // Color del borde amarillo
  context.stroke();

  // Dibuja la parte que se va llenando en blanco
  const filledEndAngle = startAngle + 2 * Math.PI * (completion2 / 100);

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, filledEndAngle);
  context.lineWidth = borderWidth2;
  context.strokeStyle = "yellow"; // Color de la parte llena en blanco
  context.stroke();

  // Muestra el porcentaje en el centro
  context.font = "20px Arial";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(completion2.toFixed(1) + "%", centerX, centerY);
}

// Actualiza el progreso y el gráfico cuando se realiza una acción de arrastre correcta
function actualizarProgreso2(el) {

  if (completion2 < 100) {
    completion2 += 100 / totalElements2;
    if (completion2 > 100) {
      completion2 = 100;
    }
    actualizarGrafico2();
  }
}

let corret = 0;
function actVorF(el, res) {
  $(".actVorF button").attr("disabled", "disabled");
  //mostrar respuesta
  if (res == "correct") {
    $(el).parents(".itemQ").find("img").attr("src", "assets/img/true.jpg");
    corret = corret + 1;
    actualizarProgreso2();
  } else {
    $(el).parents(".itemQ").find("img").attr("src", "assets/img/false.jpg");
  }

  setTimeout(() => {
    $(el).parents(".itemQ").addClass("hideT");
    $(".actVorF .inc").html($(".hideT").length + 1);
    //mostrar la siguiente pregunta
    $(".itemQ").removeClass("view");
    let view = ".actVorF > div:nth-child(" + ($(".hideT").length + 2) + ")";
    $(view).addClass("view");
    // mostrar resultados finales
    if ($(".itemQ").length == $(".hideT").length) {
      $(".actVorF .inc").html($(".hideT").length);
      $(".actFin").show();
      $(".btn-reintentar").show();
      $(".actFin .p-res").css("font-size", "30px");
      $(".actFin .p-res").css("text-align", "center");
      $(".actFin h1").css("text-align", "center");
      $(".actFin button").css("text-align", "center");
      $(".actFin h1").html(corret + " de " + $(".itemQ").length);
      $("#next").removeAttr("disabled").removeAttr("style");
      localStorage.setItem("slider28", "ok");
    }
    $(".actVorF button").removeAttr("disabled");
  }, "1000");
}



const titles = document.querySelectorAll(".rulest h4");
const image = document.querySelector("#img_slide12");
const audio_slide_12 = new Audio();
let currentIndex = -1;
let allowNextSlide = true;
let prev = false;

function prevSlide() {
  if(prev){
    if (allowNextSlide) {
      currentIndex = (currentIndex - 1 + titles.length) % titles.length;
      updateSlide();
    }
  }
}

function nextSlide() {
  if (allowNextSlide) {
    currentIndex = (currentIndex + 1) % titles.length;
    updateSlide();
    prev = true;
  }
}

function updateSlide() {
  allowNextSlide = false;
  // Remover el fondo resaltado de todos los títulos
  titles.forEach((title) => {
    title.style.backgroundColor = "transparent";
    title.style.border = "transparent";
    title.style.borderRadius = "10px";
  });

  // Resaltar el título actual
  titles[currentIndex].style.backgroundColor = "rgba(0, 122, 243, 0.20)";
  // Cambiar la imagen
  const newImageSrc = `assets/img/${titles[currentIndex].getAttribute("data-title").toLowerCase()}.jpg`;
  image.src = newImageSrc;
  image.style.cursor = "pointer";
  // Detener la reproducción actual y reproducir el nuevo audio
  audio_slide_12.pause();
  audio_slide_12.src = `assets/audio/${titles[currentIndex].getAttribute("data-title").toLowerCase()}.mp3`;
  audio_slide_12.play();

  audio_slide_12.addEventListener("timeupdate", function () {
    if (audio_slide_12.currentTime >= audio_slide_12.duration - 5) {
      allowNextSlide = true;
    }
  });

  image.addEventListener("click", function () {
    if (audio_slide_12.paused) {
      audio_slide_12.play();
    } else {
      audio_slide_12.pause();
    }
  });

  $("#prev, #next").on("click", function () {
    audio_slide_12.pause();
  });
}

let completion = 0.0;
const totalElements = 6; // Número total de elementos a arrastrar
const borderWidth = 10; // Ancho del borde

function actualizarGrafico() {
  const canvas = document.getElementById("donutChart01");
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja el círculo amarillo en el borde
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80; // Radio del círculo
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI;

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.lineWidth = borderWidth;
  context.strokeStyle = "white"; // Color del borde amarillo
  context.stroke();

  // Dibuja la parte que se va llenando en blanco
  const filledEndAngle = startAngle + 2 * Math.PI * (completion / 100);

  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, filledEndAngle);
  context.lineWidth = borderWidth;
  context.strokeStyle = "yellow"; // Color de la parte llena en blanco
  context.stroke();

  // Muestra el porcentaje en el centro
  context.font = "20px Arial";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(completion.toFixed(1) + "%", centerX, centerY);
}

// Actualiza el progreso y el gráfico cuando se realiza una acción de arrastre correcta
function actualizarProgreso() {
  if (completion < 100) {
    completion += 100 / totalElements;
    if (completion > 100) {
      completion = 100;
    }
    actualizarGrafico();
  }
}

function changeImage(element, newSrc) {
  const image = element.querySelector("img");
  image.src = newSrc;
}

function arrastrarElemento() {
  // Logica para la actividad (SLIDE 6)
  // item 1
  $("#drag1").draggable({
    revert: "invalid",
    snap: "#drop1",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop1")
    .droppable({
      accept: "#drag1",
    })
    .on("droppable:drop", function (e) {
      console.log("ENTRAA AQUII");
      $(this).addClass("corret");
    });

  // item 2
  $("#drag2").draggable({
    revert: "invalid",
    snap: "#drop2",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop2")
    .droppable({
      accept: "#drag2",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("corret");
    });

  // item 3
  $("#drag3").draggable({
    revert: "invalid",
    snap: "#drop3",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop3")
    .droppable({
      accept: "#drag3",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("corret");
    });

  // item 4
  $("#drag4").draggable({
    revert: "invalid",
    snap: "#drop4",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop4")
    .droppable({
      accept: "#drag4",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("corret");
    });

  // item 4
  $("#drag5").draggable({
    revert: "invalid",
    snap: "#drop5",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop5")
    .droppable({
      accept: "#drag5",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("corret");
    });

  // item 4
  $("#drag6").draggable({
    revert: "invalid",
    snap: "#drop4",
    snapMode: "corner",
    snapTolerance: "1",
  });
  $("#drop6")
    .droppable({
      accept: "#drag6",
    })
    .on("droppable:drop", function (e) {
      $(this).addClass("corret");
    });
}