import { Button, CircularProgress } from "@mui/material";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import PhotoList from "./PhotoList";
import { useStore } from "../../stores/store";

interface IProps {
  getArrayImgs: (imageList: ImageListType) => void;
  buttonName: string;
  isLoading?: boolean;
  usePhotoList?: boolean;
  removeAll?: boolean;
}
const PhotoUploader = ({
  getArrayImgs,
  buttonName,
  isLoading,
  usePhotoList,
  removeAll,
}: IProps) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const { profileStore } = useStore();
  const onChange = (
    imageList: ImageListType,
  ) => {
    getArrayImgs(imageList);
    setImages(imageList as never[]);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          dragProps,
          onImageRemoveAll,
        }) => (
          <div>
            {usePhotoList && (
              <PhotoList
                isIndex={true}
                photos={imageList}
                deletePhoto={(index) => {
                  onImageRemove(index);
                  profileStore.setDeleteImageFiles(index);
                }}
              />
            )}
            <Button
              type="button"
              variant="contained"
              disabled={isLoading}
              endIcon={<PhotoCameraBackIcon />}
              style={{ margin: "5px 0px", minWidth: "100px",backgroundColor:"#FFAB76" }}
              onClick={() => {
                onImageUpload();
                removeAll && onImageRemoveAll();
              }}
              {...dragProps}
            >
              {buttonName}
              {isLoading && <CircularProgress size={22} />}
            </Button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default PhotoUploader;
