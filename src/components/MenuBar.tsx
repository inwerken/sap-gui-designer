import React from 'react';

interface MenuBarProps {
    onAddComponent: (type: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onAddComponent }) => {
    const containerTypes = ['Dialog', 'Splitter', 'Docking', 'GroupBox', 'TabContainer'];
    const controlTypes = ['TextEditor', 'TextInput', 'Button', 'Calendar', 'Picture'];

    return (
        <div style={{ background: '#2d2d2d', color: 'white', padding: '12px 15px', display: 'flex', gap: '15px', borderBottom: '1px solid #444', alignItems: 'center', flexWrap: 'wrap', }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '10px' }}>🎨 SAP GUI Designer</span>
            <div>
                <strong style={{ fontSize: '12px', marginRight: '8px' }}>Containers:</strong>
                {containerTypes.map(type => (
                    <button key={type} onClick={() => onAddComponent(type)} style={{ marginRight: '4px' }}>+ {type}</button>
                ))}
            </div>
            <div>
                <strong style={{ fontSize: '12px', marginRight: '8px' }}>Controls:</strong>
                {controlTypes.map(type => (
                    <button key={type} onClick={() => onAddComponent(type)} style={{ marginRight: '4px' }}>+ {type}</button>
                ))}
            </div>
        </div>
    );
};

export default MenuBar;