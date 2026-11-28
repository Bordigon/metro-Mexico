import React from "react";
import miFondo from '../assets/monterrey_gris_baja_res.png'
export const MAP_X = -537;
export const MAP_Y = -513;
export const MAP_W = 3000;
export const MAP_H = 3000;

const Mapa = () => {
    return (
        <div>
            <img
                src={miFondo}
                draggable={false}
                style={{
                    position: 'absolute',
                    zIndex: -1,
                    transform: `translate(${MAP_X}px, ${MAP_Y}px)`,
                    opacity: 0.3,
                    pointerEvents: 'none',
                    width: MAP_W,
                    height: MAP_H,
                }}
            />
        </div>
    )
}

export default Mapa;