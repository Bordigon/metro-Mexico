import { Linea1 } from "./LineasM/Linea1";
import { Linea2 } from "./LineasM/Linea2";
import { Linea3 } from "./LineasM/Linea3";
const origen = {x:25.759710090075117, y:-100.36921058426005}

const positionXY = (i, result) =>{
    const y =(origen.x - result[i].coords.x) * 15000;
    const x =-(origen.y - result[i].coords.y) * 19000;
    return {x:x, y:y};
}

export const colorL = (k) =>{
    if(k == 0) return '#fafad2'
    else if(k == 1) return 'lightgreen'
    else return 'lightcoral'
}

export const paradasMetro = () => {
    let paradas = [Linea1, Linea2, Linea3];
    for(let k = 0;k < paradas.length; k++){
        let result = paradas[k];
        for(let i = 0; i<result.length; i++){
            result[i].position=positionXY(i, result);
            result[i].width = 'min-content';
            result[i].id = `${k}`+`${i}`;
            result[i].style={backgroundColor:colorL(k)};
            result[i].draggable=false;
        }
    }
    return [...paradas[0], ...paradas[1], ...paradas[2]];
}

