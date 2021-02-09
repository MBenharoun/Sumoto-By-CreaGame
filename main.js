const largeurLaby=25;	//Largeur Laby
const hauteurLaby=15;	//Hauteur Laby
const tailleCelluleLaby=50	;	//Taille des cellues du laby
var score = 0;
var mort=false;
const taillePacman=tailleCelluleLaby*0.6;    //    Ou par défaut 40
const distanceCollision=((taillePacman**2)+(taillePacman**2));

const canvasWidth=largeurLaby*tailleCelluleLaby;	//Largeur du canvas
const canvasHeight=hauteurLaby*tailleCelluleLaby;	//Hauteur du canvas
 var canvasContext;
 var choix = null;

var laby1 =[[ '9', '5', '5', '5', '5', '5', '3', '1', '1', '1', '9',' 5', '5', '5', '3', '1', '1', '1', '9', '5', '5', '5', '5', '5', '3'],              //1
			['10',"0 ", "0", "0", "0", "0",'10', "0", "0",' 9',' 6',' 0',' 0', '0','12', '3', '0', '0','10', '0', '0', '0', '0' ,'0','10'],              //2
			[ '8', '5', '7', '0','13', '5', '2', '0', '9', '6', '0', '0', '0', '0', '0','12', '3', '0', '8', '5', '5', '5', '5', '5', '2'],              //3
			['10', '0', '0', '0', '0', '0','10',' 0','10', '0', '0', '0', '0', '0', '0', '0','10', '0','10', '0', '0', '0', '0', '0','10'],              //4
			['10', '0', '0', '0', '0', '0','10',' 0','10', '0', '9', '5', '5', '5', '3', '0','10', '0','10',' 0', '0', '0', '0', '0','10'],              //5
			[ '8', '5', '5', '5', '1', '5', '2', '0','10', '0','10','0 ', '0', '0','10', '0','10', '0', '8', '5', '1', '7',' 0','13', '2'],              //6
			['10', '0', '0', '0','10',' 0', '8', '5', '4', '1', '4', '3','0 ', '9', '4', '1', '4', '5', '2',' 0','10', '0', '0', '0','10'],              //7
			['10', '0', '0', '0','10',' 0','10', '0',' 0','10', '0','12',' 5',' 6', '0','10',' 0',' 0','10',' 0','10',' 0', '0',' 0','10'],              //8
			['10', '0', '0', '0','10', '0','10', '0', '0','10', '0', '9',' 0',' 3', '0','10',' 0',' 0','10',' 0','10',' 0',' 0',' 0','10'],              //9
			['10','0 ', '0', '0','10', '0','10',' 0',' 0','10', '0','12',' 4',' 6', '0','10',' 0',' 0','10',' 0','10',' 0',' 0',' 0','10'],              //10
			[ '8', '7','0 ','13',' 4',' 5',' 2', '0', '0','10', '0', '9', '5',' 3', '0','10', '0',' 0',' 8',' 5',' 4',' 5',' 5', '5', '2'],              //11
			['10','0 ', '0', '0',' 0',' 0',' 8',' 5',' 1',' 4',' 1',' 6',' 0','12', '1',' 4',' 1', '5',' 2','0 ',' 0',' 0',' 0',' 0','10'],              //12
			[ '8', '5', '5', '5', '5', '5', '2',' 0','10', '0','10',' 0',' 0',' 0','10','0 ','10','0' , '8',' 5',' 7', '0','13',' 5', '2'],              //13
			['10', '0', '0', '0',' 0', '0','10', '0','10', '0','12',' 3', '0', '9',' 6','0 ','10','0 ','10','0 ',' 0',' 0',' 0', '0','10'],              //14
			['12', '5', '5', '5', '5',' 5',' 4',' 5',' 4', '7', '4','12',' 5',' 6', '4','13',' 4',' 5',' 4',' 5',' 5',' 5', '5',' 5',' 6'],				 //15
		   ]; //Niveau 1

