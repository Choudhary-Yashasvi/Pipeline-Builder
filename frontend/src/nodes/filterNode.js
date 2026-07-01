import { useState } from 'react';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      tag="logic"
      nodeColor="#14b8a6"
      nodeRgb="20,184,166"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'match' }, { id: 'noMatch' }]}
    >
      <label className="node-label">Condition
        <select className="node-select" value={condition} onChange={e => setCondition(e.target.value)}>
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </label>
      <label className="node-label">Value
        <input className="node-input" type="text" value={value} onChange={e => setValue(e.target.value)} />
      </label>
    </BaseNode>
  );
};