import React, { useState, useRef, ChangeEvent } from "react";
import AvatarEditor from "react-avatar-editor"
import { Avatar, Input } from "@mui/material";

function AvatarWithInput() {
  const [image, setImage] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result;
        setImage(imageSrc as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleScaleChange(event: ChangeEvent<HTMLInputElement>): void {
    const newScale = parseFloat(event.target.value);
    setScale(newScale);
  }

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position);
  };

  const handleDragStart = (event: React.MouseEvent<HTMLImageElement>) => {
    setIsDragging(true);
    const { clientX, clientY } = event;
    setDragStart({ x: clientX, y: clientY });
  };

  const convertEvent = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    return event.nativeEvent;
  };

  const handleDrag = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (!isDragging) {
      return;
    }
    const nativeEvent = convertEvent(event);
    const { clientX, clientY } = nativeEvent;
    const dragDelta = { x: clientX - dragStart.x, y: clientY - dragStart.y };
    setPosition((prevPosition) => ({
      x: prevPosition.x + dragDelta.x / 200,
      y: prevPosition.y + dragDelta.y / 200,
    }));
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleApplyEdit = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvas.toDataURL();
      setCroppedImage(croppedImg);
      setImage("");
    }
  };


    return (
      <div style={{ position: "relative", display: "inline-block" }}>
  {croppedImage ? (
    <Avatar
      alt="Avatar"
      src={croppedImage}
      sx={{ width: 200, height: 200 }}
    />
  ) : (
    <AvatarEditor
      ref={editorRef}
      image={image}
      width={200}
      height={200}
      border={50}
      borderRadius={100}
      scale={scale}
      position={position}
      onPositionChange={handlePositionChange}
      onMouseUp={handleDragEnd}
    />
  )}
  {!croppedImage && (
    <div style={{marginTop:"20px", display: "flex", flexDirection: "column" }}>
      <Input type="file" onChange={handleImageChange} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{marginTop:"10px", marginRight: "10px", color:"white"  }}>Zoom:</label>
        <Input
          type="range"
          value={scale}
          onChange={handleScaleChange}
          sx={{ width: 200 }}
          inputProps={{ min:1 ,max: 4, step: 0.01  }}
        />
      </div>
      <button style={{backgroundColor:"blue",color:"white",marginTop:"20px", fontSize: "1.5rem", padding: "0.5rem 1rem"}} onClick={handleApplyEdit}>Apply</button>
    </div>
  )}
</div>
    );
  
}

export default AvatarWithInput;