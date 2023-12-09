'use client';
import React, { useState, useRef } from 'react';

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

const App = () => {
  const { editor, onReady } = useFabricJSEditor();
  const onAddCircle = () => {
    const circle = new fabric.Circle({
      id: 'id_' + fabric.Object.__uid,
      class: 'class_' + fabric.Object.__uid,

      top: 0,
      left: 200,
      radius: 50,
      fill: '#0000ff',
      objectCaching: false,
      stroke: 'red',
      strokeWidth: 3,
      strokeUniform: true,
    });
    editor?.canvas.add(circle).setActiveObject(circle);
    editor?.canvas.requestRenderAll();
    circle.animate('left', 150, {
      onChange: editor?.canvas.renderAll.bind(editor?.canvas),
    });
  };
  const onAddRectangle = () => {
    const rect = new fabric.Rect({
      id: 'id_' + fabric.Object.__uid,
      class: 'class_' + fabric.Object.__uid,
      top: -100 * 1.87,
      left: 90 * 1.87,
      width: 500 * 1.87,
      height: 40 * 1.87,
      opacity: 0.9,
      fill: '#051b7d',
      hasRotatingPoint: true,
      objectCaching: false,
      stroke: 'yellow',
      strokeWidth: 1,
      strokeUniform: true,
      rx: 10,
      ry: 10,
    });
    editor?.canvas.add(rect).setActiveObject(rect);
    editor?.canvas.requestRenderAll();
    rect.animate('top', 300, {
      onChange: editor?.canvas.renderAll.bind(editor?.canvas),
    });
  };

  const video1El = useRef(null);
  const addVideo = () => {
    var video1 = new fabric.Image(video1El.current, {
      left: 500,
      top: 300,
      angle: -15,
      scaleX: 0.3,
      scaleY: 0.3,
      originX: 'center',
      originY: 'center',
      objectCaching: false,
    });
    editor?.canvas.add(video1).setActiveObject(video1);
    // video1El.current.play();

    fabric.util.requestAnimFrame(function render() {
      editor?.canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected file from the input
    const file = event.target.files[0];

    // Update the state with the selected file
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const data = new FormData();
      data.set('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      // Assuming the server responds with the file URL
      // const { fileUrl } = await res.json();
      // console.log(fileUrl);

      // Update the video URL in the component state
      setVideoUrl(`./${selectedFile.name}`);
      addVideo();
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={addVideo}>Add Video</button>
      <h3>Uploaded Video</h3>
      <video
        style={{ display: 'none' }}
        ref={video1El}
        controls
        width={1920}
        height={1080}
        src={videoUrl}
        type="video/mp4"
        autoPlay
        loop
      >
        Your browser does not support the video tag.
      </video>

      <FabricJSCanvas
        onReady={(canvas) => {
          onReady(canvas);
          canvas.setWidth(1920);
          canvas.setHeight(1080);
        }}
      />
    </div>
  );
};

export default App;
