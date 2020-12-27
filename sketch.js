var PLAY = 0;
var END = 1;

var ufo, ufoImg;
var bullet, bulletImg;

var virus, virusImg, virusGroup;
var deadVirus, deadVirusImg, deadVirusGroup;

var kills = 0;

var gameState = PLAY;

function preload() {
	ufoImg = loadImage("ufo.png");
	bulletImg = loadImage("bullet.png");

	virusImg = loadImage("virus.png");
	deadVirusImg = loadImage("deadVirus.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	ufo = createSprite(150, height/2, 256, 256);
	ufo.addImage(ufoImg);
	ufo.scale = 0.5;

	kills = 0;

	bulletGroup = createGroup();
	virusGroup = createGroup();
	deadVirusGroup = createGroup();
}


function draw() {
	rectMode(CENTER);
	background(0);

	textFont("Courier");
	textSize(20);
	textAlign(CENTER);
	fill(255);
	text("Kills: " + kills, width - 200, 60);
  
	bullet = createSprite(ufo.x, ufo.y - 50, 50, 50);
	bullet.addImage(bulletImg);
	bullet.scale = 0.01;
	bullet.lifetime = width;
	bullet.visible = false;
	bulletGroup.add(bullet);
	
	virus = createSprite(width + 50, random(20, height - 20), 95, 95);
	virus.addImage(virusImg);
	virus.scale = 0.5;
	virus.velocityX = -(5 + 3 * kills/2);
	virus.lifetime = -50;
	virusGroup.add(virus);
	
	deadVirus = createSprite(width + 50, random(20, height - 20), 95, 95);
	deadVirus.addImage(deadVirusImg);
	deadVirus.scale = 0.5;
	deadVirus.velocityX = -(5 + 3 * kills/2);
	deadVirus.lifetime = -50;
	deadVirusGroup.add(deadVirus);
	
	if(frameCount % 80 !== 0) {
	  virus.destroy();
	}
  
	if(frameCount % 100 !== 0) {
	  deadVirus.destroy();
	}
  
	if(keyDown(38) || keyDown(87)) {
	  ufo.y = ufo.y - (10 + 5 * kills/10);
	  bullet.y = bullet.y - 10;
  
	  bulletGroup.destroyEach();
	}
  
	if(keyDown(40) || keyDown(83)) {
	  ufo.y = ufo.y + (10 + 5 * kills/10);
	  bullet.y = bullet.y + 10;
	  
	  bulletGroup.destroyEach();
	}
  
	if(keyDown(32)) {
	  bullet.visible = true;
	  bullet.velocityX = 30;
	}
  
	if(bulletGroup.collide(virusGroup)) {
	  virusGroup.destroyEach();
	  bulletGroup.destroyEach();
	  
	  kills = kills + 1;
	}


	if(ufo.collide(virusGroup)) {
	  gameState = END;
	}
  
	if(ufo.collide(deadVirusGroup)) {
		gameState = END;
	}
  
	if(bulletGroup.collide(deadVirusGroup)) {
		gameState = END;
	}
	
	if(gameState === END) {
		virusGroup.destroyEach();
		deadVirusGroup.destroyEach();
		bulletGroup.destroyEach();
		ufo.destroy();
		
		textFont("Courier");
		textSize(30);
		textAlign(CENTER);
		fill(255);
		text("GAME OVER", width/2, height/2);
	
		kills = 0;
	}
  
	drawSprites();
}