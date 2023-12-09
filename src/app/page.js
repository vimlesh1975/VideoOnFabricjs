'use client';
import React, { useState } from 'react';

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

  const addVideo = (videoElement) => {
    var video1 = new fabric.Image(videoElement, {
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

  const handleFileChange = async (event) => {
    // Get the selected file from the input
    const file = event.target.files[0];

    // Update the state with the selected file
    setSelectedFile(file);
    await handleUpload(file);
  };

  const handleUpload = async (selectedFile) => {
    if (selectedFile) {
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      // setVideoUrl(URL.createObjectURL(blob));

      // Create a video element
      const videoElement = document.createElement('video');

      // Set attributes for the video element
      videoElement.style.display = 'none';
      videoElement.width = 1920;
      videoElement.height = 1080;
      videoElement.controls = true;
      videoElement.src = URL.createObjectURL(blob);
      videoElement.type = 'video/mp4';
      videoElement.autoplay = true;
      videoElement.loop = true;

      // Add a fallback message for browsers that do not support the video tag
      videoElement.innerHTML = 'Your browser does not support the video tag.';

      // Append the video element to the body or another container element
      document.body.appendChild(videoElement);
      addVideo(videoElement);
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={() => console.log(editor.canvas.getActiveObject())}>
        console log
      </button>

      <FabricJSCanvas
        onReady={(canvas) => {
          onReady(canvas);
          canvas.setWidth(1920);
          canvas.setHeight(1080);
          window.canvas = canvas;
        }}
      />
    </div>
  );
};

export default App;
