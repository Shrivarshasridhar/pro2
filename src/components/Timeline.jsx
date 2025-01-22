import React from 'react';

const Timeline = ({ keyframes = [], addKeyframe, deleteKeyframe }) => {
  return (
    <div className="timeline bg-white border rounded p-3 mt-3">
      <h5 className="fw-bold">Timeline</h5>
      <div className="d-flex align-items-center">
        {keyframes.map((keyframe, index) => (
          <div
            key={index}
            className="keyframe border rounded bg-primary text-white text-center me-2"
            style={{ width: '50px', height: '50px', lineHeight: '50px' }}
            onClick={() => deleteKeyframe(index)}
          >
            {keyframe.time}s
          </div>
        ))}
        <button
          className="btn btn-outline-primary"
          onClick={() => addKeyframe(null, keyframes.length)}
        >
          Add Keyframe
        </button>
      </div>
    </div>
  );
};

export default Timeline;
