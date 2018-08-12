import {Piece} from "./piece";

export const tetris = {
    "x":50,
    "y":138,
    "tx":440,
    "ty":138,
    "pieces":[],
    "nextType":[],
    "bannedCol":[-2,14],
    "time":300,
    "lastUpdate":0,
    "lastBonusUpdate":0,
    "speed": 12,
    "bonusDuration":-1,
    "bonusDesc":"",
    "bonusName":"",
    "beforeBonus":{"affected":""},
    init(game){
        this.game = game
    },
    update(){
        const lastBan = this.bannedCol.length-1
        const lbl = lastBan-1
        if(this.game.datas.frame % 60 === 0) {
            this.time--
        }
        if(this.time%30===0 && this.time!==this.lastUpdate){
            if(this.speed>1)this.speed--
            if(lastBan<13){
                this.bannedCol.push(this.bannedCol[lbl]+1)
                this.bannedCol.push(this.bannedCol[lastBan]-1)
            }
            this.lastUpdate = this.time
        }
        if(this.time%19===0 && this.time!== this.lastBonusUpdate){
            const rBonus = Math.floor(Math.random()*this.game.window.bonus.listName.length)
            const bonus = this.game.window.bonus.list[this.game.window.bonus.listName[rBonus]]
            if(bonus){
                if(bonus.duration){
                    this.bonusDuration = bonus.duration
                }else{
                    this.bonusDuration = -1
                }
                this.bonusName = bonus.name
                this.bonusDesc = bonus.description
                if(bonus.affect){
                    this.beforeBonus = {"affected": bonus.affect}
                    this.beforeBonus[bonus.affect] = this.game.window.tetris[bonus.affect]
                }
                bonus.effect()
            }
            this.lastBonusUpdate = this.time
        }
        if(this.bonusDuration!==-1){
            if(this.bonusDuration > 0){
                this.bonusDuration--
            }else{
                this.game.window.tetris[this.beforeBonus.affected] = this.beforeBonus[this.beforeBonus.affected]
                this.beforeBonus = {}
                this.bonusName = "Normal"
                this.bonusDesc = "Meh"
                this.bonusDuration = -1
            }
        }
        if(this.nextType.length===0){
            this.nextType[0] = Math.floor(Math.random()*6)
            this.nextType[1] = Math.floor(Math.random()*6)
            this.nextType[2] = Math.floor(Math.random()*6)
            this.nextType[3] = Math.floor(Math.random()*6)
            this.pieces[0] = new Piece(this.game, 17.5, 3)
            this.pieces[0].isMov = false
            this.pieces[0].blocked = true
            this.pieces[0].grow = 2
            this.pieces[1] = new Piece(this.game, 16.5, 6.9)
            this.pieces[1].isMov = false
            this.pieces[1].blocked= true
            this.pieces[2] = new Piece(this.game, 18, 6.9)
            this.pieces[2].isMov = false
            this.pieces[2].blocked= true
            this.pieces[3] = new Piece(this.game, 19.4, 6.9)
            this.pieces[3].isMov = false
            this.pieces[3].blocked= true

        }
        let pieceMoving = false
        this.pieces.forEach(piece=>{
            if(!piece.alive) return
            if(piece.isMoving()) pieceMoving = true
            if(piece.isMoving() === false && piece.y<=0){
                this.game.window.currentWindow = "lost"
                console.log("meh");
            }
            piece.update()

        })
        if(!pieceMoving){
            const r = Math.floor(Math.random()*12)
            const np = new Piece(this.game, r, 0, this.nextType[0])
            this.nextType.shift()
            this.nextType[3] = Math.floor(Math.random()*6)
            this.pieces[0].type = this.nextType[0]
            this.pieces[1].type = this.nextType[1]
            this.pieces[2].type = this.nextType[2]
            this.pieces[3].type = this.nextType[3]
            np.id = this.pieces.length
            this.pieces.push(np)
        }

        this.game.ctx.font = "20px arial"
        this.game.ctx.textAlign = "center"
        this.game.ctx.fillText(`Next blocks`, 440+(190/2)-5, this.y+33)

        this.bannedCol.forEach(col=>{
            this.game.drawObject({
                "animation":{
                    "sources":{"width":26, "height":664, "x":680, "y":26},
                    "displayed":{"width":26, "height":664, "x":this.x+col*26, "y":this.y+12},

                }
            })
        })
    }
}