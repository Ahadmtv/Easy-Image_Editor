const file=document.getElementById('file');
const select = document.querySelector('.control:nth-child(2)'),
image=document.querySelector('.image-preview img'),
filterbtn=document.querySelectorAll('.filter .btn'),
range=document.querySelector('.range-sec input'),
filterName=document.getElementById('filter-name'),
filterValue=document.getElementById('filter-value'),
rotates=document.querySelectorAll('.rotates .btn'),
resetbtn=document.getElementById('reset'),
brightnessbtn=document.getElementById('brightness'),
saveimagebtn=document.getElementById('save-image'),
wrapper=document.querySelector('.wrapper');

let brightness=100,saturation=100,inversion=0,grayscale=0;
let circle=0,vertical=1,horizental=1;
range.value=100;
resetbtn.addEventListener('click',()=>{
    brightness=100,saturation=100,inversion=0,grayscale=0;
    circle=0,vertical=1,horizental=1;
    image.style.transform=`rotate(${circle}deg) scale(${horizental}, ${vertical})`;
    image.style.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale/2}%) invert(${inversion/2}%)`;
    brightnessbtn.click();
});

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(circle !== 0) {
        ctx.rotate(circle * Math.PI / 180);
    }
    ctx.scale(horizental, vertical);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

const applyRotate=function(){
    image.style.transform=`rotate(${circle}deg) scale(${horizental}, ${vertical})`;

}
const active=function(e){
    filterbtn.forEach((btn)=>{
        if(btn.classList.contains('active')){
            btn.classList.remove('active');
        }
    });
    e.target.classList.toggle('active');
    filterName.textContent=e.target.textContent;
    if(e.target.textContent==='Brightness'){
        range.value=brightness;
        filterValue.textContent=range.value +'%';
    }else if(e.target.textContent==='Saturation'){
        range.value=saturation;
        filterValue.textContent=range.value +'%';
    }else if(e.target.textContent==='Inversion'){
        range.value=inversion;
        filterValue.textContent=range.value +'%';
    }else if(e.target.textContent==='Grayscale'){
        range.value=grayscale;
        filterValue.textContent=range.value +'%';
    }
}


select.addEventListener('click',()=>{
    file.click();
});
file.addEventListener('change',()=>{
    let files=file.files[0];
    let filesUrl=URL.createObjectURL(files);
    image.src=filesUrl;
});

filterbtn.forEach((btn)=>{
btn.addEventListener('click',active)
});

range.addEventListener('input',()=>{
    filterValue.textContent=range.value +'%';
    if(filterName.textContent==='Brightness'){
        brightness=range.value;
        image.style.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale/2}%) invert(${inversion/2}%)`
    }else if(filterName.textContent==='Saturation'){
        saturation=range.value;
        image.style.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale/2}%) invert(${inversion/2}%)`
    }else if(filterName.textContent==='Inversion'){
        inversion=range.value;
        image.style.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale/2}%) invert(${inversion/2}%)`
    }else if(filterName.textContent==='Grayscale'){
        grayscale=range.value;
        image.style.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale/2}%) invert(${inversion/2}%)`
    }
});
rotates.forEach((rotate)=>{
    rotate.addEventListener('click',(e)=>{
        if(rotate.id==='left'){
            circle+=90;
        }else if(rotate.id==='right'){
            circle-=90;
        }else if(rotate.id==='vertical'){
            vertical=vertical===1 ? -1:1;
        }else if(rotate.id==='horizental'){
            horizental=horizental===1 ? -1:1;
        }
        applyRotate();
    });
});
saveimagebtn.addEventListener('click',saveImage);
file.addEventListener('change',()=>{
    wrapper.classList.remove('off');
    resetbtn.classList.remove('off');
    saveimagebtn.classList.remove('off');
});


