var nav = document.getElementById('nav');
var navlinks = nav.getElementsByTagName('a');

function toggleNav() {
    (nav.classList.contains('active')) ? nav.classList.remove('active') : nav.classList.add('active');
  }

document.getElementById('nav-icon').addEventListener('click', function(e) {
    e.preventDefault();
    toggleNav();
});

for(var i = 0; i < navlinks.length; i++) {
    navlinks[i].addEventListener('click', function() {
      toggleNav();
  });
}
var slider = document.querySelector('.slider');
var slides = Array.from(slider.children);
var nextButton = document.querySelector('.next');
var prevButton = document.querySelector('.prev');
var currentIndex = 0;

function goToSlide(index) {
  slider.style.transform = 'translateX(' + (-100 * index) + '%)';
  currentIndex = index;
}

nextButton.addEventListener('click', function() {
  var nextIndex = (currentIndex + 1) % slides.length;
  goToSlide(nextIndex);
});

prevButton.addEventListener('click', function() {
  var prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(prevIndex);
});

var slider = document.querySelector('.slider');
var slides = Array.from(slider.children);
var nextButton = document.querySelector('.next');
var prevButton = document.querySelector('.prev');
var currentIndex = 0;
var slideInterval = 3000; // Intervalo en milisegundos para el cambio automático
var autoPlayTimer;

function goToSlide(index) {
  slider.style.transform = 'translateX(' + (-100 * index) + '%)';
  currentIndex = index;
}

function nextSlide() {
  var nextIndex = (currentIndex + 1) % slides.length;
  goToSlide(nextIndex);
}

nextButton.addEventListener('click', function() {
  nextSlide();
  resetAutoPlay(); // Reinicia el auto-play cuando se hace clic en las flechas
});

prevButton.addEventListener('click', function() {
  var prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(prevIndex);
  resetAutoPlay(); // Reinicia el auto-play cuando se hace clic en las flechas
});

// Función para iniciar el auto-play
function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, slideInterval);
}

// Función para reiniciar el auto-play
function resetAutoPlay() {
  clearInterval(autoPlayTimer);
  startAutoPlay();
}

// Inicia el auto-play al cargar
startAutoPlay();

//seccion de burbujas

document.querySelectorAll('.info-button').forEach(button => {
  button.addEventListener('click', function() {
    var content = document.getElementById(this.getAttribute('data-target'));
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      document.querySelectorAll('.info-content').forEach(p => p.style.display = 'none'); // Oculta todos primero
      content.style.display = 'block'; // Muestra el seleccionado
    }
  });
});

document.querySelectorAll('.image-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    // Elimina la clase activa de todas las imágenes primero
    document.querySelectorAll('.image-gallery img').forEach(innerImg => {
      innerImg.classList.remove('active');
    });
    
    // Añade la clase activa a la imagen clicada
    img.classList.add('active');
  });
});

//titulo interactivo
window.addEventListener('scroll', function() {
  var title = document.querySelector('.big-title');
  var titleContainer = document.querySelector('.title-container');
  if (window.scrollY > 50) { // Cambia cuando el usuario haya scrolleado más de 50px
    titleContainer.classList.add('title-small');
  } else {
    titleContainer.classList.remove('title-small');
  }
}); 
 //burbujas

window.addEventListener('scroll', function() {
  var imageContainer = document.querySelector('.floating-image');
  imageContainer.style.transform = 'translateY(0px)'; // Resetea la posición al hacer scroll
  
});

function toggleChat() {
  var chatBox = document.getElementById('chatBox');
  if (chatBox.style.display === 'none') {
    chatBox.style.display = 'block';
  } else {
    chatBox.style.display = 'none';
  }
}

function showAnswer(questionElement) {
  var answer = questionElement.nextElementSibling;
  if (answer.style.display === 'none') {
    // Ocultar todas las otras respuestas antes de mostrar la seleccionada
    var allAnswers = document.querySelectorAll('.chat-answer');
    allAnswers.forEach(function(ans) {
      ans.style.display = 'none';
    });
    answer.style.display = 'block';
  } else {
    answer.style.display = 'none';
  }
}


