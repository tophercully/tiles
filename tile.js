class Tile {
    constructor(x, y, wid, hei) {
        this.pos = createVector(x, y)
        this.wid = wid
        this.hei = hei


        this.bgCol = bg[randomInt(0, 1)]
        this.connectA = randomInt(1, 4)
        this.connectB = randomInt(1, 4)

        while(this.connectA == this.connectB) {
            this.connectB = randomInt(1, 4)
        }

        this.ptA = createVector(x+(cos(this.connectA*90)*((wid/2)+10)), y+(sin(this.connectA*90)*((hei/2)+10)))
        this.ptB = createVector(x+(cos(this.connectB*90)*((wid/2)+10)), y+(sin(this.connectB*90)*((hei/2)+10)))
        this.pipeType = pipes[randomInt(0, 1)]
        this.dashArray = []
        for(let i = 0; i < pipeDens; i++) [
            this.dashArray[i] = [randomVal(20, max([this.wid, this.hei])), randomVal(5, 100)]
        ]
    }

    ezCurve() {
        //fill the background of tile
        p.fill(this.bgCol)
        p.noStroke()
        p.rect(this.pos.x, this.pos.y, this.wid+2, this.hei+2)

        //fill the path
        if(roundness == true) {
            p.strokeJoin(ROUND)
        }
        p.drawingContext.lineDashOffset = frameCount
        for(let i = 0; i < pipeDens; i++) {
            p.drawingContext.setLineDash(this.dashArray[i])

            p.strokeCap(SQUARE)
            p.stroke(this.pipeType[i])
            p.strokeWeight(min([this.wid, this.hei])*map(i, 0, pipeDens, 0.5, 0.05))
            
            p.noFill()
            p.beginShape() 
            p.vertex(this.ptA.x, this.ptA.y)
            p.vertex(this.ptA.x, this.ptA.y)
            p.vertex(this.pos.x, this.pos.y)
            p.vertex(this.ptB.x, this.ptB.y)
            p.vertex(this.ptB.x, this.ptB.y)
            p.endShape()
        }
        
        
    }
}
