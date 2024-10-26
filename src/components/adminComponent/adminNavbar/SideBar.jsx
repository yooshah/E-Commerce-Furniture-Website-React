import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
        <img src="src/pages/adminPages/assets/menu.svg" alt="menu" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemButton onClick={handleNavigation("/dashboard")}>
                Dashboard
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleNavigation("/notifications")}>
                Notifications
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleNavigation("/webproducts")}>
                Products
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleNavigation("/usersdetails")}>
                User Details
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