var level=0; // variable du choix de niveau
var definitionLevel=[ 
						{labyrinthe:laby1,startX:12,startY:4,direction:0},
				];	//definition de la zone de départ du joueur ainsi que la direction pour chaque labyrinthe
var imageRiz = new Image()
imageRiz.src = "asset/ImageRiz.png"
var imageMur;// Variable des murs

function start() //télechargement des assets des murs dans un tableau
{
    imageMur=loadImage([
    						"asset/Mur.png",
							"asset/1.png",
							"asset/2.png",
							"asset/3.png",
							"asset/4.png",
							"asset/5.png",
							"asset/6.png",
							"asset/7.png",
							"asset/8.png",
							"asset/9.png",
							"asset/10.png",
							"asset/11.png",
							"asset/12.png",
							"asset/13.png",
							"asset/14.png",
							"asset/15.png"],endLoadMur);
}

var imagePacman;
var imagePacmanG;
var imagePacmanD;
var imagePacmanM;

function endLoadMur() {	// Image du pac-man dans un tableau
	imagePacman = loadImage([		"asset/sumoto1.png",
									"asset/sumoto2.png",
	],)
	imagePacmanG = loadImage([		"asset/sumotoG1.png",
										"asset/sumotoG2.png",
	],)
	imagePacmanM = loadImage(["asset/sumotoM.png"])

	imagePacmanD = loadImage([		"asset/sumotoD1.png",
										"asset/sumotoD2.png",
		],endLoadPacman);
}

var Ghost;
function endLoadPacman() {// Image des fantomes dans un tableau
	Ghost=loadImage([		"asset/ninja1D.png",
								"asset/ninja1G.png",
								"asset/ninja1M.png",],endLoadGhost);
}
function endLoadGhost() {
	
    document.getElementById("presentation").style.display="none";
	document.getElementById("jeu").style.display="";					//Sélection des canvas selon un ID
	document.getElementById("saisieHiscore").style.display="none";

	var canvas=document.getElementById("canvas");
	canvas.width=canvasWidth;													//Taille du canvas en hauteur
	canvas.height=canvasHeight;													//taille du canvas en largeur
	canvasContext=canvas.getContext("2d");
	document.getElementById("canvas").style.display="";
	
	pacman.init(definitionLevel[level]);										//initialisation du pac man dans le niveau selectioner
	Ghost1.init(definitionLevel[level]);		//initialisation des fantomes dans le niveau selectioner
	Ghost2.init(definitionLevel[level]);
	Ghost3.init(definitionLevel[level]);		//initialisation des fantomes dans le niveau selectioner
	Ghost4.init(definitionLevel[level]);//initialisation des fantomes dans le niveau selectioner
	createPillules(definitionLevel[level].labyrinthe,definitionLevel[level].startX,definitionLevel[level].startY);	//création des pillules

	loopMain(); //lancement de la fonction loopmain
}

function loopMain() {

	var nbPillule=drawLaby(definitionLevel[level].labyrinthe);	//definition du nombre de pilule par le nombre de case disponible atteignable
	pacman.update(definitionLevel[level]);
	Ghost1.update(definitionLevel[level]);
	Ghost2.update(definitionLevel[level]);
	Ghost3.update(definitionLevel[level]);
	Ghost4.update(definitionLevel[level]);

	if(pacman.mort) {

		pacman.nbVie -= 1;
		console.log(pacman.nbVie)
		document.getElementById("message").innerHTML=pacman.nbVie;
		if (pacman.nbVie == 0)
		{

			onDeath();
			return;
		}

	}
	document.getElementById("message").innerHTML=pacman.nbVie;

	if(!nbPillule || pacman.mort) {//si le nombre de pillue disponible est egale a 0 relancement
		pacman.mort = false
		pacman.init(definitionLevel[level]);
		createPillules(definitionLevel[level].labyrinthe,definitionLevel[level].startX,definitionLevel[level].startY);
	}
	document.getElementById("score").innerHTML=score;

	setTimeout(loopMain,1000/60);		//delay
}

