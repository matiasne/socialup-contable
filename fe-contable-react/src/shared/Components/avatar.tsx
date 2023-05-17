// import React, { useState, useRef, ChangeEvent } from "react";
// // import AvatarEditor from "react-avatar-editor";
// import { Avatar, Input } from "@mui/material";

// function AvatarWithInput() {
//   const [image, setImage] = useState<string>("");
//   const [scale, setScale] = useState<number>(1);
//   const [position, setPosition] = useState<{ x: number; y: number }>({
//     x: 0.5,
//     y: 0.5,
//   });
//   const [croppedImage, setCroppedImage] = useState<string>("");
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
//     x: 0,
//     y: 0,
//   });
//   const editorRef = useRef< null>(null);

//   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] ?? null;

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const imageSrc = e.target?.result;
//         setImage(imageSrc as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const newScale = parseFloat(event.target.value);
//     setScale(parseFloat(newScale.toFixed(2)));
//   };

//   const handlePositionChange = (position: { x: number; y: number }) => {
//     setPosition(position);
//   };

//   const handleDragStart = (event: React.MouseEvent<HTMLImageElement>) => {
//     setIsDragging(true);
//     const { clientX, clientY } = event;
//     setDragStart({ x: clientX, y: clientY });
//   };

//   const convertEvent = (
//     event: React.MouseEvent<HTMLImageElement, MouseEvent>
//   ) => {
//     return event.nativeEvent;
//   };

//   const handleDrag = (
//     event: React.MouseEvent<HTMLImageElement, MouseEvent>
//   ) => {
//     if (!isDragging) {
//       return;
//     }
//     const nativeEvent = convertEvent(event);
//     const { clientX, clientY } = nativeEvent;
//     const dragDelta = { x: clientX - dragStart.x, y: clientY - dragStart.y };
//     setPosition((prevPosition) => ({
//       x: prevPosition.x + dragDelta.x / 200,
//       y: prevPosition.y + dragDelta.y / 200,
//     }));
//     setDragStart({ x: clientX, y: clientY });
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//   };

//   const handleApplyEdit = () => {
//     if (editorRef.current) {

//       const croppedImg = canvas.toDataURL();
//       setCroppedImage(croppedImg);
//       setImage("");
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//       }}
//     >
//       {croppedImage ? (
//         <Avatar
//           alt="Avatar"
//           src={croppedImage}
//           sx={{ width: 200, height: 200 }}
//         />
//       ) : (
//       <></>
//       )}
//       {!croppedImage && (
//         <>
//           <Input
//             type="range"
//             value={scale}
//             onChange={handleScaleChange}
//             sx={{ width: 200 }}
//             inputProps={{
//               min: 0.5,
//               max: 2,
//               step: 0.001,
//             }}
//           />
//           <Input type="file" onChange={handleImageChange} />
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "10px" }}
//           ></div>
//           <button onClick={handleApplyEdit} style={{ fontSize: "100%" }}>
//             Apply
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default AvatarWithInput;
export function avatar(){}