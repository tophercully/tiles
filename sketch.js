w= 1600
h = 2000
marg = 100

ratio = h/w

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 1);
}
pxSize = url.searchParams.get('size')

//parameters
numPasses = 0
looping = true
pipeDens = randomInt(3, 15)

vals = ['black', 'white']
hues = [truePal[0], truePal[1]]
shuff(vals)
shuff(hues)

bg = [vals[0], hues[0]]
fg = [vals[1], hues[1]]


tiles = []
pipeA = []
pipeB = []

roundness = randBool()

for(let i = 0 ; i < pipeDens+1; i++) {
  pipeA[i] = fg[randomInt(0, 1)]
  pipeB[i] = fg[randomInt(0, 1)]
}

pipes = [pipeA, pipeB]


$fx.features({
  "Palette": palName,
  "Round?": roundness,
  "Pipe Complexity": pipeDens,
})

function setup() {
  createCanvas(w, h, WEBGL);
  if(pxSize == 1) {
    pixelDensity(1)
  } else if (pxSize == 2) {
    pixelDensity(2)
  } else if (pxSize == 3) {
    pixelDensity(3)
  }
  recur = createGraphics(w, h, WEBGL)
  canv = createGraphics(w, h)
  p = createGraphics(w, h)
  c = createGraphics(w, h)
  b = createGraphics(w, h)
  g = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  // noLoop()
  // p.noLoop()
  // c.noLoop()
}

function draw() {
  background(bgc)
  p.background(bgc)
  c.background(0)
  p.rectMode(CENTER)
  //Sketch
  if(frameCount == 1) {
    tileGrid()
  }
  
  for(let i = 0; i < tiles.length; i++) {
    tiles[i].ezCurve()
  }
  //Post processing
   lastPass = false
   bgc = color(bgc)
   recur.shader(shade)
   shade.setUniform("u_resolution", [w, h]);
   shade.setUniform("pxSize", pxSize)
   shade.setUniform("p", p);
   shade.setUniform("g", g);
   shade.setUniform("c", c);
   shade.setUniform("seed", randomVal(0, 10));
   shade.setUniform("marg", map(marg, 0, w, 0, 1));
   shade.setUniform("lastPass", lastPass)
   shade.setUniform("bgc", [
     bgc.levels[0] / 255,
     bgc.levels[1] / 255,
     bgc.levels[2] / 255,
   ]);

   //final display pass
   lastPass = true
   shade.setUniform("lastPass", lastPass)
   shade.setUniform("p", p)
   recur.rect(0, 0, w, h)
   image(recur, -w/2, -h/2)

   //render preview
   fxpreview()
}