const delaiDemandeMax=20;	//delay des commandes de direction
var pacman={
	
	x:0,
	y:0,
	direction:0,
	derniereDirection:0,
	directionDemande:0,
	delaiDemande:0,
	vitesse:4,  	//vitesse du pac man
	vitesseAnim:6,
	vAnim:0,
	noAnim:0,
	mort: false,
	nbVie: 3,

	init(paramLevel) {
		this.x=paramLevel.startX*tailleCelluleLaby;		//conversion de la position du tableaux en pixel
		this.y=paramLevel.startY*tailleCelluleLaby;
		this.directionDemande=this.direction=this.derniereDirection=paramLevel.direction;
		this.delaiDemande=-30;
		pacx = this.x;
		pacy = this.y;
	},
	update(paramLevel) {

		if (this.delaiDemande >= 0) {
			if (joystick & 1) {
				this.directionDemande = 1;
				this.delaiDemande = delaiDemandeMax;
			} else if (joystick & 2) {
				this.directionDemande = 2;
				this.delaiDemande = delaiDemandeMax;
			} else if (joystick & 4) {
				this.directionDemande = 4;
				this.delaiDemande = delaiDemandeMax;
			} else if (joystick & 8) {
				this.directionDemande = 8;
				this.delaiDemande = delaiDemandeMax;
			}
		}

		if ((this.x % tailleCelluleLaby) < this.vitesse && (this.y % tailleCelluleLaby) < this.vitesse) {	//detection de la cellue actuelle
			if (this.delaiDemande > 0) {
				if ((paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.directionDemande) == 0) {
					this.direction = this.directionDemande;
					this.x = (parseInt(this.x / tailleCelluleLaby)) * tailleCelluleLaby;
					this.y = (parseInt(this.y / tailleCelluleLaby)) * tailleCelluleLaby;
				}
			}
			if (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
				this.direction = 0;
				this.x = (parseInt(this.x / tailleCelluleLaby)) * tailleCelluleLaby;
				this.y = (parseInt(this.y / tailleCelluleLaby)) * tailleCelluleLaby;
			}
		}
		if (this.delaiDemande > 0)
			this.delaiDemande--;
		else if (this.delaiDemande < 0)
			this.delaiDemande++;

		switch (this.direction) {		//choix de la direction
			case 1:
				this.y -= this.vitesse;
				break;
			case 2:
				this.x += this.vitesse;
				break;
			case 4:
				this.y += this.vitesse;
				break;
			case 8:
				this.x -= this.vitesse;
				break;
		}

		canvasContext.save();
		if (this.derniereDirection & 8) {
			choix = imagePacmanG
		} else if (this.derniereDirection & 1) {
			choix = imagePacmanM
		} else if (this.derniereDirection & 2) {
			choix = imagePacmanD
		} else {
			choix = imagePacman
		}

		if (this.direction) {
			this.derniereDirection = this.direction;
			if (this.vAnim > 0) {
				this.vAnim--;
			} else {
				this.vAnim = this.vitesseAnim;
				this.noAnim = (this.noAnim + 1) % choix.length;
			}
		} else {
			this.noAnim = this.vAnim = 0;
		}
		if (choix == imagePacmanM) {

			canvasContext.drawImage(choix[0], 0, 0, tailleCelluleLaby, tailleCelluleLaby, this.x, this.y, tailleCelluleLaby, tailleCelluleLaby);
		}
		else {
			canvasContext.drawImage(choix[this.noAnim]
				, 0, 0, tailleCelluleLaby, tailleCelluleLaby, this.x, this.y, tailleCelluleLaby, tailleCelluleLaby);
		}
		canvasContext.restore();
		
		var xPillule=parseInt(this.x/tailleCelluleLaby);
		var yPillule=parseInt(this.y/tailleCelluleLaby);

		if (paramLevel.labyrinthe[yPillule][xPillule]&(1<<4)){
			paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(1<<4);
			score += 1;
		}
		if (paramLevel.labyrinthe[yPillule][xPillule]&(2<<4)){
			paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(2<<4);
			score +=1;
		}
		if (paramLevel.labyrinthe[yPillule][xPillule]&(4<<4)){
			paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(4<<4);
			score +=1;
		}

		if(this.direction&10) paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(2<<4);
		if(this.direction&5) paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(4<<4);


	},
};


