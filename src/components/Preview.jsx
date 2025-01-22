import React, { useEffect, useRef } from 'react';

const Preview = ({ elements = [], keyframes = [] }) => {
  const previewRef = useRef();

  useEffect(() => {
    if (keyframes.length > 0) {
      const interval = setInterval(() => {
        const preview = previewRef.current;
        if (preview) {
          preview.style.transform = `translate(${Math.random() * 20}px, ${Math.random() * 20}px)`;
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [keyframes]);

  return (
    <div className="preview border rounded bg-light shadow-sm p-3">
      <h5 className="fw-bold">Preview</h5>
      <div
        ref={previewRef}
        className="preview-box border bg-white rounded d-flex justify-content-center align-items-center"
        style={{ height: '300px' }}
      >
        {elements.map((el, index) => (
          <span key={index} style={{ fontSize: '2rem', margin: '0 10px' }}>
            {el.type === 'emoji' ? '😊' : '❔'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preview;
