import {tetris} from "./tetris";
import {bonus} from "./bonus";

export const gw = {
    "overlay": {
        "animation": {
            width: 680,
            height: 865,
            "displayed": {
                x: 0,
                y: 0
            },
            "sources": {
                x: 0,
                y: 0
            }
        }
    },
    "tetris":tetris,
    "bonus": bonus,
    "currentWindow":"start",
    init(game){
        this.game = game
        tetris.init(game)
        bonus.init(game)
    },
    update(){
        this.overlay.animation.displayed.width = this.overlay.animation.width
        this.overlay.animation.displayed.height = this.overlay.animation.height
        this.overlay.animation.sources.width = this.overlay.animation.width
        this.overlay.animation.sources.height = this.overlay.animation.height
        if(this.currentWindow === "tetris"){

            this.overlay.animation.sources.y=0
            if(this.game.datas.play){
                tetris.update()
                bonus.update()
            }
        }
        if(this.currentWindow === "start"){
            this.overlay.animation.sources.y=865
            if(this.game.controlers.pressedKeys === 32){
                this.currentWindow = "tetris"
            }
        }
        if(this.currentWindow === "lost"){
            this.overlay.animation.sources.y=865*2
            if(this.game.controlers.pressedKeys === 32){
                window.location = "index.html"
            }
        }
        this.game.drawObject(this.overlay)
    }
}