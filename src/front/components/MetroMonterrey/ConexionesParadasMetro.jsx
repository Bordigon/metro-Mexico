import { paradasMetro } from "./EstructuraParadasMetro";

export const colorL = (k) =>{
    if(k == 0) return 'yellow'
    else if(k == 1) return 'green'
    else return 'coral'
}

export const conexionesMetro = () =>{
    let result = [];
    let nodos = paradasMetro();
    for(let i = 0; i<nodos.length-1; i++){
        if(nodos[i].id[0]==nodos[i+1].id[0])
            result.push({
                        id:i, 
                        source:nodos[i].id, 
                        target:nodos[i+1].id, 
                        style:{stroke:colorL(nodos[i].id[0])}
                    })
        
    }
    return result;
}
