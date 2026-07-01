import { useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      tag="sink"
      nodeColor="#a855f7"
      nodeRgb="168,85,247"
      inputs={[{ id: 'value' }]}
      outputs={[]}
    >
      <label className="node-label">Name
        <input className="node-input" type="text" value={currName} onChange={e => setCurrName(e.target.value)} />
      </label>
      <label className="node-label">Type
        <select className="node-select" value={outputType} onChange={e => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};