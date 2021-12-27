import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  text: string;
  handleDelete?: () => void;
}
const ListLinks = ({ text, handleDelete }: IProps) => {
  return (
    <List
      style={{
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid lightgray",
        color: "blue",
        minWidth: "200px",
        marginRight:"5px"
      }}
    >
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete} edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        }
      >
        <ListItemText primary={text} style={{ marginRight: "10px" }} />
      </ListItem>
    </List>
  );
};

export default ListLinks;
