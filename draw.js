var canvas;
var base = document.getElementById("1");
var col = document.getElementById("color");
var b = document.getElementById("bSize");
var br = document.getElementById("brush");
var L = document.getElementById("lSize");
var ctx;
// ctx.fillRect(0, 0, 10, 10);
// var imgData = ctx.getImageData(0, 0, 10, 10);
var painter;
var C;
var I;
var brush = br.value;
var color = col.value;
var size = b.value;
var lineW = L.value;

I = document.createElement("SVG");
I.id = "b";
I.src = "./brush.svg";
base.append(I);

function start(event) {
    event.preventDefault();
    console.log("start");
    painter = true;
}

function drawing(event) {
    event.preventDefault();
    console.log("touch");
    if (painter === true) {
        var ctx = C.getContext("2d");

        if (event.touches != undefined)
        {
            var rect = event.target.getBoundingClientRect();
            var x = event.targetTouches[0].pageX - rect.left;
            var y = event.targetTouches[0].pageY - rect.top;
            // var x = event.touches[0].clientX;
            // var y = event.touches[0].clientY;
        } else {
            var x = event.offsetX-4;
            var y = event.offsetY-4;
        }
        console.log(x);
        console.log(y);
        var s = size/1.1;
        ctx.beginPath();
        if (brush === "roundLine") {
            ctx.strokeStyle = color;
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.stroke(); 
        } else if (brush === "round") {
            ctx.fillStyle = color;
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill(); 
        } else if (brush === "triLine") {
            // ctx.lineJoin = "round";
            ctx.strokeStyle = color;
            ctx.moveTo(x, y - s);
            ctx.lineTo(x - s, y + s);
            ctx.lineTo(x + s, y + s);
            ctx.closePath();
            ctx.stroke();
        } else if (brush === "tri") {
            // ctx.lineJoin = "round";
            ctx.fillStyle = color;
            ctx.moveTo(x, y + s);
            ctx.lineTo(x + s, y - s);
            ctx.lineTo(x - s, y - s);
            ctx.closePath();
            ctx.fill();
        } else if (brush === "squareLine") {
            // ctx.lineJoin = "round";
            ctx.strokeStyle = color;
            ctx.strokeRect(x, y, size, size);
            ctx.stroke();
        } else if (brush === "square") {
            // ctx.lineJoin = "round";
            ctx.fillStyle = color;
            ctx.fillRect(x, y, size, size);
            ctx.fill();
        } /* else if (brush === "lucas" || "fibonacci") {
            var num = numberz(brush,15);
            var m = size/1.5;
            var n1 = true;
            var n2 = false;
            var n3 = false;
            var n4 = false;
            var x = event.offsetX-4;
            var y = event.offsetY-4;
            ctx.moveTo(event.offsetX-4,event.offsetY-4);
            for (let i = 5; i < num.length; i++) {
                if (n1) {
                    ctx.strokeStyle = color;
                    ctx.arc(x + num[i], y + num[i], m, 0, 2 * Math.PI);
                    ctx.stroke(); 
                    n1 = false;
                    n2 = true;
                } else if (n2) {
                    ctx.strokeStyle = color;
                    ctx.arc(x - num[i], y - num[i], m, 0, 2 * Math.PI);
                    ctx.stroke(); 
                    n2 = false;
                    n3 = true;
                } else if (n3) {
                    ctx.strokeStyle = color;
                    ctx.arc(x + num[i], y - num[i], m, 0, 2 * Math.PI);
                    ctx.stroke(); 
                    n3 = false;
                    n4 = true;
                } else if (n4) {
                    ctx.strokeStyle = color;
                    ctx.arc(x - num[i], y + num[i], m, 0, 2 * Math.PI);
                    ctx.stroke(); 
                    n4 = false;
                    n1 = true;
                }
            }
            // ctx.fillStyle = color;
            // ctx.arc(event.offsetX-4, event.offsetY-4, size, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.stroke(); 
        } */
    }
}

function nodraw(event) {
    event.preventDefault();
    painter = false;
}

function checkColor(c) {
    color = c;
} 
function changeSize(s) {
    size = s;
}
function changeWidth(l) {
    ctx.lineWidth = l;
}
function changeBrush(b) {
    brush = b;
}
function newSquare() {
    if (canvas != undefined) {
        canvas.remove();
    }
    C = document.createElement("CANVAS");
    base.append(C);
    C.id = "draw";
    C.width = 400;
    C.height = 400;
    C.addEventListener("mousedown", start);
    C.addEventListener("touchstart", start);
    C.addEventListener("mousedown", drawing);
    C.addEventListener("touchstart", drawing);
    C.addEventListener("touchmove", drawing);
    C.addEventListener("mousemove", drawing);
    C.addEventListener("mouseup", nodraw);
    C.addEventListener("mouseleave", nodraw);
    C.addEventListener("touchend", nodraw);
    C.addEventListener("touchcancel", nodraw);
    ctx = C.getContext("2d");
    ctx.lineWidth = L.value;
    canvas = document.getElementById("draw");
    im = document.getElementById("image");
    
    im.addEventListener("click", function(e) {
        var dataURL = canvas.toDataURL("image/png", 1.0);
    
        downloadImage(dataURL, 'myDrawing.png');
    });
    
    // Save | Download image
    function downloadImage(data, filename = 'untitled.png') {
        var a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }
}


function numberz(type,limit) {

    type = type.toString().toLowerCase().trim();

    if (type === 'fibonacci') {
        let e1 = 1;
        let e2 = 0;
        let f = []
    
        for (let f1 = 0; f1 < limit; f1++) {
            e1 += e2;
            e2 += e1;
            f.push(e1);
            f.push(e2);
        }

        return f;
    }
    else if (type === 'lucas') {
        let e1 = 1;
        let e2 = 3;
        let f = []
    
        for (let f1 = 0; f1 < limit; f1++) {
            if (e1 < 1)
            {
                f.push(e1);
                f.push(e2);
            } else {
                e1 += e2;
                e2 += e1;
                f.push(e1);
                f.push(e2);
            }
        }
        return f;
    }
  }

newSquare();