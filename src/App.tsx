import React, { useState, useEffect } from "react";

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImages = localStorage.getItem("imageURLs");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("imageURLs", JSON.stringify(images));
  }, [images]);

  const addImages = (files: FileList) => {
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addImages(event.dataTransfer.files);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addImages(event.target.files);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1>画像ギャラリー</h1>

        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          accept="image/*"
          style={{ marginBottom: "10px" }}
        />

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "100px",
            border: "2px dashed #aaa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          ここに画像をドラッグ＆ドロップ
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "calc(50% + 150px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          justifyContent: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {images.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={img}
              alt={`画像 ${index + 1}`}
              style={{ width: "100%", cursor: "pointer", borderRadius: "5px" }}
              onClick={() => setSelectedImage(img)}
            />
            <button
              onClick={() => handleDeleteImage(index)}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "3px",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={selectedImage}
            alt="拡大画像"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
