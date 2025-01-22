import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import Timeline from '../components/Timeline';
import Preview from '../components/Preview';

const EditorPage = () => {
  const [elements, setElements] = useState([]); // Elements (emojis, images)
  const [keyframes, setKeyframes] = useState([]); // Keyframes to animate
  const [selectedElement, setSelectedElement] = useState(null); // Track selected element
  const [property, setProperty] = useState('position'); // Property to modify (e.g., position, size, etc.)
  const [propertyValue, setPropertyValue] = useState(''); // Value for selected property
  const [playing, setPlaying] = useState(false); // To track whether the animation is playing
  const [currentFrame, setCurrentFrame] = useState(0); // Current frame for animation

  // Add new element to the elements array
  const addElement = (newElement) => {
    setElements([...elements, newElement]);
  };

  // Add new keyframe to the keyframes array
  const addKeyframe = () => {
    const newKeyframe = { time: keyframes.length };
    setKeyframes([...keyframes, newKeyframe]);
  };

  // Delete keyframe from the keyframes array
  const deleteKeyframe = (index) => {
    setKeyframes(keyframes.filter((_, i) => i !== index));
  };

  // Apply selected property to the element
  const applyProperty = (value) => {
    if (selectedElement !== null) {
      const updatedElements = elements.map((el, index) => {
        if (index === selectedElement) {
          if (property === 'position') {
            const [x, y] = value.split(',').map(val => val.trim());
            return { ...el, position: { x, y } };
          }
          if (property === 'rotation') {
            return { ...el, rotation: value };
          }
          if (property === 'size') {
            return { ...el, size: value };
          }
          if (property === 'opacity') {
            return { ...el, opacity: value };
          }
          if (property === 'scale') {
            return { ...el, scale: value };
          }
          if (property === 'transition') {
            return { ...el, transition: value };
          }
          if (property === 'transformOrigin') {
            return { ...el, transformOrigin: value };
          }
          if (property === 'zIndex') {
            return { ...el, zIndex: value };
          }
          return { ...el, [property]: value };
        }
        return el;
      });
      setElements(updatedElements);
    }
  };

  // Start animation (play)
  const playAnimation = () => {
    setPlaying(true);
  };

  // Pause animation
  const pauseAnimation = () => {
    setPlaying(false);
  };

  // Reset animation to initial state
  const resetAnimation = () => {
    setPlaying(false);
    setCurrentFrame(0);
  };

  // Update frame if animation is playing
  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev < keyframes.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 1000 / 30); // 30 FPS for smooth animation
      return () => clearInterval(timer); // Cleanup interval on unmount
    }
  }, [playing, keyframes.length]);

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar addElement={addElement} />
      <div className="main-content flex-grow-1 p-4">
        <div className="row">
          <div className="col-8">
            <Canvas elements={elements} setSelectedElement={setSelectedElement} currentFrame={currentFrame} keyframes={keyframes} />
          </div>
          <div className="col-4">
            <Preview elements={elements} />
            <div className="mt-4">
              <h5>Modify Element Property</h5>
              <div className="mb-3">
                <label htmlFor="property-select" className="form-label">Select Property</label>
                <select
                  id="property-select"
                  className="form-select"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                >
                  <option value="position">Position</option>
                  <option value="size">Size</option>
                  <option value="rotation">Rotation</option>
                  <option value="opacity">Opacity</option>
                  <option value="scale">Scale</option>
                  <option value="transition">Transition</option>
                  <option value="transformOrigin">Transform Origin</option>
                  <option value="zIndex">Z-Index</option>
                </select>
              </div>
              <div className="mb-3">
                {property === 'position' && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="x,y"
                    onChange={(e) => setPropertyValue(e.target.value)}
                    onBlur={() => applyProperty(propertyValue)}
                  />
                )}
                {property === 'size' && (
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPropertyValue(e.target.value)}
                    onBlur={() => applyProperty(propertyValue)}
                  />
                )}
                {property === 'rotation' && (
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPropertyValue(e.target.value)}
                    onBlur={() => applyProperty(propertyValue)}
                  />
                )}
                {/* Add other properties input as needed */}
              </div>
            </div>
          </div>
        </div>
        <Timeline
          keyframes={keyframes}
          addKeyframe={addKeyframe}
          deleteKeyframe={deleteKeyframe}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={playAnimation}>Play</button>
          <button className="btn btn-secondary" onClick={pauseAnimation}>Pause</button>
          <button className="btn btn-danger" onClick={resetAnimation}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
