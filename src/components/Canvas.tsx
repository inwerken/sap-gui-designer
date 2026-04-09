import React, { useState } from 'react';

const Canvas = () => {
    const [components, setComponents] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const newComponent = {
            id: Date.now(),
            position: { x: e.clientX, y: e.clientY }
        };
        setComponents([...components, newComponent]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSelect = (id) => {
        setSelectedComponent(id);
    };

    return (
        <div 
            style={{ width: '100%', height: '400px', border: '1px solid black' }} 
            onDrop={handleDrop} 
            onDragOver={handleDragOver}
        >
            {components.map(component => (
                <div 
                    key={component.id} 
                    onClick={() => handleSelect(component.id)} 
                    style={{
                        position: 'absolute', 
                        left: component.position.x,
                        top: component.position.y, 
                        width: '50px', 
                        height: '50px', 
                        border: selectedComponent === component.id ? '2px solid blue' : '2px solid transparent'
                    }}
                >
                    Component
                </div>
            ))}
        </div>
    );
};

export default Canvas;