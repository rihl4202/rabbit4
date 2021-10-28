const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var score = 0
var s1 = false
var s2 = false
var s3 = false 

function preload(){
  bgImg = loadImage("images/background.png")
  fruitImg = loadImage("images/melon.png")
  rabbitImg = loadImage("images/Rabbit-01.png")
  blink = loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png")
  eating = loadAnimation("images/eat_0.png","images/eat_1.png","images/eat_2.png","images/eat_3.png","images/eat_4.png",)
  sad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
  bgs = loadSound("images/sound1.mp3")
  eats = loadSound("images/eating_sound.mp3")
  sads = loadSound("images/sad.wav")
  cuts = loadSound("images/rope_cut.mp3")
  airs = loadSound("images/air.wav")
  starImg = loadImage("images/star.png")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  bgs.play()
  bgs.setVolume(0.4)

  rope = new Rope(6,{x:250,y:30})
  rope2 = new Rope(7,{x:120,y:30})
  fruit = Bodies.circle(250,200,20)
  Composite.add(rope.body,fruit)
  link = new Link(rope,fruit)
  link2 = new Link(rope2,fruit)
  rabbit = createSprite(350,550)

  star1 = createSprite(370,200)
  star1.addImage(starImg)
  star1.scale = 0.02

  
  star2 = createSprite(340,230)
  star2.addImage(starImg)
  star2.scale = 0.02

    
  star3 = createSprite(420,260)
  star3.addImage(starImg)
  star3.scale = 0.02

  blink.frameDelay = 20
  eating.frameDelay = 20
  eating.looping = false
  sad.frameDelay = 20
  sad.looping = false
  rabbit.addAnimation("blinking",blink)
  rabbit.addAnimation("eat",eating)
  rabbit.addAnimation("sad",sad)
  
  rabbit.scale = 0.2

  mute = createImg("images/mute.png")
  mute.position(440,20)
  mute.size(50,50)
  mute.mouseClicked(function(){
    if(bgs.isPlaying())
  {
    bgs.stop()
  }else{
    bgs.play()
  }
  })

  balloon = createImg("images/balloon.png")
  balloon.position(10,200)
  balloon.size(150,100)
  balloon.mouseClicked(function(){
    Matter.Body.applyForce(fruit,fruit.position,{x:0.05,y:0})
    if(bgs.isPlaying()){
      airs.play()
    } else{
      airs.stop()
    }

  })
  btn = createImg("images/cut_btn.png")
  btn.position(230,20)
  btn.size(50,50)
  btn.mouseClicked(function(){
    rope.break()
    link.break()
    if(bgs.isPlaying()){
      cuts.play()
    } else{
      cuts.stop()
    }
  })
  btn2 = createImg("images/cut_btn.png")
  btn2.position(110,20)
  btn2.size(50,50)
  btn2.mouseClicked(function(){
    rope2.break()
    link2.break()
    if(bgs.isPlaying()){
      cuts.play()
    } else{
      cuts.stop()
    }
  })
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(bgImg);
  Engine.update(engine);
  fill("yellow")
  text("Score: "+score,700,60)
  rope.display()
  rope2.display()
  if(fruit!=null){
    push()
  imageMode(CENTER)
  image(fruitImg,fruit.position.x,fruit.position.y,60,60)
  pop()
    var distance = dist(fruit.position.x,fruit.position.y,rabbit.position.x,rabbit.position.y)
    if(distance<80){
      World.remove(world,fruit)
      fruit = null
      rabbit.changeAnimation("eat",eating)
      if(bgs.isPlaying()){
        eats.play()
      } else{
        eats.stop()
      }
    }

    var d1 = dist(fruit.position.x,fruit.position.y,star1.position.x,star1.position.y)
    if(d1<80 && s1===false){
      star1.destroy()
      score = score +5
      s1 = true
    }
    
    var d2 = dist(fruit.position.x,fruit.position.y,star2.position.x,star2.position.y)
    if(d2<80 && s2===false){
      star2.destroy()
      score = score +5
      s2 = true
    }

    var d1 = dist(fruit.position.x,fruit.position.y,star3.position.x,star3.position.y)
    if(d1<80 && s3===false){
      star3.destroy()
      score = score +10
      s3 = true
    }
  }
 
  if(fruit!=null && fruit.position.y>550){
    World.remove(world,fruit)
    fruit = null
    rabbit.changeAnimation("sad",sad)
    if(bgs.isPlaying()){
      sads.play()
    } else{
      sads.stop()
    }  
  }
  
  drawSprites()
}






