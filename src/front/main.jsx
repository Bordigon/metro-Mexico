import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactFlow, Background, Controls, Panel, ViewportPortal } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Navbar from './components/Navbar.jsx';
import { paradasMetro } from './components/MetroMonterrey/EstructuraParadasMetro.jsx';
import { conexionesMetro } from './components/MetroMonterrey/ConexionesParadasMetro.jsx';
import Mapa, { MAP_X, MAP_Y, MAP_W, MAP_H } from './components/Mapa.jsx';

const Main = () => {
    const nodes = paradasMetro();
    const edges = conexionesMetro();
    return (
        <div style={{ height: '100vh', width: '100vw' }}>

            <Panel style={{ top: '45vh', left: '10px' }}><Navbar /></Panel>
            <div style={{ height: '100vh', width: '100vw' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    defaultViewport={{ x: 0, y: 0, zoom: 0.46 }}
                    minZoom={0.425}
                    translateExtent={[
                        [MAP_X, MAP_Y],
                        [MAP_X + MAP_W, MAP_Y + MAP_H],
                    ]}

                >
                    <ViewportPortal>
                        <Mapa />
                    </ViewportPortal>
                    <Controls orientation='horizontal' />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)