var splitter, cont1, cont2;
var last_y, window_height;

function mouse_init( splitter_id, cont1_id, cont2_id )
{
    splitter = document.getElementById( splitter_id );
    cont1 = document.getElementById( cont1_id );
    cont2 = document.getElementById( cont2_id );
    splitter.removeEventListener( "mousedown", spMouseDown );
    window.removeEventListener( "mousemove", spMouseMove );
    window.removeEventListener( "mouseup", spMouseUp );
    
    window_height = window.innerHeight;
    
    let dy = cont1.clientHeight;
    splitter.style.marginTop = dy+"px";
    dy += splitter.clientHeight;
    cont2.style.marginTop = (dy+3)+"px";
    
    dy = window_height-dy;
    cont2.style.height = dy+"px";
    splitter.addEventListener("mousedown",spMouseDown);
}

function spMouseDown(e)
{
    splitter.removeEventListener("mousedown",spMouseDown);
    window.addEventListener("mousemove",spMouseMove);
    window.addEventListener("mouseup",spMouseUp);
    last_y = e.clientY;
}

function spMouseUp(e)
{
    window.removeEventListener("mousemove",spMouseMove);
    window.removeEventListener("mouseup",spMouseUp);
    splitter.addEventListener("mousedown",spMouseDown);
    resetPosition( last_y );
}

function spMouseMove(e)
{
    resetPosition(e.clientY);
}

function resetPosition( nowY )
{
    if ( nowY <= 50 ){
        return;
    }
    let dy = nowY - last_y;
    dy += cont1.clientHeight;
    cont1.style.height = dy+"px";
    splitter.style.marginTop = dy+"px";
    dy += splitter.clientHeight;
    cont2.style.marginTop = (dy+3)+"px";
    dy = window_height-dy;
    cont2.style.height = dy+"px";
    last_y = nowY;
    cont1.style.clip = "rect(auto auto " + last_y + "px" + " auto)";
}

function clip_enable( switch_flag ){
    switch( switch_flag ){
        case "on":
            cont1.style.clip = "rect(auto auto " + last_y + "px" + " auto)";
            break;
        case "off":
            cont1.style.clip = "auto";
        default:
            break;
    }
}