const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"This",
	"is",
	"a",
	"lottery."
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

function doMorph(state) {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction,state);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction,state) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	getText(state)
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate(state) {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph(state);
	} else {
		doCooldown();
	}
}
function getText(state){
    if(state){
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }
    else{
        elts.text1.textContent ="";
        elts.text2.textContent ="";
    }
}
// Start the animation.
var Original=document.getElementById("original");
var Tips=document.getElementById("tips");
var change=0;
Original.onclick = function show(){
    if (!change){
        Original.style.opacity=0.5;
		Tips.style.opacity=0;
        change=1;
        animate(1) 
    } else {
        Original.style.opacity=1;
        change=0;
        animate(0) 
    }
};
