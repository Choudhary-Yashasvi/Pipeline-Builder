import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Call"
      tag="request"
      nodeColor="#ef4444"
      nodeRgb="239,68,68"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'response' }]}
    >
      <label className="node-label">URL
        <input className="node-input" type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
      <label className="node-label">Method
        <select className="node-select" value={method} onChange={e => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};