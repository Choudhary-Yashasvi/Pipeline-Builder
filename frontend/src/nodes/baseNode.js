import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  tag,
  nodeColor = '#6366f1',
  nodeRgb = '99,102,241',
  inputs = [],
  outputs = [],
  children
}) => {
  return (
    <div
      className="base-node"
      style={{ '--node-color': nodeColor, '--node-rgb': nodeRgb }}
    >
      <div className="base-node-accent" />
      <div className="base-node-header">
        <div className="base-node-dot" />
        <span className="base-node-title">{title}</span>
        {tag && <span className="base-node-tag">{tag}</span>}
      </div>
      <div className="base-node-content">
        {children}
      </div>
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: `${((index + 1) / (inputs.length + 1)) * 100}%` }}
        />
      ))}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${((index + 1) / (outputs.length + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
};