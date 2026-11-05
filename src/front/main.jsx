import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'label 1' },
        type: 'input',
        draggable: true,
    },
    {
        id: 'n2',
        position: { x: 100, y: 100 },
        data: { label: 'Node 2' },
        draggable: true,
    },
];

const initialEdges = [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
];

const Main = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((snap) => applyNodeChanges(changes, snap)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((snap) => applyEdgeChanges(changes, snap)),
        [],
    );

useEffect(() => {
    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();

            setNodes([...nodes,     {
        id: 'n3',
        position: { x: 200, y: 200 },
        data: { label: data.message },
        type: 'input',
        draggable: true,
    }]
            );
        } catch (error) {
            console.error(error);
        }
    };

    loadMessage();
}, []);

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