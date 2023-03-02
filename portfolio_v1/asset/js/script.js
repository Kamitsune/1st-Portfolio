'use strict';

const myName = document.getElementById('myName'),
arrow = document.getElementById('arrow'),
bgStars = document.getElementById('stars'),
moon = document.getElementById('moon'),
mountains_behind = document.getElementById('mountains_behind');

window.addEventListener('scroll', () => {
  
  const scrollPosition = window.scrollY;
  
  
  if (scrollPosition < 400) {
    bgStars.style.left = scrollPosition/4 + 'px';
  }
  
  if (scrollPosition < 450) {
    myName.style.transform = 'translateX(160%)';
    myName.style.left = -scrollPosition*1.2 + 'px';
    moon.style.top = scrollPosition/1.2 + 'px';
    mountains_behind.style.top = scrollPosition/4 + 'px';
  }

  if (scrollPosition > 200) {
    arrow.style.display = 'none';
  } else {
    arrow.style.display = 'grid';
  }

});

//------------------------Ajout class active pour le menu------------
// -----------------------Version obsolète---------------------------
// let active = document.getElementsByClassName('menuActive');
// for (let i = 0; i < active.length; i++) {
//   active[i].onclick = () =>{
//     if (!active[i].classList.contains('active')) {
//       active[i].classList.toggle("active");
//       const unactive = [...active].filter(item => item !== active[i]);
//       for (let j = 0; j < unactive.length; j++) {
//         unactive[j].classList.remove("active");
//       }
//     }
//   }
// };
const menu = document.querySelector('.menu');

menu.addEventListener('click', function(event){
  if (event.target.classList.contains('menuActive')) {
    const activeElements = menu.getElementsByClassName('active');
    for (let i = 0; i < activeElements.length; i++) {
      activeElements[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }
});

//---------------------STAR------------------------------------
// if (condition) {
  
// }
const formContainer = document.querySelector('.formContainer'),
  formTitle = document.querySelector('.formTitle'),
  header = document.querySelector('header'),

  STAR_COLOR = '#fff',
  STAR_SIZE = 3,
  STAR_MIN_SCALE = 0.2,
  OVERFLOW_THRESHOLD = 50,
  STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8,

  canvas = document.querySelector( 'canvas' ),
  context = canvas.getContext( '2d' );

//-------------------Déplacer Me Contacter---------------------
formContainer.addEventListener('mouseover', function(){
    formTitle.style.marginRight = "0px";
});

formContainer.addEventListener('mouseout', function(){
    formTitle.style.marginRight = "41%";
});

let scale = 1, // device pixel ratio
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

formContainer.onmousemove = onMouseMove; // Pour que le code fonctionne même en hover sur le form
header.onmousemove = onMouseMove; // Pour que le code fonctionne même en hover sur le header

function generate() {

   for( let i = 0; i < STAR_COUNT; i++ ) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
    });
   }
}

function placeStar( star ) {

  star.x = Math.random() * width;
  star.y = Math.random() * height;

}

function recycleStar( star ) {

  let direction = 'z';

  let vx = Math.abs( velocity.x ),
      vy = Math.abs( velocity.y );

  if( vx > 1 || vy > 1 ) {
    let axis;

    if( vx > vy ) {
      axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
    }
    else {
      axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
    }

    if( axis === 'h' ) {
      direction = velocity.x > 0 ? 'l' : 'r';
    }
    else {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }
  
  star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

  if( direction === 'z' ) {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }
  else if( direction === 'l' ) {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  }
  else if( direction === 'r' ) {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  }
  else if( direction === 't' ) {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  }
  else if( direction === 'b' ) {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }

}

function resize() {

  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach( placeStar );

}

function step() {

  context.clearRect( 0, 0, width, height );

  update();
  render();

  requestAnimationFrame( step );

}

function update() {

  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += ( velocity.tx - velocity.x ) * 0.8;
  velocity.y += ( velocity.ty - velocity.y ) * 0.8;

  stars.forEach( ( star ) => {

    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += ( star.x - width/2 ) * velocity.z * star.z;
    star.y += ( star.y - height/2 ) * velocity.z * star.z;
    star.z += velocity.z;
  
    // recycle when out of bounds
    if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
      recycleStar( star );
    }

  } );

}

function render() {

  stars.forEach( ( star ) => {

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5*Math.random();
    context.strokeStyle = STAR_COLOR;

    context.beginPath();
    context.moveTo( star.x, star.y );

    var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

    // stroke() wont work on an invisible line
    if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
    if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

    context.lineTo( star.x + tailX, star.y + tailY );

    context.stroke();

  } );

}

function movePointer( x, y ) {

  if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {

    let ox = x - pointerX,
        oy = y - pointerY;

    velocity.tx = velocity.tx + ( ox / 24*scale ) * ( touchInput ? 1 : -1 );
    velocity.ty = velocity.ty + ( oy / 12*scale ) * ( touchInput ? 1 : -1 );

  }

  pointerX = x;
  pointerY = y;

}

function onMouseMove( event ) {

  touchInput = false;

  movePointer( event.clientX, event.clientY );

}

function onTouchMove( event ) {

  touchInput = true;

  movePointer( event.touches[0].clientX, event.touches[0].clientY, true );

  event.preventDefault();

}

function onMouseLeave() {

  pointerX = null;
  pointerY = null;

}