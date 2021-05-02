var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadImage= (src, callback) =>{
    let img = document.createElement("img");
    img.onload= () =>callback(img);
    img.src=src;
};

let imagePath = (framenumber, animation) => {
    return ("images/"+ animation +"/" +framenumber + ".png");
};

let frames = {
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],   
};

let loadImages = (callback) => {
    let images= {idle:[], kick: [], punch: [], };
    let imagesToLoad = 0;

    ["idle","kick","punch"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((frameNumber) =>{
            let path = imagePath(frameNumber, animation);

            loadImage(path, (image) => {
                 images[animation][frameNumber-1] = image;
                 imagesToLoad = imagesToLoad - 1;
 
                 if(imagesToLoad === 0) {
                 callback(images);
                 }
            });
        });            
    });
};


let animate = (ctx, images, animation, callback) => {
    
    
    images[animation].forEach((image, index) => {
        setTimeout(() =>{
            ctx.clearRect(0,0,400,400);
            ctx.drawImage(image,0,0,400,400);
        }, index *100);
    });
    
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) =>{
    let queuedAnimations = [];

    let aux =() =>{
        let selectedanimation ;

        if(queuedAnimations.length ===0)
        {
            selectedanimation ="idle";
        }else{
            selectedanimation = queuedAnimations.shift();
        }
        
        animate(ctx,images, selectedanimation, aux);
    };

        aux();
        
        document.getElementById("Kick").onclick = () => {
            queuedAnimations.push("kick");
        };

        document.getElementById("Punch").onclick = () => {
            queuedAnimations.push("punch");
        };
        
    
        document.addEventListener('keyup', (event) => {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            
            if(key === "ArrowLeft"){
                queuedAnimations.push("kick");

            }else if(key === "ArrowRight")
            {
                queuedAnimations.push("punch");
            }
            
        
        
        
        });
});


