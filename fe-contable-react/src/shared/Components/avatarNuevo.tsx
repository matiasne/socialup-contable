import { ChangeEvent, useRef, useState } from "react";
import { Avatar, Box, Button, Input } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AvatarEditor from "react-avatar-editor";

interface IProfileFormProps {
  onChange: (data: any) => void;
}

function ProfileForm({ onChange }: IProfileFormProps) {
  const [image, setImage] = useState(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
    onChange(event.target.files[0]);
  };

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  ///////////////

  return (
    <>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Avatar
          onChange={handleButtonClick}
          src={image ? URL.createObjectURL(image) : ""}
          alt="Profile"
          sx={{
            m: 1,
            position: "relative",
            display: "inline-block",
            width: 64,
            height: 64,
            "&:hover $editButton, &:focus-within $editButton": {
              opacity: 1,
            },
          }}
        >
          <Input
            type="file"
            //accept="image/*"
            onChange={handleImageChange}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              cursor: "pointer",
            }}
            ref={inputFileRef}
          />
          <CameraAltIcon sx={{ color: "white", paddingTop: "20px" }} />
        </Avatar>
      </Box>
    </>
  );
}

export default ProfileForm;
