import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, ControlButton, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Navbar from './components/Navbar.jsx';
import { paradasMetro } from './components/MetroMonterrey/EstructuraParadasMetro.jsx';
import { conexionesMetro } from './components/MetroMonterrey/ConexionesParadasMetro.jsx';

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
                    fitView
                >
                    <Controls orientation='horizontal' />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)