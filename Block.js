class Block{
  constructor(x, y) {
        var options = {
            isStatic: false,
            restitution:0.4,
            friction:0
            //density:1.0
        }
        this.body = Bodies.rectangle(x,y,40,50, options);
        this.x=x;
        this.y=y;
        this.width = 40;
        this.height =50;
        this.visibility=255;

        World.add(world, this.body);
  }
      display(){
        push();
        if(this.body.speed<5){
          var pos = this.body.position;
          var angle = this.body.angle;
          
          translate(pos.x,pos.y);
          rotate(angle);
          rectMode(CENTER);
          strokeWeight(2.5);
          //fill("lightBlue");
          rect(0,0,this.width,this.height);
          
  
        }else {
          World.remove(world,this.body);
          this.body.visibility-=5;
          tint(255,this.visibility);
        }
        pop();
      }

      score(){
        if(this.body.speed > 3 && this.body.speed < 4.5){
          score2+=1;
        }
      }
}