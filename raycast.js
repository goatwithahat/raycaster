function raycast(originx, originy, angle, drawfinal = false, draw = false){

    var cos = Math.cos(angle)
    var sin = Math.sin(angle)

    var posx = cos > 0
    var posy = sin > 0

    var currentx = originx
    var currenty = originy

    var gridx = Math.floor(currentx / levelfactor)
    var gridy = Math.floor(currenty / levelfactor)

    var xdist = posx ? (gridx + 1) * levelfactor - currentx : gridx * levelfactor - currentx
    var ydist = posy ? (gridy + 1) * levelfactor - currenty : gridy * levelfactor - currenty

    var xvoid = true
    var yvoid = true

    var xwalltype = 0
    var ywalltype = 0

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    xdist = calcxdist()

    function calcxdist(){
        currentx = originx
        currenty = originy

        currentx += cos / cos * xdist
        currenty += sin / cos * xdist

        gridx = posx ? Math.floor(currentx / levelfactor) : Math.floor(currentx / levelfactor) - 1
        gridy = Math.floor(currenty / levelfactor)

        while(level[gridy] != undefined && level[gridy][gridx] != undefined && level[gridy][gridx] == 0){
            
            currentx += cos / cos * levelfactor * Math.sign(cos)
            currenty += sin / cos * levelfactor * Math.sign(cos)

            gridx = posx ? Math.floor(currentx / levelfactor) : Math.floor(currentx / levelfactor) - 1
            gridy = Math.floor(currenty / levelfactor)
        }

        if(draw){
            ctx.beginPath()
            ctx.moveTo(originx, originy)
            ctx.lineTo(currentx, currenty)
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#00FFFF"
            ctx.stroke()
        }

        if(level[gridy] != undefined && level[gridy][gridx] != undefined){
            xvoid = false
            xwalltype = level[gridy][gridx]
        }


        return Math.hypot(currentx - originx, currenty - originy)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ydist = calcydist()

    function calcydist(){
        currentx = originx
        currenty = originy

        currentx += cos / sin * ydist
        currenty += sin / sin * ydist
        
        gridx = Math.floor(currentx / levelfactor)
        gridy = posy ? Math.floor(currenty / levelfactor) : Math.floor(currenty / levelfactor) - 1

        while(level[gridy] != undefined && level[gridy][gridx] != undefined && level[gridy][gridx] == 0){
            
            currentx += cos / sin * levelfactor * Math.sign(sin)
            currenty += sin / sin * levelfactor * Math.sign(sin)

            gridx = Math.floor(currentx / levelfactor)
            gridy = posy ? Math.floor(currenty / levelfactor) : Math.floor(currenty / levelfactor) - 1
        }

        if(draw){
            ctx.beginPath()
            ctx.moveTo(originx, originy)
            ctx.lineTo(currentx, currenty)
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#FFFF00"
            ctx.stroke()
        }

        if(level[gridy] != undefined && level[gridy][gridx] != undefined){
            yvoid = false
            ywalltype = level[gridy][gridx]
        }

        return Math.hypot(currentx - originx, currenty - originy)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if(drawfinal){
        ctx.beginPath()
        ctx.lineWidth = 1
        if(xdist < ydist){
            ctx.moveTo(originx, originy)
            ctx.lineTo(originx + cos * xdist, originy + sin * xdist)
            ctx.strokeStyle = "#0000FF"
        }else{
            ctx.moveTo(originx, originy)
            ctx.lineTo(originx + cos * ydist, originy + sin * ydist)
            ctx.strokeStyle = "#FF0000"
        }
        ctx.stroke()
    }

    if(xdist > ydist){
        var ray = {
            dist: ydist,
            xwall:  false,
            walltype: yvoid ? -1 : ywalltype,
            xpos: originx + cos * ydist,
            ypos: originy + sin * ydist
        }
    }else{
        var ray = {
            dist: xdist,
            xwall: true,
            walltype: xvoid ? -1 : xwalltype,
            xpos: originx + cos * xdist,
            ypos: originy + sin * xdist
        }
    }

    return ray
}

