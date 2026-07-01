import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const [handleTops, setHandleTops] = useState({});
  const [textareaHeight, setTextareaHeight] = useState(60);
  const textareaRef = useRef(null);
  const pillRefs = useRef({});
  const nodeRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!found.includes(match[1])) {
        found.push(match[1]);
      }
    }
    setVariables(found);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const h = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${h}px`;
      setTextareaHeight(h);
    }
  }, [currText]);

  useEffect(() => {
    if (variables.length === 0) {
      setHandleTops({});
      return;
    }
    const measure = () => {
      const nodeEl = nodeRef.current;
      if (!nodeEl) return;
      const tops = {};
      let allMeasured = true;
      variables.forEach((variable) => {
        const el = pillRefs.current[variable];
        if (!el) { allMeasured = false; return; }
        const elRect = el.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();
        tops[variable] = elRect.top - nodeRect.top + el.offsetHeight / 2;
      });
      if (allMeasured) {
        setHandleTops(tops);
        updateNodeInternals(id);
      } else {
        requestAnimationFrame(measure);
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(measure));
  }, [variables, id, updateNodeInternals]);

  const getHighlightedHTML = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g,
        '<span style="color:#10b981;">{{$1}}</span>'
      ) + ' ';
  };

  
  const layerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '5px 9px',
    fontSize: '11px',
    fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
    fontWeight: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    textTransform: 'none',        
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    margin: 0,
    textAlign: 'left',
  };

  const hasVariable = variables.length > 0;

  return (
    <div
      ref={nodeRef}
      className="base-node"
      style={{
        '--node-color': '#10b981',
        '--node-rgb': '16,185,129',
        minWidth: '250px',
      }}
    >
      <div className="base-node-accent" />
      <div className="base-node-header">
        <div className="base-node-dot" />
        <span className="base-node-title">Text</span>
        <span className="base-node-tag">static</span>
      </div>

      <div className="base-node-content">
       
        <div style={{
          fontSize: '9px',
          color: '#64748b',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '3px',
        }}>
          Content
        </div>

        <div
          style={{
            position: 'relative',
            minHeight: '60px',
            height: `${Math.max(textareaHeight, 60)}px`,
            background: '#080a10',
            border: `1px solid ${hasVariable ? '#10b981' : '#1e2030'}`,
            borderRadius: '6px',
            boxShadow: hasVariable ? '0 0 0 2px rgba(16,185,129,0.15)' : 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          
          <div
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: getHighlightedHTML(currText) }}
            style={{
              ...layerStyle,
              color: '#94a3b8',
              background: 'transparent',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={e => setCurrText(e.target.value)}
            style={{
              ...layerStyle,
              color: 'transparent',
              caretColor: '#94a3b8',
              background: 'transparent',
              zIndex: 2,
            }}
          />
        </div>

        {variables.map((variable) => (
          <div
            key={`label-${variable}`}
            ref={el => { pillRefs.current[variable] = el; }}
            style={{
              fontSize: '9px',
              color: '#10b981',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '2px 6px',
              background: 'rgba(16,185,129,0.1)',
              borderRadius: '4px',
              border: '1px solid rgba(16,185,129,0.2)',
              display: 'inline-block',
              marginRight: '4px',
              marginTop: '4px',
            }}
          >
            {variable}
          </div>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: '#6366f1',
          border: '2px solid #0a0a0f',
          boxShadow: '0 0 8px #6366f1',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
        }}
      />

      {variables.map((variable) => (
        handleTops[variable] !== undefined && (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{
              top: `${handleTops[variable]}px`,
              background: '#10b981',
              border: '2px solid #0a0a0f',
              boxShadow: '0 0 8px #10b981',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
            }}
          />
        )
      ))}
    </div>
  );
};