import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  text: string;
  handleDelete?:()=>void
}
const ListLinks = ({ text,handleDelete }: IProps) => {
  return (
    <List
      style={{
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        color:"blue"
      }}
    >
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete} edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        }
      >
        <ListItemText primary={text} />
      </ListItem>
    </List>
  );
};

export default ListLinks;
