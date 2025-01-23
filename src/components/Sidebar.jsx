import React, { useState } from 'react';

const Sidebar = ({ addElement }) => {
  const [videoURL, setVideoURL] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      addElement({ type: 'image', src: imageURL });
    }
  };

  const handleVideoAdd = () => {
    if (videoURL) {
      addElement({ type: 'video', src: videoURL });
      setVideoURL('');
    }
  };

  return (
    <div className="sidebar bg-dark text-white p-3">
      <h5 className="fw-bold">Tools</h5>
      <button
        className="btn btn-outline-light w-100 my-2"
        onClick={() => addElement({ type: 'emoji', content: '😊' })}
      >
        Add Emoji
      </button>
      <div className="my-3">
        <label className="form-label text-white">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageUpload}
        />
      </div>
      <div className="my-3">
        <label className="form-label text-white">Paste Video URL</label>
        <input
          type="url"
          className="form-control"
          placeholder="Enter video URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
        <button
          className="btn btn-outline-light w-100 mt-2"
          onClick={handleVideoAdd}
          disabled={!videoURL.trim()}
        >
          Add Video
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
