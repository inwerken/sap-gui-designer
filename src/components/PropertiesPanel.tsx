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

interface PropertiesPanelProps {
  component: UIComponent | undefined;
  onUpdate: (component: UIComponent) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ component, onUpdate }) => {
  if (!component) return (<div className="properties-panel"><h3>⚙️ Properties</h3><p style={{ color: '#999' }}>Select a component</p></div>);

  return (
    <div className="properties-panel">
      <h3>⚙️ {component.name}</h3>
      <label>Name</label>
      <input type="text" value={component.name} onChange={(e) => onUpdate({ ...component, name: e.target.value })} />
      <label>Type</label>
      <input type="text" value={component.type} onChange={(e) => onUpdate({ ...component, type: e.target.value })} />
      <label>Label</label>
      <input type="text" value={component.label} onChange={(e) => onUpdate({ ...component, label: e.target.value })} />
      <label>X</label>
      <input type="number" value={component.x} onChange={(e) => onUpdate({ ...component, x: Number(e.target.value) })} />
      <label>Y</label>
      <input type="number" value={component.y} onChange={(e) => onUpdate({ ...component, y: Number(e.target.value) })} />
      <label>Width</label>
      <input type="number" value={component.width} onChange={(e) => onUpdate({ ...component, width: Number(e.target.value) })} />
      <label>Height</label>
      <input type="number" value={component.height} onChange={(e) => onUpdate({ ...component, height: Number(e.target.value) })} />
      <div style={{ marginTop: '12px' }}><label><input type="checkbox" checked={component.visible} onChange={(e) => onUpdate({ ...component, visible: e.target.checked })} /> Visible</label></div>
      <div style={{ marginTop: '8px' }}><label><input type="checkbox" checked={component.enabled} onChange={(e) => onUpdate({ ...component, enabled: e.target.checked })} /> Enabled</label></div>
    </div>
  );
};

export default PropertiesPanel;
