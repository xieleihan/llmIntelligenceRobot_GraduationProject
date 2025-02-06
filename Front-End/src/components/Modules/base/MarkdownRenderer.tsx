// import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdownText }: { markdownText: string }) => { 
    return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};

export default MarkdownRenderer;