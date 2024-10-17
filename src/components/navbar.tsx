"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import { signOutFunc } from "@/firebase/firebaseauth";
import Image from "next/image";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">
            <Image src={"/images/2.png"} width={100} height={80} alt={"Logo"} />
          </Link>
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link href="/dashboard">
            <Button variant="outlined">Home</Button>
          </Link>
          <Link href="/dashboard/add">
            <Button variant="outlined" >Add</Button>
          </Link>
          <Button color="error" onClick={signOutFunc}>
            Sign Out
          </Button>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/dashboard">
                <Button variant="text">Home</Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/dashboard/add">
                <Button variant="text">Add</Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={signOutFunc}>
              <Button color="error">Sign Out</Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
