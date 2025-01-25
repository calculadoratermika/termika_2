import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const App = () => {
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);

  useEffect(() => {
    // Load saved layers from localStorage on mount
    const savedLayers = JSON.parse(localStorage.getItem("layers")) || [];
    setLayers(savedLayers);
  }, []);

  useEffect(() => {
    // Save layers to localStorage whenever they change
    localStorage.setItem("layers", JSON.stringify(layers));
  }, [layers]);

  const addLayer = () => {
    const newLayer = {
      id: Date.now(),
      name: `Layer ${layers.length + 1}`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      x: 50,
      y: 50 + layers.length * 60,
      width: 200,
      height: 50,
    };
    setLayers([...layers, newLayer]);
  };

  const updateLayerPosition = (id, newX, newY) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, x: newX, y: newY } : layer
      )
    );
  };

  const selectLayer = (id) => {
    setSelectedLayer(id);
  };

  const deleteLayer = () => {
    if (selectedLayer) {
      setLayers((prevLayers) =>
        prevLayers.filter((layer) => layer.id !== selectedLayer)
      );
      setSelectedLayer(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Canvas Section */}
      <div className="flex-grow bg-gray-100 p-4">
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {layers.map((layer) => (
              <Rect
                key={layer.id}
                x={layer.x}
                y={layer.y}
                width={layer.width}
                height={layer.height}
                fill={layer.color}
                draggable
                onDragEnd={(e) =>
                  updateLayerPosition(layer.id, e.target.x(), e.target.y())
                }
                onClick={() => selectLayer(layer.id)}
                stroke={selectedLayer === layer.id ? "black" : ""}
                strokeWidth={selectedLayer === layer.id ? 2 : 0}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-1/3 bg-white shadow-lg p-4">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Layer Properties</h2>
          </CardHeader>
          <CardContent>
            <Button onClick={addLayer} className="mb-2 w-full">
              Add Layer
            </Button>
            <Button onClick={deleteLayer} disabled={!selectedLayer} className="w-full">
              Delete Selected Layer
            </Button>
            <div className="mt-4">
              <h3 className="text-sm font-bold">Layers List:</h3>
              <ul>
                {layers.map((layer) => (
                  <li
                    key={layer.id}
                    className={`p-2 cursor-pointer rounded-lg mb-2 ${
                      selectedLayer === layer.id ? "bg-blue-200" : "bg-gray-100"
                    }`}
                    onClick={() => selectLayer(layer.id)}
                  >
                    {layer.name}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
