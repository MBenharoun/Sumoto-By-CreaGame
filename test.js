ninja = new Array();
for(var i = 0;i<4;i++);
{
        var obj = new Object()
        obj.x = 12 * tailleCelluleLaby,
        obj.y = 9 * tailleCelluleLaby,
        obj.direction = 4,
        obj.vitesse = 2,
        obj.gestion = ninjagestion;
        obj.img = Ghost[0];
        obj.ia = function (){};
        obj.anime = 0
        ninja.push(obj);
}
ninja[0].ia = ninjarose;
ninja[0].img = Ghost;
ninja[1].ia = ninjableu;
ninja[1].img = Ghost;
ninja[2].ia = ninjanoir;
ninja[2].img = Ghost;
ninja[3].ia = ninjavert;
ninja[3].img = Ghost;

var ninjarose = function() {
    if ((this.x % tailleCelluleLaby) < this.vitesse && (this.y % tailleCelluleLaby) < this.vitesse) {
        if (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
            while (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        } else {
            var demiTour = (this.direction << 2);
            if (demiTour > 15) demiTour >>= 4;
            this.direction = 2 ** Math.floor(Math.random() * 4);
            while (this.direction == demiTour || paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        }
    }
}
var ninjanoir = function() {
    if ((this.x % tailleCelluleLaby) < this.vitesse && (this.y % tailleCelluleLaby) < this.vitesse) {
        if (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
            while (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        } else {
            var demiTour = (this.direction << 2);
            if (demiTour > 15) demiTour >>= 4;
            this.direction = 2 ** Math.floor(Math.random() * 4);
            while (this.direction == demiTour || paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        }
    }
}
var ninjableu = function() {
    if ((this.x % tailleCelluleLaby) < this.vitesse && (this.y % tailleCelluleLaby) < this.vitesse) {
        if (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
            while (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        } else {
            var demiTour = (this.direction << 2);
            if (demiTour > 15) demiTour >>= 4;
            this.direction = 2 ** Math.floor(Math.random() * 4);
            while (this.direction == demiTour || paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        }
    }
}
var ninjavert = function() {
    if ((this.x % tailleCelluleLaby) < this.vitesse && (this.y % tailleCelluleLaby) < this.vitesse) {
        if (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
            while (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        } else {
            var demiTour = (this.direction << 2);
            if (demiTour > 15) demiTour >>= 4;
            this.direction = 2 ** Math.floor(Math.random() * 4);
            while (this.direction == demiTour || paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        }
    }
}

ninjagestion = function (paramLevel) {
    if ((this.x % tailleCelluleLaby) < this.vitesse && (this.y % tailleCelluleLaby) < this.vitesse) {
        if (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
            while (paramLevel.labyrinthe[parseInt(this.y / tailleCelluleLaby)][parseInt(this.x / tailleCelluleLaby)] & this.direction) {
                this.direction = 2 ** Math.floor(Math.random() * 4);
            }
        } else {
            this.ia(paramLevel);
        }
    }
    this.x = (parseInt(this.x / tailleCelluleLaby)) * tailleCelluleLaby;
    this.y = (parseInt(this.y / tailleCelluleLaby)) * tailleCelluleLaby;

    switch (this.direction) {
        case 1:
            this.y -= this.vitesse;
            this.anime = 2;
            break;
        case 2:
            this.x += this.vitesse;
            this.anime = 1;
            break;
        case 4:
            this.y += this.vitesse;
            this.anime = 0;
            break;
        case 8:
            this.x -= this.vitesse;
            this.anime = 0;
            break;
    }
    canvasContext.save();
    canvasContext.drawImage(Ghost[this.anime],
        0, 0, tailleCelluleLaby, tailleCelluleLaby,
        this.x, this.y, tailleCelluleLaby, tailleCelluleLaby);
    canvasContext.restore();
    var dx = this.x - pacman.x;
    var dy = this.y - pacman.y;

    if (((dx ** 2) + (dy ** 2)) < distanceCollision) {
        pacman.mort = true;
    }


}


















































