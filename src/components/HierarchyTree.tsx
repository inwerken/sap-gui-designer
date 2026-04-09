import React from 'react';

interface UIComponent {
  id: string;
  type: string;
  name: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  enabled: boolean;
}

interface HierarchyTreeProps {
  components: UIComponent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const HierarchyTree: React.FC<HierarchyTreeProps> = ({ components, selectedId, onSelect, onDelete }) => {
  return (
    <div className="tree-view">
      <h3>🌳 Hierarchy</h3>
      <ul>
        {components.map((comp) => (
          <li key={comp.id} className={selectedId === comp.id ? 'selected' : ''} onClick={() => onSelect(comp.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
            <span>{comp.name}</span>
            <button onClick={(e) => { e.stopPropagation(); onDelete(comp.id); }} style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px' }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HierarchyTree;
