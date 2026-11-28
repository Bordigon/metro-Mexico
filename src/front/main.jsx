import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, ControlButton, Panel, ViewportPortal } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Navbar from './components/Navbar.jsx';
import { paradasMetro } from './components/MetroMonterrey/EstructuraParadasMetro.jsx';
import { conexionesMetro } from './components/MetroMonterrey/ConexionesParadasMetro.jsx';
import miFondo from './assets/monterrey_gris_baja_res.png'

const Main = () => {
    const nodes = paradasMetro();
    const edges = conexionesMetro();
    const MAP_X = -537;
    const MAP_Y = -513;
    const MAP_W = 3000;
    const MAP_H = 3000;
    return (
        <div style={{ height: '100vh', width: '100vw' }}>

            <Panel style={{ top: '45vh', left: '10px' }}><Navbar /></Panel>
            <div style={{ height: '100vh', width: '100vw' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    translateExtent={[
                        [MAP_X, MAP_Y],
                        [MAP_X + MAP_W, MAP_Y + MAP_H],
                    ]}

                >
                    <ViewportPortal>
                        <img
                            src={miFondo}
                            draggable={false}
                            style={{
                                position: 'absolute',
                                zIndex: -1,
                                transform: `translate(${MAP_X}px, ${MAP_Y}px)`,
                                width: 3000,
                                opacity: 0.3,
                                pointerEvents: 'none',
                                width: MAP_W,
                                height: MAP_H,
                            }}
                        />
                    </ViewportPortal>
                    <Controls orientation='horizontal' />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)