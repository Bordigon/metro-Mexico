import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { paradasMetroL1 } from './components/MetroMonterrey/EstructuraParadasMetro.jsx';
import { conexionesMetro } from './components/MetroMonterrey/ConexionesParadasMetro.jsx';

const Main = () => {
    const [nodes, setNodes] = useState(paradasMetroL1);
    const [edges, setEdges] = useState(conexionesMetro);

    const onNodesChange = useCallback(
        (changes) => setNodes((snap) => applyNodeChanges(changes, snap)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((snap) => applyEdgeChanges(changes, snap)),
        [],
    );

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)