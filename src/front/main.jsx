import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, ControlButton, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Navbar from './components/Navbar.jsx';
import { paradasMetro } from './components/MetroMonterrey/EstructuraParadasMetro.jsx';
import { conexionesMetro } from './components/MetroMonterrey/ConexionesParadasMetro.jsx';
import NavButton from './components/NavButton.jsx';

const Main = () => {
    const [nodes, setNodes] = useState(paradasMetro());
    const [edges, setEdges] = useState(conexionesMetro());
    const [navBar, setNavBar] = useState(false);

    const onNodesChange = useCallback(
        (changes) => setNodes((snap) => applyNodeChanges(changes, snap)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((snap) => applyEdgeChanges(changes, snap)),
        [],
    );

    useEffect(() => { }, [navBar]);

    const handleOnClick = () => {
        setNavBar(!navBar)
    }

    return (
        <div style={{ height: '100vh', width: '100vw' }}>

            <Panel><Navbar /></Panel>
            <div style={{ height: '100vh', width: '100vw' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                    <Controls orientation='horizontal'>
                        <ControlButton onClick={handleOnClick}>
                        </ControlButton>
                    </Controls>
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)