export const DECISION_BULLETS_POSITION = (Bullets,BulletSize) => {

    let BulletSizeHalf = `${parseInt(BulletSize)/2}px`
    let MinusBulletSize = `-${BulletSize}`

    for (let index = 0; index < Bullets.length; index++) {
        
        if(index === 0){
            Bullets[index].style.top = MinusBulletSize
            Bullets[index].style.left = MinusBulletSize
        }

        if(index === 1){
            Bullets[index].style.top = MinusBulletSize
            Bullets[index].style.left = `calc(50% - ${BulletSizeHalf})`
        }

        if(index === 2){
            Bullets[index].style.top = MinusBulletSize
            Bullets[index].style.right = MinusBulletSize
        }

        if(index === 3){
            Bullets[index].style.top = `calc(50% - ${BulletSizeHalf})`
            Bullets[index].style.left = MinusBulletSize
        }

        if(index === 4){
            Bullets[index].style.top = `calc(50% - ${BulletSizeHalf})`
            Bullets[index].style.right = MinusBulletSize
        }

        if(index === 5){
            Bullets[index].style.bottom = MinusBulletSize
            Bullets[index].style.left = MinusBulletSize
        }

        if(index === 6){
            Bullets[index].style.bottom = MinusBulletSize
            Bullets[index].style.left = `calc(50% - ${BulletSizeHalf})`
        }

        if(index === 7){
            Bullets[index].style.bottom = MinusBulletSize
            Bullets[index].style.right = MinusBulletSize
        }
        
    }



}