function drawLaby(laby){//mise en forme du labyrinthe

	var pillule;
	for(var ligne=0;ligne<hauteurLaby;ligne++) {
		for(var colonne=0;colonne<largeurLaby;colonne++) {
			var x=colonne*tailleCelluleLaby;
			var y=ligne*tailleCelluleLaby;

			canvasContext.drawImage(imageMur[laby[ligne][colonne]&15],
									0,0,tailleCelluleLaby,tailleCelluleLaby,
									x,y,tailleCelluleLaby,tailleCelluleLaby);
		}
	}
	var cptPillule=0;
	for(var ligne=0;ligne<hauteurLaby;ligne++) {
		for(var colonne=0;colonne<largeurLaby;colonne++) {
			var x=colonne*tailleCelluleLaby;
			var y=ligne*tailleCelluleLaby;
			pillule=(laby[ligne][colonne]>>4)&7;
			if(pillule&1) {
				canvasContext.drawImage(imageRiz,x+(tailleCelluleLaby/2)-2,y+(tailleCelluleLaby/2)-2,15,15);
				cptPillule++;
			}
			if(pillule&2) {
				canvasContext.drawImage(imageRiz,x+tailleCelluleLaby-2,y+(tailleCelluleLaby/2)-2,15,15);
				cptPillule++;
			}
			if(pillule&4) {
				canvasContext.drawImage(imageRiz,x+(tailleCelluleLaby/2)-2,y+tailleCelluleLaby-2,15,15);
				cptPillule++;
			}
		}
	}
	return cptPillule;
}

function createPillules(laby,x,y) {//Mise en place des pills
	laby[y][x]|=1<<4;
	if(!(laby[y][x]&2)) laby[y][x]|=2<<4;
	if(!(laby[y][x]&4)) laby[y][x]|=4<<4;
	if(!(laby[y][x]&1) && !(laby[y-1][x]&(1<<4))) createPillules(laby,x,y-1);
	if(!(laby[y][x]&2) && !(laby[y][x+1]&(1<<4))) createPillules(laby,x+1,y);
	if(!(laby[y][x]&4) && !(laby[y+1][x]&(1<<4))) createPillules(laby,x,y+1);
	if(!(laby[y][x]&8) && !(laby[y][x-1]&(1<<4))) createPillules(laby,x-1,y);
}

