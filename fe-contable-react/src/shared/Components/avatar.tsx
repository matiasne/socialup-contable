import { useState } from "react";
import { Avatar, Input } from "@mui/material";

function AvatarWithInput() {
  const [image, setImage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageSrc = e.target?.result as string;
        setImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Avatar alt="Avatar" src={image} />
      <Input
        type="file"
        onChange={handleImageChange}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default AvatarWithInput;
