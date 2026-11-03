import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import { BackendURL } from './components/BackendURL';

import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';



const Main = () => {

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const initialNodes = [
        {
            id: 'n1',
            position: { x: 0, y: 0 },
            data: { label: 'Node 1' },
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
        {
            id: 'n1-n2',
            source: 'n1',
            target: 'n2',
        },
    ];

    /*if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            <BackendURL />
        </React.StrictMode>
    );*/
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)


/* estructura auxiliar
    return (
        <React.StrictMode style={{ height: '100%', width: '100%' }}>
            {/* Provide global state to all components *}
            <StoreProvider style={{ height: '100%', width: '100%' }}>
                {/* Set up routing for the application *}
                <RouterProvider router={router} style={{ height: '100%', width: '100%' }}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
*/