//Déclaration l'objet Engine
var Engine = {};

//json pour afficher la voiture en fonction de coordonnée
	
//Déclaration d'un objet Map
Engine.Map = {};

//Déclaration d'un objet Param
Engine.Param = {};

//Déclaration d'un objet Camera
Engine.Camera = {};

//Déclaration d'un tableau pour les images
Engine.Tiles = new Array();

//Déclaration d'un tableau image voiture
Engine.Voitures = new Array();

//Function lancée quand la page est chargée (onload dans HTML)
function init(){
	//Déclaration de la variable séléctionnant l'élément canvas
    var canvas = document.getElementById('gameframe');
	var canvas2 = document.getElementById('voiture');
	
	//Applique le contexte au canvas 2
	Engine.context = canvas2.getContext("2d");

	//Permet de tester si navigateur capable de faire tourner du canvas
    if (canvas.getContext){
        
		//Parameters
		
		//Stock le context du canvas dans un objet
        Engine.ctx = canvas.getContext('2d'); 
		
		//Définie la largeur et hauteur du canvas
        Engine.Param.CanvasW = parseInt(canvas.getAttribute("width")) ;
        Engine.Param.CanvasH = parseInt(canvas.getAttribute("height"));
		
		//Définie la taille d'une case
        Engine.Param.CaseSize=16
		Engine.Param.CaseSizeV=30
        
		//Définie les différentes images pour les textures
        //Engine.Tiles[0] = new Image();
        //Engine.Tiles[0].src = './img/grass.jpg';
        //Engine.Tiles[1] = new Image();
        //Engine.Tiles[1].src = './img/road.jpg';      
		//Engine.Tiles[2] = new Image();
        //Engine.Tiles[2].src = './img/sand.jpg';
		//Engine.Tiles[3] = new Image();
        //Engine.Tiles[3].src = './img/tire.jpg';
        //Engine.Tiles[4] = new Image();
        //Engine.Tiles[4].src = './img/start-end.jpg';
        Engine.Tiles[0] = new Image();
        Engine.Tiles[0].src = './img/final/herbe.png';
		Engine.Tiles[1] = new Image();
        Engine.Tiles[1].src = './img/final/route.png';
		Engine.Tiles[2] = new Image();
        Engine.Tiles[2].src = './img/final/sable.png';
		Engine.Tiles[3] = new Image();
        Engine.Tiles[3].src = './img/final/eau.png';
		Engine.Tiles[4] = new Image();
        Engine.Tiles[4].src = './img/final/bosquet.png';
		Engine.Tiles[5] = new Image();
        Engine.Tiles[5].src = './img/final/arbreBas.png';
		Engine.Tiles[6] = new Image();
        Engine.Tiles[6].src = './img/final/arbreMillieu.png';
		Engine.Tiles[7] = new Image();
        Engine.Tiles[7].src = './img/final/arbreHaut.png';

		//Définie les texture des voitures
		Engine.Voitures[0] = new Image();
		Engine.Voitures[0].src = './img/voiture1.png';
		Engine.Voitures[1] = new Image();
		Engine.Voitures[1].src = './img/voiture2.png';
		
		CheckImgLoading();
		//On lance la méthode DrawMap
		//Engine.DrawMap();
		//Engine.DrawVoiture();
		
		Engine.DrawMap();
		Engine.DrawVoiture();
		
		
		frames = Engine.Frames;
		var time=1000;
		for (key in frames){
			setTimeout("drawFrame("+key+")", time);
			time+=40;
		}
		
	}
		
}

function CheckImgLoading()
{
	var tiles = Engine.Tiles;
	var voitures = Engine.Voitures;
	
	for(elm in tiles) {
		if(!Engine.Tiles[elm].complete){
			setTimeout("CheckImgLoading()",300);
			return;
		}	
	}
	for(elm in voitures){
		if(!Engine.Tiles[elm].complete){
			setTimeout("CheckImgLoading()",300);
			return
		}
	}
}
function drawFrame(num)
{
	listvoiture = frames[num].voiture;
	for (k in listvoiture){
		voiture = listvoiture[k]
		drawVoiture2(voiture)
	}
}

