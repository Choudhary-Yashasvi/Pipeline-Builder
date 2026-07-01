import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      tag="model"
      nodeColor="#06b6d4"
      nodeRgb="6,182,212"
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
    >
      <span style={{ color: '#7b889c', fontSize: '11px', lineHeight: '1.6' }}>
        AI Language Model
      </span>
    </BaseNode>
  );
};