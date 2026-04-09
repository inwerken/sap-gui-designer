import React, { useState } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import Canvas from './components/Canvas';
import HierarchyTree from './components/HierarchyTree';
import PropertiesPanel from './components/PropertiesPanel';
import CodeGenerator from './components/CodeGenerator';

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

const App: React.FC = () => {
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addComponent = (type: string) => {
    const newComponent: UIComponent = {
      id: `comp_${Date.now()}`,
      type,
      name: `${type}_${components.length + 1}`,
      label: `${type} 1`,
      x: 50 + Math.random() * 50,
      y: 50 + Math.random() * 50,
      width: 200,
      height: 100,
      visible: true,
      enabled: true,
    };
    setComponents([...components, newComponent]);
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateComponent = (updated: UIComponent) => {
    setComponents(components.map(c => c.id === selectedId ? updated : c));
  };

  return (
    <div className="app-container">
      <MenuBar onAddComponent={addComponent} />
      <div className="main-layout">
        <HierarchyTree components={components} selectedId={selectedId} onSelect={setSelectedId} onDelete={deleteComponent} />
        <Canvas components={components} selectedId={selectedId} onSelect={setSelectedId} onUpdate={setComponents} />
        <PropertiesPanel component={components.find(c => c.id === selectedId)} onUpdate={updateComponent} />
      </div>
      <CodeGenerator components={components} />
    </div>
  );
};

export default App;
