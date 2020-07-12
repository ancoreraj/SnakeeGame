function init(){
	canvas=document.getElementById("mycanvas");
	W=canvas.width="590";
	H=canvas.height="490";
	pen=canvas.getContext('2d')
	cs=50;
	score=5;
	food_img=new Image();
	food_img.src="apple.png";
	trophy=new Image();
	trophy.src="trophy.png";
	game_over=false;
	food=getRandomFood();
	snake={
    init_len:4,
    color:"blue",
    cells:[],
    direction:"right",
    createSnake:function(){
    	for(var i=this.init_len;i>0;i--){
    		this.cells.push({x:i,y:0});
    	}
    },
    drawSnake:function(){
    	for(var i=0;i<this.cells.length;i++){
        pen.fillStyle=this.color;
    	pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);//-2 because of some separation of boxes from each other
    }
},
    updateSnake:function(){
    	//update snake according to the direction property
    	//check if the snake has eaten food,increase the lkength of the snake and
    	//genaerate new food objects
    	var headx=this.cells[0].x;
    	var heady=this.cells[0].y;
    	if(headx== food.x && heady==food.y){
         food=getRandomFood();
         score++;
    	}
    	else{
    	this.cells.pop();  //only if when the food is not eaten
    }
    	var nextX,nextY;
    	if(this.direction=="right"){
         nextX=headx + 1;
         nextY=heady;
    	}
    	else  if(this.direction=="left"){
    		nextX=headx-1;
    		nextY=heady;
    	}
    	else if(this.direction=="down"){
    		nextX=headx;
    		nextY=heady+1;
    	}
    	else if(this.direction=="up"){
    		nextX=headx;
    		nextY=heady-1;
    	}
    	this.cells.unshift({x:nextX,y:nextY});
    	var last_x=Math.round(W/cs);
    	var last_y=Math.round(W/cs);
    	if(this.cells[0].y<0 || this.cells[0].x <0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
    		game_over=true;
    	}
    }
	};
   snake.createSnake();
   //add the event listner on the document object
   function keyPressed(e){
   //conditional statements
   if(e.key=="ArrowRight"){
   	snake.direction="right";
   }
   else if(e.key=="ArrowLeft"){
   	snake.direction="left";
   }
   else if(e.key=="ArrowDown"){
   	snake.direction="down"
   }
   else if(e.key=="ArrowUp"){
   	snake.direction="up";
   }
   }
   document.addEventListener('keydown',keyPressed);
}
function draw(){
	//ERASE THE old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,28,25,cs,cs);
    pen.fillStyle="blue";
    pen.font="20px Roboto";
	pen.fillText(score,50,50);
}
function update(){
 snake.updateSnake();
}
function getRandomFood(){
	var foodX =Math.round(Math.random()*(W-cs)/cs);
	var foodY =Math.round(Math.random()*(H-cs)/cs);
	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}
function gameloop(){
	if(game_over==true){
		clearInterval(f);//stop rendering the screen that will stop the gameloop
		alert("GAME OVER");//throw the alert box and say "game over"
	}
 draw();
 update();
}
init();
var f=setInterval(gameloop,100);
