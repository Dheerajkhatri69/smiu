"use client"
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MonacoEditor to prevent SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const CodeEditor = ({ getcode , getvalue}) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value) => {
        getcode(value);
    };

    return (
        <div className="border border-gray-300 shadow-md p-4 rounded-lg bg-white">
            <h1 className="text-xl w-full font-bold mb-2">Use HTML with tailwindcss to Create a Craziii Description</h1>
            <MonacoEditor
                height="400px"
                language="javascript"
                value={getvalue}
                theme="vs"
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}  // Log changes
            />
        </div>
    );
};

export default CodeEditor;
