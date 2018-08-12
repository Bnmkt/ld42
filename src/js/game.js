import {controlers} from "./controlers";
import {gw} from "./Classes/window";

export const game = {
    "canvas": document.querySelector("canvas"),
    "ctx": null,
    "datas": {
        "assetFile": "./assets/images/asset_tiles.png",
        "asset": null,
        "canvas": {
            "width": 680,
            "height": 865
        },
        "pieces": [],
        "frame": 0,
        "speed": 1,
        "play": true
    },
    controlers,
    drawObject(obj) {
        this.ctx.globalAlpha = 1
        this.ctx.save()
        if (!obj.animation) {
            this.ctx.translate(obj.w / 2, obj.h / 2)
            this.ctx.fillStyle = obj.color
            this.ctx.fillRect(obj.x, obj.y, obj.w, obj.h)
        } else {
            const displayed = obj.animation.displayed
            const sources = obj.animation.sources
            this.ctx.translate(displayed.width / 2, displayed.height / 2)
            this.ctx.drawImage(this.datas.asset, sources.x, sources.y, sources.width, sources.height, displayed.x - displayed.width / 2, displayed.y - displayed.height / 2, displayed.width, displayed.height)
            if (obj.r && this.obj.r !== "0") {
                this.ctx.rotate(obj.r)
            }
        }
        this.ctx.restore()
    },
    init() {
        this.ctx = this.canvas.getContext("2d")
        this.controlers.init()
        this.canvas.width = this.datas.canvas.width
        this.canvas.height = this.datas.canvas.height
        this.datas.asset = new Image()
        this.window = gw
        this.window.init(this)
        this.datas.asset.onload = () => {
            this.update()
        }
        this.datas.asset.src = this.datas.assetFile
    },
    update() {
        this.ctx.clearRect(0, 0, this.datas.canvas.width, this.datas.canvas.height)
        this.datas.frame++
        if (this.datas.frame % this.datas.speed === 0) {
            //console.log(this.controlers.pressedKeys)
        }
        this.controlers.update()
        this.window.update()
        window.requestAnimationFrame(e => {
            this.update()
        })
    }
}