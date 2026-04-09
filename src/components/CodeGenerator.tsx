import React, { useMemo } from 'react';

interface UIComponent {
  id: string;
  type: string;
  name: string;
  label: string;
}

interface CodeGeneratorProps {
  components: UIComponent[];
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ components }) => {
  const generateABAPCode = useMemo(() => {
    let code = `CLASS lcl_gui_screen DEFINITION.\n  PUBLIC SECTION.\n    METHODS: on_initialize.\n  PRIVATE SECTION.\n`;
    components.forEach((comp) => {
      const varName = `go_${comp.name.toLowerCase()}`;
      const className = getABAPClassName(comp.type);
      code += `    DATA: ${varName} TYPE REF TO ${className}.\n`;
    });
    code += `ENDCLASS.\n\nCLASS lcl_gui_screen IMPLEMENTATION.\n  METHOD on_initialize.\n`;
    components.forEach((comp) => {
      const varName = `go_${comp.name.toLowerCase()}`;
      code += `    CREATE OBJECT ${varName}.\n`;
      if (comp.label) code += `    ${varName}->set_text( '${comp.label}' ).\n`;
    });
    code += `  ENDMETHOD.\nENDCLASS.`;
    return code;
  }, [components]);

  const getABAPClassName = (type: string): string => {
    const typeMap: Record<string, string> = {
      'Dialog': 'cl_gui_window',
      'Splitter': 'cl_gui_splitter_container',
      'Button': 'cl_gui_button',
      'TextEditor': 'cl_gui_textedit',
      'Calendar': 'cl_gui_date_editor',
      'ListBox': 'cl_gui_listbox',
    };
    return typeMap[type] || 'cl_gui_container_control';
  };

  return (<div className="code-generator"><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><strong>📝 ABAP Code</strong><button onClick={() => { navigator.clipboard.writeText(generateABAPCode); alert('✅ Copied!'); }} style={{ background: '#007acc', padding: '4px 8px', fontSize: '11px', marginRight: 0 }}>Copy</button></div><pre>{generateABAPCode}</pre></div>);
};

export default CodeGenerator;