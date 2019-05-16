document.addEventListener('DOMContentLoaded', ()=>{

    let canvas = document.getElementById('myCanvas');
    let c = canvas.getContext('2d');
    let w;
    let h;


    function setDimensions(){
        w = document.getElementsByTagName('body')[0].clientWidth;
        h = document.getElementsByTagName('body')[0].clientHeight;
        canvas.width = w;
        canvas.height = h;
    }

    setDimensions();


}); //end of document ready