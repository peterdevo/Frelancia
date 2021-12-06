import { CircularProgress, ImageListItem } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface IProps {
  photos: any[];
  isIndex: boolean;
  deletePhoto: (index: any) => void;
  isLoading?: boolean;
}

const PhotoList = ({ photos, deletePhoto, isIndex, isLoading }: IProps) => {
  return (
    <div
      style={{
        marginRight: "10px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {photos.map((photo, index) => (
        <ImageListItem
          key={index}
          style={{
            width: "100px",
            height: "100px",
            padding: "25px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <div onClick={() => deletePhoto(isIndex ? index : photo.publicId)}>
            <ClearIcon
              fontSize="medium"
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "0",
                top: "0px",
              }}
            />
          </div>
          {isLoading ? (
            <CircularProgress size={32} />
          ) : (
            <img
              src={`${photo.dataURL ? photo.dataURL : photo.url}`}
              alt={`${index}`}
            />
          )}
        </ImageListItem>
      ))}
    </div>
  );
};

export default PhotoList;
