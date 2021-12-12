import EditIcon from "@mui/icons-material/Edit";
import { useRef } from "react";

interface IProps {
  isEdit: boolean;
  editPhoto: (file: File, preview: any) => void;
  url?: string;
}
const AccountImg = ({ isEdit, editPhoto, url }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: any) => {
    inputRef.current?.click();
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    const preview = URL.createObjectURL(fileUploaded);
    editPhoto(fileUploaded, preview);
  };
  return (
    <div
      onClick={handleClick}
      style={{
        backgroundImage: url === "" ? `url("/junior.jpg")` : `url(${url})`,
        width: "140px",
        height: "140px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {isEdit && (
        <div>
          <input
            ref={inputRef}
            onChange={handleChange}
            type="file"
            name="file"
            style={{ display: "none" }}
          />
          <EditIcon
            style={{
              position: "absolute",
              right: "-5",
              bottom: "1",
              width: "15px",
              height: "15px",
              backgroundColor: "#DFAAAA",
              borderRadius: "50%",
              padding: "10px",
              cursor: "pointer",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AccountImg;
