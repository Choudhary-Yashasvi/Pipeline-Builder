import { useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      tag="source"
      nodeColor="#6366f1"
      nodeRgb="99,102,241"
      inputs={[]}
      outputs={[{ id: 'value' }]}
    >
      <label className="node-label">Name
        <input className="node-input" type="text" value={currName} onChange={e => setCurrName(e.target.value)} />
      </label>
      <label className="node-label">Type
        <select className="node-select" value={inputType} onChange={e => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};