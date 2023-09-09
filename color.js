bgc = 'white'

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}

//Palettes
const source = [
  "#097857",
  "#E3CE61",
  "#E35A7E",
  "#EE692A",
  "#217F96",

];
const bau = [
  "#1267b7",
  "#ec3e2b",
  "#f6b81a",
]
const elliot = [
  "#E73542",
  "#F6A026",
  "#2CA8C4",
  "#EE7140",
  "#289C5B",
]

mutant = ["#EC521A","#3656C9","#AD80C3","#74BFFE","#FF3B09","#047B37","#FE7BA1"]

const pals = [elliot, bau, mutant];

const palNames = [
  "Elliot",
  "Bau",
  "Mutant"
];

//Palette parameters
palNum = randomInt(0, pals.length-1);
pal = pals[palNum];
palName = palNames[palNum];


console.log(palName)
//Shuffle that full palette
truePal = shuff(pal);

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);
