import { useState } from 'react';
import { BaseNode } from './baseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      tag="compute"
      nodeColor="#f59e0b"
      nodeRgb="245,158,11"
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
    >
      <label className="node-label">Operation
        <select className="node-select" value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </label>
    </BaseNode>
  );
};