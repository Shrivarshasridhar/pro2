import React from 'react';

const Canvas = ({ elements, setSelectedElement, currentFrame, keyframes }) => {
  return (
    <div className="canvas border rounded bg-white shadow-sm position-relative" style={{ height: '400px' }}>
      {elements.map((el, index) => {
        // Get the current keyframe properties
        const keyframe = keyframes[currentFrame] || {};
        const position = el.position || { x: 100, y: 100 };
        const size = el.size || 100;
        const rotation = el.rotation || 0;

        // If keyframes are defined, update properties accordingly
        const currentPosition = keyframe.position || position;
        const currentSize = keyframe.size || size;
        const currentRotation = keyframe.rotation || rotation;

        return (
          <div
            key={index}
            className="position-absolute"
            style={{
              left: currentPosition.x,
              top: currentPosition.y,
              width: currentSize,
              height: currentSize,
              transform: `rotate(${currentRotation}deg)`,
              transition: 'transform 0.5s ease, left 0.5s ease, top 0.5s ease',
            }}
            onClick={() => setSelectedElement(index)}
          >
            {el.type === 'emoji' && <span style={{ fontSize: '2rem' }}>{el.content}</span>}
            {el.type === 'image' && <img src={el.src} alt="Uploaded" style={{ width: '100px' }} />}
            {el.type === 'video' && (
              <video src={el.src} controls style={{ width: '150px' }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;