function drawVoiture2(voiture) {
	
	var jsonVoiture = voiture;
	
	//Permet de reinitialiser le canvas
	Engine.context.setTransform(1, 0, 0, 1, 0, 0);
	
	//
	Engine.context.clearRect(0,0,800,600);
	Engine.context.save();
		
	var id = jsonVoiture.id;

	//Récupération de la en fonction de l'idtexture du json
	var textureVoiture = jsonVoiture.texture;
	var texture = Engine.Voitures[textureVoiture];
	
	//Recup hauteur l'argeur image
	var Width = texture.width;
	var Height = texture.height;
	
	//Convertie angle en radian
	var angle = jsonVoiture.angle * Math.PI/180;
	
	//Récupération des coordonnées au centre de l'image
	var x = jsonVoiture.x;
	var y = jsonVoiture.y;
	
	//Centre de l'image
	var tw = Width / 2;
	var th = Height / 2;
	
	//Translation haut gauche de l'image
	Engine.context.translate(x, y);
	//Rotation de l'image avec radian
	Engine.context.rotate(angle);
	//Dessin de l'image
	Engine.context.drawImage(texture, - tw, - th, Width, Height);
	Engine.context.restore();
		
}

Engine.DrawVoiture = function() {
	
	var jsonVoiture = Engine.Voiture.voiture;
	
	//Permet de reinitialiser le canvas
	Engine.context.setTransform(1, 0, 0, 1, 0, 0);
	
	//
	Engine.context.clearRect(0,0,800,600);
	Engine.context.save();
	
	for (elm in jsonVoiture) {	
		
		var id = jsonVoiture[elm].id;

		//Récupération de la en fonction de l'idtexture du json
		var textureVoiture = jsonVoiture[elm].texture;
		var texture = Engine.Voitures[textureVoiture];
		
		//Recup hauteur l'argeur image
		var Width = texture.width;
		var Height = texture.height;
		
		//Convertie angle en radian
		var angle = jsonVoiture[elm].angle * Math.PI/180;
		
		//Récupération des coordonnées au centre de l'image
		var x = jsonVoiture[elm].x;
		var y = jsonVoiture[elm].y;
		
		//Centre de l'image
		var tw = Width / 2;
		var th = Height / 2;
		
		//Translation haut gauche de l'image
		Engine.context.translate(x, y);
		//Rotation de l'image avec radian
		Engine.context.rotate(angle);
		//Dessin de l'image
		Engine.context.drawImage(texture, - tw, - th, Width, Height);
		Engine.context.restore();
		
		
	}
}

//Change la position de l'image
Engine.ModifVoiture = function (couleur) {
		
}

//Methode de modification de la case au clic(appeller dans le html)
Engine.ChangeCase = function(elm) {
	
	//Déclare une variable x, y définissant la quand on clique la valeur x dans la fenêtre
	var clickX = window.event.x-elm.offsetLeft;
	var clickY = window.event.y-elm.offsetTop;
	
	//Retourne l'entier inférieur(floor) x, y de la case
	var CaseX = Math.floor(clickX/Engine.Param.CaseSize);
	var CaseY = Math.floor(clickY/Engine.Param.CaseSize);
	
	//Incrément dans l'objet Engine.Map par coordonnée
	Engine.Map.cases[CaseY][CaseX]++;
	
	//Déclaration de la variable case comprennant l'int du type de case
	var Case = Engine.Map.cases[CaseY][CaseX];
	
	//Déclaration de la variable récupérant la texture
	var texture = Engine.Tiles[Case];
	
	//Test permettant de déterminer si pas de texture définir la texture par défaut : 0
	if(texture == undefined)
		Engine.Map.cases[CaseY][CaseX]=0;
	Engine.DrawMap();
};

//Méthode permettant de contruire la map dans le canvas au chargement de la page
Engine.DrawMap= function () {
	//Boucle permettant de parcourir la hauteur du canvas
	for (y = 0; y < Engine.Param.CanvasH / Engine.Param.CaseSize ; y++) {
		//Boucle permettant de parcourir la hauteur du canvas
        	 for (x = 0; x < Engine.Param.CanvasW / Engine.Param.CaseSize; x++) {
			//Déclaration de la texture
			var texture;
			//Déclaration de la case 
			var Case = 0; 
			
			//Try catch : 
			// - Récupére la valeur du json y,x
			// - récupère la texture en fonction de la valeur du json
			try{
				Case = Engine.Map.cases[y][x];
                texture = Engine.Tiles[Case];
             }
			catch(e){texture = Engine.Tiles[0];};
				Engine.ctx.drawImage(texture,x*Engine.Param.CaseSize,y*Engine.Param.CaseSize)
		}
	}
};

//Function permettant de générer un json en fonction des textures de la map
Engine.DumpMap = function () {
	document.getElementById('info').innerHTML=JSON.stringify(Engine.Map);
}
Engine.NewMap= function()
{
	Engine.Map.cases={};
    for (y = 0; y < Engine.Param.CanvasH / Engine.Param.CaseSize; y++) {
		Engine.Map.cases[y]={};
        for (x = 0; x < Engine.Param.CanvasW / Engine.Param.CaseSize; x++) {
            Engine.Map.cases[y][x]=0;
        }
    }
	Engine.DumpMap();
    Engine.DrawMap();
}