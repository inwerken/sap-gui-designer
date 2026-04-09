import React from 'react';
import './index.css';
import MenuBar from './components/MenuBar';
import Canvas from './components/Canvas';
import HierarchyTree from './components/HierarchyTree';
import PropertiesPanel from './components/PropertiesPanel';
import CodeGenerator from './components/CodeGenerator';

const App: React.FC = () => {
    return (
        <div className="app">
            <MenuBar />
            <div className="main-container">
                <HierarchyTree />
                <Canvas />
                <PropertiesPanel />
                <CodeGenerator />
            </div>
        </div>
    );
};

export default App;