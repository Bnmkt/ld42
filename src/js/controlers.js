export const controlers = {
    "window":{
        resize:false
    },
    "vars":{
    },
    "allowedKeys":[90,81,83,68,37,38,39,40,32],
    "pressedKeys":[],
    init(){
        const changeDatas = e=>{
            const el = e.target
            if(!el.getAttribute("data-action"))return false
            let action = el.getAttribute("data-action")
            let value = el.value
            this.vars[action]=el.value
            el.parentElement.querySelector(".value").textContent = value
        }
        const keyD = e=>{
            if(this.allowedKeys.indexOf(e.keyCode) !== -1){
                if(!this.pressedKeys){
                    this.pressedKeys = e.keyCode
                }
            }
        }
        const keyU = e=>{
            if(this.allowedKeys.indexOf(e.keyCode) !== -1){
                if(this.pressedKeys){
                    this.pressedKeys = null
                }
            }
        }
        window.addEventListener("mouseup", changeDatas, false)
        window.addEventListener("keydown", keyD, false)
        window.addEventListener("keyup", keyU, false)
    },
    update(){
    }
}