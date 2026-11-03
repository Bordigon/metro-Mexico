import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        type: 'input',
    },
    {
        id: 'n2',
        position: { x: 100, y: 100 },
        data: { label: 'Node 2' },
        type: 'output',
    },
];

export const Flows = () => {
    return (
        <div style={{ height: '600px', width: '100%' }}>
            <ReactFlow nodes={initialNodes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}