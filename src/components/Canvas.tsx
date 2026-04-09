import React, { useState } from 'react';

interface UIComponent {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvasProps {
  components: UIComponent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (components: UIComponent[]) => void;
}

const Canvas: React.FC<CanvasProps> = ({ components, selectedId, onSelect, onUpdate }) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const comp = components.find(c => c.id === id);
    if (comp) {
      setDraggedId(id);
      setOffset({ x: e.clientX - comp.x, y: e.clientY - comp.y });
      onSelect(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedId) return;
    const newComponents = components.map(c =>
      c.id === draggedId ? { ...c, x: Math.max(0, e.clientX - offset.x), y: Math.max(0, e.clientY - offset.y) } : c
    );
    onUpdate(newComponents);
  };

  const handleMouseUp = () => { setDraggedId(null); };

  return (
    <div className="canvas-main" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {components.map((comp) => (
        <div key={comp.id} className={`component-box ${selectedId === comp.id ? 'selected' : ''}`}
          style={{ left: `${comp.x}px`, top: `${comp.y}px`, width: `${comp.width}px`, height: `${comp.height}px` }}
          onMouseDown={(e) => handleMouseDown(e, comp.id)} onClick={() => onSelect(comp.id)}>
          <strong style={{ fontSize: '12px', display: 'block' }}>{comp.type}</strong>
          <span style={{ fontSize: '11px', color: '#666' }}>{comp.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
