import { useState } from 'react';
import { BaseNode } from './baseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      id={id}
      title="Timer"
      tag="delay"
      nodeColor="#8b5cf6"
      nodeRgb="139,92,246"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <label className="node-label">Delay (ms)
        <input className="node-input" type="number" value={delay} onChange={e => setDelay(e.target.value)} min={0} />
      </label>
    </BaseNode>
  );
};