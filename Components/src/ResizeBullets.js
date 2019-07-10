export const DECISION_BULLETS_POSITION = (Bullets,BulletSize) => {

    let BulletSizeHalf = `${parseInt(BulletSize)/2}px`
    let MinusBulletSize = `-${BulletSize}`

    for (let index = 0; index < Bullets.length; index++) {

        if(index === 0){
            Bullets[index].style.top = MinusBulletSize
            Bullets[index].style.left = MinusBulletSize
            Bullets[index].style.cursor = 'nw-resize'
        }

        if(index === 1){
            Bullets[index].style.top = MinusBulletSize
            Bullets[index].style.left = `calc(50% - ${BulletSizeHalf})`
            Bullets[index].style.cursor = 'n-resize'
        }

        if(index === 2){
            Bullets[index].style.top = MinusBulletSize
            Bullets[index].style.right = MinusBulletSize
            Bullets[index].style.cursor = 'ne-resize'
        }

        if(index === 3){
            Bullets[index].style.top = `calc(50% - ${BulletSizeHalf})`
            Bullets[index].style.left = MinusBulletSize
            Bullets[index].style.cursor = 'w-resize'
        }

        if(index === 4){
            Bullets[index].style.top = `calc(50% - ${BulletSizeHalf})`
            Bullets[index].style.right = MinusBulletSize
            Bullets[index].style.cursor = 'e-resize'
        }

        if(index === 5){
            Bullets[index].style.bottom = MinusBulletSize
            Bullets[index].style.left = MinusBulletSize
            Bullets[index].style.cursor = 'sw-resize'
        }

        if(index === 6){
            Bullets[index].style.bottom = MinusBulletSize
            Bullets[index].style.left = `calc(50% - ${BulletSizeHalf})`
            Bullets[index].style.cursor = 's-resize'
        }

        if(index === 7){
            Bullets[index].style.bottom = MinusBulletSize
            Bullets[index].style.right = MinusBulletSize
            Bullets[index].style.cursor = 'se-resize'
        }
        
    }


}

export const ATTACH_RESIZE_HANDLER = (Bullets) => {

    Bullets.forEach((el,index) => {

        if(index === 0){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'NW')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_NW)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_NW)
            })

        }

        if(index === 1){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'N')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_N)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_N)
            })

        }

        if(index === 2){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'NE')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_NE)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_NE)
            })

        }

        if(index === 3){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'W')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_W)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_W)
            })

        }

        if(index === 4){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'E')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_E)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_E)
            })

        }

        if(index === 5){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'SW')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_SW)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_SW)
            })

        }

        if(index === 6){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'S')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_S)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_S)
            })

        }

        if(index === 7){

            el.addEventListener('mousedown',(event)=>{
                handleMouseDown(event,'SE')
            })

            el.addEventListener('mouseleave',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_SE)
            })

            el.addEventListener('mouseup',(event)=>{
                event.target.removeEventListener('mousedown',handleMouseDown)
                event.target.removeEventListener('mousemove',handleMouseMove_SE)
            })

        }

    })

}

const handleMouseDown = (event,direction) => {

    let initialMouseClientX = event.clientX
    let initialMouseClientY = event.clientY

    switch(direction){

        case 'NW':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_NW(event,initialMouseClientX,initialMouseClientY)
            })
        case 'N':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_N(event,initialMouseClientX,initialMouseClientY)
            })
        case 'NE':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_NE(event,initialMouseClientX,initialMouseClientY)
            })
        case 'W':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_W(event,initialMouseClientX,initialMouseClientY)
            })
        case 'E':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_E(event,initialMouseClientX,initialMouseClientY)
            })
        case 'SW':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_SW(event,initialMouseClientX,initialMouseClientY)
            })
        case 'S':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_S(event,initialMouseClientX,initialMouseClientY)
            })
        case 'SE':
            return event.target.addEventListener('mousemove',(event)=>{
                handleMouseMove_SE(event,initialMouseClientX,initialMouseClientY)
            })    

        default : 
            return

    }
   
}

const handleMouseMove_NW = (event,ICX,ICY) => {

    // let targetResizeImage = event.target.parentNode.querySelector('img')
    // targetResizeImage.style.transformOrigin = '100% 100%'
    // targetResizeImage.width = targetResizeImage.width + event.movementX
    // targetResizeImage.height = targetResizeImage.height + event.movementY

}

const handleMouseMove_N = (event,ICX,ICY) => {

    // let targetResizeImage = event.target.parentNode.querySelector('img')
    
    // targetResizeImage.height = targetResizeImage.height + event.movementY

}

const handleMouseMove_NE = (event,ICX,ICY) => {

    // let targetResizeImage = event.target.parentNode.querySelector('img')
    
    // targetResizeImage.width = targetResizeImage.width + event.movementX
    // targetResizeImage.height = targetResizeImage.height + event.movementY

}

const handleMouseMove_W = (event,ICX,ICY) => {

    // let targetResizeImage = event.target.parentNode.querySelector('img')
    
    // targetResizeImage.width = targetResizeImage.width + event.movementX
   
}

const handleMouseMove_E = (event,ICX,ICY) => {

    let targetResizeImage = event.target.parentNode.querySelector('img')
    
    targetResizeImage.width = targetResizeImage.width + event.movementX
    
}

const handleMouseMove_SW = (event,ICX,ICY) => {

    // let targetResizeImage = event.target.parentNode.querySelector('img')
    
    // targetResizeImage.width = targetResizeImage.width + event.movementX
    // targetResizeImage.height = targetResizeImage.height + event.movementY

}

const handleMouseMove_S = (event,ICX,ICY) => {

    let targetResizeImage = event.target.parentNode.querySelector('img')
    
    targetResizeImage.height = targetResizeImage.height + event.movementY

}

const handleMouseMove_SE = (event,ICX,ICY) => {

    let targetResizeImage = event.target.parentNode.querySelector('img')
    
    targetResizeImage.width = targetResizeImage.width + event.movementX
    targetResizeImage.height = targetResizeImage.height + event.movementY

}