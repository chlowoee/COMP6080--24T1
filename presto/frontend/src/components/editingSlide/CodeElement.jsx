import React from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import { Box } from '@mui/material';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';

// Register the languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('c', c);

/**
 * Code Element uses highlight.js npm library to automatically detect language and format code onto a react app
 * Source: https://medium.com/@abdulhaseeb13mar/show-code-snippets-in-react-js-479907cf6ae
 * @param {object} element - contains information on the element
 * @returns Code Element
 */
export default function CodeElement ({ element }) {
  const codeRef = React.useRef(null);
  React.useEffect(() => {
    const codeElement = codeRef.current;
    if (codeElement && codeElement.dataset.highlighted) {
      delete codeElement.dataset.highlighted;
      hljs.highlightBlock(codeElement);
    }

    hljs.highlightElement(codeRef.current);
  }, [element.text]);

  return (
    <Box
      sx={{
        height: `${element.size}%`,
        width: `${element.size}%`,
        overflow: 'hidden',
        position: 'absolute',
        left: `${element.x}%`,
        top: `${element.y}%`,
        fontSize: `${element.fontSize}rem !important`
      }}
    >
      <pre>
        <code ref={codeRef}>{element.text}</code>
      </pre>
    </Box>
  );
}
