import {pieces} from "../pieces";

export class Piece {
    constructor(game, x, y, type){
        this.alive = true
        this.id = 0
        this.type=0
        this.dead = false
        this.x=x
        this.y=y
        this.blocked = false
        this.grow = 1
        this.touch = []
        this.game = game
        this.isMov = true
        this.lastBreath = true
        this.type = (type!==undefined)? type : Math.floor(Math.random()*6)
        // this.type = 1
        console.log(type, this.type)
    }
    getColor(){
        switch (this.type){
            case 1:
                return {x:680,y:0}
                break;
            case 2:
                return {x:706,y:0}
                break;
            case 3:
                return {x:732,y:0}
                break;
            case 4:
                return {x:758,y:0}
                break;
            case 5:
                return {x:784,y:0}
                break;
            case 6:
                this.blocked = true
                return {x:836,y:0}
                break;
            case 0: default:
                return {x:810,y:0}
                break;
        }
    }
    isMoving(){
        return this.isMov
    }
    draw(){
        const x = this.game.window.tetris.x + this.x*26
        const y = this.game.window.tetris.y + this.y*26
        const animation = {
            "sources":this.getColor(),
            "displayed":{
                "width":26*this.grow,
                "height":26*this.grow,
                x,
                y
            }
        }
        animation.sources.width = 26
        animation.sources.height= 26
        this.game.drawObject({animation})
    }
    checkSim(){
        allPieces.forEach(piece=>{
            if(piece.type === this.type && piece.alive && !piece.isMov){
                const px = piece.x
                const py = piece.y
                const x = this.x
                const y = this.y
                if((x-1 === px || x+1 === px || x === px) && py === y-1) touch.push(piece)
                if((x-1 === px || x+1 === px || x === px) && py === y+1) touch.push(piece)
                if((x-1 === px || x+1 === px) && py === y) touch.push(piece)

            }
        })
    }
    moveTo(nx, ny){
        const allPieces = this.game.window.tetris.pieces
        let occupied = false
        let touch = []
        if(this.game.window.tetris.bannedCol.indexOf(nx)!==-1)nx = this.x
        allPieces.forEach(piece=>{
            let trigger = false
            if((piece.x === nx && piece.y === ny) && piece.id !== this.id && piece.isMov === false && piece.alive === true){
                occupied = true
            }
            if(piece.type === this.type && piece.alive && !piece.isMov && !this.isMov){
                const px = piece.x
                const py = piece.y
                const x = this.x
                const y = this.y
                if(((x+1 === px || x-1 === px) && py === y) || ((y+1 === py || y-1 === py) && px === x) && !trigger){
                    let isInTouch = false
                    this.touch.forEach(ttp=>{
                        if(isInTouch) return
                        if(piece.id === ttp.id){
                            isInTouch = true
                        }
                    })
                    if(!isInTouch && piece.id !== this.id){
                        this.touch.push(piece)
                        this.touch.forEach(ttp=>{
                            ttp.touch = this.touch
                        })
                    }
                }

            }
        })
        if(this.y === 25){
            occupied = true
        }
        if(!occupied){
            this.x = nx
            this.y = ny
        }
        if(occupied){
            this.isMov = false

        }
        if(this.touch.length>4){
            this.touch.forEach(piece=>{
                if(!piece.dead) piece.alive = false
            })
        }
    }
    keyEvent(){
        let a = false
        switch (this.game.controlers.pressedKeys){
            case 81: case 37: // LEFT
                    this.moveTo(this.x-1, this.y)
                a = true
                break;
            case 83: case 40: // BOT
                break
            case 68: case 39: // RIGHT
                this.moveTo(this.x+1, this.y)
                a = true
                break;
            case 90: case 38: // TOP
                break;
        }
    }
    update(){
        if(!this.alive) return
        if(this.game.datas.frame % this.game.window.tetris.speed === 0 && this.isMov) {
            this.keyEvent()
        }else if(this.lastBreath){
            this.moveTo(this.x, this.y)
        }
        if(this.game.datas.frame % this.game.window.tetris.speed === 0 && !this.blocked){
            this.moveTo(this.x, this.y + 1)
        }
        this.draw()
    }
}