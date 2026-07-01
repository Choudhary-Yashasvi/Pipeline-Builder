import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pipeline-builder-xtyx.onrender.com//pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map(node => ({ id: node.id })),
          edges: edges.map(edge => ({
            source: edge.source,
            target: edge.target,
          })),
        }),
      });
      const data = await response.json();
      setResult(data);
      setShowModal(true);
    } catch (error) {
      setResult(null);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-wrap">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Analysing...' : 'Submit Pipeline'}
        </button>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#0f1117',
            border: '1px solid #6366f1',
            borderRadius: '14px',
            width: '320px',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(99,102,241,0.25), 0 20px 60px rgba(0,0,0,0.6)',
          }}>

            {/* header */}
            <div style={{
              padding: '18px 20px 14px',
              borderBottom: '1px solid #1e2030',
            }}>
              <p style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#e2e8f0',
                margin: 0,
                letterSpacing: '-0.2px',
              }}>Pipeline results</p>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                margin: '3px 0 0',
              }}>Analysis complete</p>
            </div>

            {result ? (
              <>
                <div style={{
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>

                  {/* nodes */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    background: '#080a10',
                    borderRadius: '8px',
                    border: '1px solid #1e2030',
                  }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Nodes</span>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#6366f1',
                      textShadow: '0 0 12px rgba(99,102,241,0.6)',
                    }}>{result.num_nodes}</span>
                  </div>

                  {/* edges */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    background: '#080a10',
                    borderRadius: '8px',
                    border: '1px solid #1e2030',
                  }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Edges</span>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#a855f7',
                      textShadow: '0 0 12px rgba(168,85,247,0.6)',
                    }}>{result.num_edges}</span>
                  </div>

                  {/* dag */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    background: '#080a10',
                    borderRadius: '8px',
                    border: `1px solid ${result.is_dag ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
                    boxShadow: result.is_dag ? '0 0 12px rgba(16,185,129,0.1)' : '0 0 12px rgba(239,68,68,0.1)',
                  }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Valid DAG</span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: result.is_dag ? '#10b981' : '#ef4444',
                      textShadow: result.is_dag ? '0 0 10px rgba(16,185,129,0.6)' : '0 0 10px rgba(239,68,68,0.6)',
                    }}>
                      {result.is_dag ? 'Yes' : 'No'}
                    </span>
                  </div>

                  {/* description */}
                  <p style={{
                    fontSize: '11px',
                    color: result.is_dag ? '#10b981' : '#ef4444',
                    margin: '4px 0 0',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    padding: '8px 12px',
                    background: result.is_dag ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
                    borderRadius: '6px',
                    border: `1px solid ${result.is_dag ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    textShadow: result.is_dag
                      ? '0 0 10px rgba(16,185,129,0.4)'
                      : '0 0 10px rgba(239,68,68,0.4)',
                  }}>
                    {result.is_dag
                      ? 'Data flows in one direction with no circular dependencies.'
                      : 'Pipeline contains a cycle. Remove circular connections to fix.'
                    }
                  </p>
                </div>
              </>
            ) : (
              <div style={{
                padding: '24px 20px',
                textAlign: 'center',
                color: '#ef4444',
                fontSize: '13px',
                textShadow: '0 0 10px rgba(239,68,68,0.4)',
              }}>
                Could not connect to backend. Make sure the server is running.
              </div>
            )}

            {/* close button */}
            <div style={{ padding: '0 20px 20px' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'transparent',
                  color: '#6366f1',
                  border: '1px solid #6366f1',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.2px',
                }}
                onMouseEnter={e => {
                  e.target.style.background = '#6366f1';
                  e.target.style.color = '#fff';
                  e.target.style.boxShadow = '0 0 20px rgba(99,102,241,0.4)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6366f1';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}