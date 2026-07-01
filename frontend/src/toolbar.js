import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-logo">Pipeline<span>Shift</span></div>
      <div className="toolbar-divider" />
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <DraggableNode type='customInput' label='Input' color='#6366f1' rgb='99,102,241' />
        <DraggableNode type='customOutput' label='Output' color='#a855f7' rgb='168,85,247' />
        <DraggableNode type='llm' label='LLM' color='#06b6d4' rgb='6,182,212' />
        <DraggableNode type='text' label='Text' color='#10b981' rgb='16,185,129' />
        <DraggableNode type='math' label='Math' color='#f59e0b' rgb='245,158,11' />
        <DraggableNode type='api' label='API Call' color='#ef4444' rgb='239,68,68' />
        <DraggableNode type='timer' label='Timer' color='#8b5cf6' rgb='139,92,246' />
        <DraggableNode type='filter' label='Filter' color='#14b8a6' rgb='20,184,166' />
        <DraggableNode type='note' label='Note' color='#64748b' rgb='100,116,139' />
      </div>
    </div>
  );
}