var Ghost1={//Statistique et emplacement des fantomes

	x:0,
	y:0,
	direction:4,		//choix de la direction
	vitesse:2,			//choix de la vitesse

	init(paramLevel) {
		this.x=12*tailleCelluleLaby;//position x de départ
		this.y=9*tailleCelluleLaby;//position y de départ
	},

	update(paramLevel) {

		if((this.x%tailleCelluleLaby)<this.vitesse && (this.y%tailleCelluleLaby)<this.vitesse) {
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
				while(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			} else {
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
		switch(this.direction) {
			case 1:
				this.y-=this.vitesse;
				this.anime = 2;
				break;
			case 2:
				this.x+=this.vitesse;
				this.anime = 1;
				break;
			case 4:
				this.y+=this.vitesse;
				this.anime = 0;
				break;
			case 8:
				this.x-=this.vitesse;
				this.anime = 0;
				break;
		}
		canvasContext.save();
		canvasContext.drawImage(Ghost[this.anime],
			0,0,tailleCelluleLaby,tailleCelluleLaby,
			this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
		var dx=this.x-pacman.x;
		var dy=this.y-pacman.y;

		if( ((dx**2)+(dy**2)) < distanceCollision){
			pacman.mort=true;
		}
	},
};
var Ghost2={//Statistique et emplacement des fantomes

	x:0,
	y:0,
	direction:4,		//choix de la direction
	vitesse:2,			//choix de la vitesse

	init(paramLevel) {
		this.x=12*tailleCelluleLaby;//position x de départ
		this.y=9*tailleCelluleLaby;//position y de départ
	},

	update(paramLevel) {

		if((this.x%tailleCelluleLaby)<this.vitesse && (this.y%tailleCelluleLaby)<this.vitesse) {
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
				while(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			} else {
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
		switch(this.direction) {
			case 1:
				this.y-=this.vitesse;
				this.anime = 2;
				break;
			case 2:
				this.x+=this.vitesse;
				this.anime = 1;
				break;
			case 4:
				this.y+=this.vitesse;
				this.anime = 0;
				break;
			case 8:
				this.x-=this.vitesse;
				this.anime = 0;
				break;
		}
		canvasContext.save();
		canvasContext.drawImage(Ghost[this.anime],
			0,0,tailleCelluleLaby,tailleCelluleLaby,
			this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
		var dx=this.x-pacman.x;
		var dy=this.y-pacman.y;

		if( ((dx**2)+(dy**2)) < distanceCollision){
			pacman.mort=true;
		}
	},
};
var Ghost3={//Statistique et emplacement des fantomes

	x:0,
	y:0,
	direction:4,		//choix de la direction
	vitesse:2,			//choix de la vitesse

	init(paramLevel) {
		this.x=12*tailleCelluleLaby;//position x de départ
		this.y=9*tailleCelluleLaby;//position y de départ
	},

	update(paramLevel) {

		if((this.x%tailleCelluleLaby)<this.vitesse && (this.y%tailleCelluleLaby)<this.vitesse) {
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
				while(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			} else {
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
		switch(this.direction) {
			case 1:
				this.y-=this.vitesse;
				this.anime = 2;
				break;
			case 2:
				this.x+=this.vitesse;
				this.anime = 1;
				break;
			case 4:
				this.y+=this.vitesse;
				this.anime = 0;
				break;
			case 8:
				this.x-=this.vitesse;
				this.anime = 0;
				break;
		}

		canvasContext.save();
		canvasContext.drawImage(Ghost[this.anime],
			0,0,tailleCelluleLaby,tailleCelluleLaby,
			this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
		var dx=this.x-pacman.x;
		var dy=this.y-pacman.y;

		if( ((dx**2)+(dy**2)) < distanceCollision){
			pacman.mort=true;
		}
	},
};
var Ghost4={//Statistique et emplacement des fantomes

	x:0,
	y:0,
	direction:4,		//choix de la direction
	vitesse:2,			//choix de la vitesse
	anime:0,
	init(paramLevel) {
		this.x=12*tailleCelluleLaby;//position x de départ
		this.y=9*tailleCelluleLaby;//position y de départ
	},

	update(paramLevel) {

		if((this.x%tailleCelluleLaby)<this.vitesse && (this.y%tailleCelluleLaby)<this.vitesse) {
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
				while(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			} else {
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
		switch(this.direction) {
			case 1:
				this.y-=this.vitesse;
				this.anime = 2;
				break;
			case 2:
				this.x+=this.vitesse;
				this.anime = 1;
				break;
			case 4:
				this.y+=this.vitesse;
				this.anime = 0;
				break;
			case 8:
				this.x-=this.vitesse;
				this.anime = 0;
				break;
		}

		canvasContext.save();
		canvasContext.drawImage(Ghost[this.anime],
			0,0,tailleCelluleLaby,tailleCelluleLaby,
			this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
		var dx=this.x-pacman.x;
		var dy=this.y-pacman.y;

		if( ((dx**2)+(dy**2)) < distanceCollision){
			pacman.mort=true;
		}
	},
};
function onDeath(){
	open('death.html',"_self");
}
function restart(){
	open('index.html',"_self");
}
function credit(){
	open('credit.html',"_self");
}
