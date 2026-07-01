import { useState } from 'react';
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Write your note here...');

  return (
    <BaseNode
      id={id}
      title="Note"
      tag="info"
      nodeColor="#64748b"
      nodeRgb="100,116,139"
      inputs={[]}
      outputs={[]}
    >
      <textarea
        className="node-textarea"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={4}
      />
    </BaseNode>
  );
};