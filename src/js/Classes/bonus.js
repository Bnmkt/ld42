import {Piece} from "./piece";

export const bonus = {
    "x": 440,
    "y": 440,
    "listName":["normal", "Slow", "Speedy", "deadBlocks", "Cancer", "Luck"],
    "list": {},
    init(game) {
        this.game = game
        this.list = {
            "normal": {
                name:"Normal",
                description: "Nothing",
                effect: () => {

                }
            },
            "Slow": {
                name: "Slowed",
                description: "You're slowed",
                effect: () => {
                    this.game.window.tetris.speed = 18
                },
                "affect":"speed",
                duration: 600
            },
            "Speedy":{
                name: "Speedy",
                description: "Heyaaa, Let it Rip!",
                effect: () => {
                    this.game.window.tetris.speed = 2
                },
                "affect":"speed",
                duration:300
            },
            "Luck":{
                name: "Lucky one",
                description: "10% of your block are vanished",
                effect: () => {

                    this.game.window.tetris.pieces.forEach(piece=>{
                        if(Math.random()*100>90){
                            piece.alive = false
                        }
                    })
                }
            },
            "Cancer":{
                name: "Cancer",
                description: "Oh shit! waddup",
                effect: () => {
                    for(let i=0; i < 16; i++){
                        this.game.window.tetris.pieces.push(new Piece(this.game, Math.floor(Math.random()*13), Math.floor(Math.random()*3), 6))
                    }
                }
            },
            "deadBlocks":{
                name:"You're dead to me",
                description: "36% of your bocks are dead",
                effect: () => {
                    this.game.window.tetris.pieces.forEach(piece=>{
                        if(Math.random()*100>64 && !piece.isMov){
                            piece.dead = true
                            piece.type = 6
                        }
                    })
                },
                duration:5
            }
        }
    },
    update() {
        this.game.ctx.font = "20px arial"
        this.game.ctx.textAlign = "center"
        this.game.ctx.fillText(`Times left`, this.x + (190 / 2), this.y + 20)
        this.game.ctx.fillText(`${this.game.window.tetris.time.toString().toHHMMSS()}`, this.x + (190 / 2), this.y + 45)
        this.game.ctx.fillText(`Bonus : ${this.game.window.tetris.bonusName}`, this.x + (190 / 2), this.y + 85)
        this.game.ctx.font = "15px arial"
        this.game.ctx.fillText(`${this.game.window.tetris.bonusDesc}`, this.x + (190 / 2), this.y + 105)
        this.game.ctx.fillText(`${this.game.window.tetris.bonusDuration!==-1?(this.game.window.tetris.bonusDuration.toString().toHHMMSS()):""}`, this.x + (190 / 2), this.y + 125)
    }
}