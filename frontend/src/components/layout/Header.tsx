import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  AccountCircle,
  ListAlt as OrdersIcon,
} from '@mui/icons-material';
import { AuthContext } from 'react-oauth2-code-pkce';
import { authConfig } from '../../config/authConfig';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { token, tokenData, logIn, logOut, loginInProgress } = useContext(AuthContext);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0); // You can implement cart count logic here
  
  const isMenuOpen = Boolean(anchorEl);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear local tokens first
    logOut();
    handleMenuClose();
    
    // Redirect to Keycloak logout endpoint to terminate the session
    const logoutUrl = `${authConfig.logoutEndpoint}?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
    window.location.href = logoutUrl;
  };

  const handleLogin = () => {
    logIn();
  };

  const getUserDisplayName = () => {
    if (tokenData?.preferred_username) {
      return tokenData.preferred_username;
    }
    if (tokenData?.name) {
      return tokenData.name;
    }
    if (tokenData?.email) {
      return tokenData.email;
    }
    return 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/orders'); }}>
        <ListItemIcon>
          <OrdersIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Orders</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem button component={RouterLink} to="/" onClick={handleMobileMenuToggle}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {token && (
            <>
              <ListItem button component={RouterLink} to="/cart" onClick={handleMobileMenuToggle}>
                <ListItemIcon>
                  <CartIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
                <Badge badgeContent={cartCount} color="error" />
              </ListItem>
              <ListItem button component={RouterLink} to="/orders" onClick={handleMobileMenuToggle}>
                <ListItemIcon>
                  <OrdersIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
              <ListItem button component={RouterLink} to="/profile" onClick={handleMobileMenuToggle}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
          {!token && (
            <ListItem button onClick={handleLogin}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            E-Commerce
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            {token && (
              <>
                <Button color="inherit" component={RouterLink} to="/cart">
                  Cart
                  <Badge badgeContent={cartCount} color="error" sx={{ ml: 1 }} />
                </Button>
                <Button color="inherit" component={RouterLink} to="/orders">
                  Orders
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {getUserDisplayName()}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {getUserInitials()}
                    </Avatar>
                  </IconButton>
                </Box>
              </>
            )}
            {!token && !loginInProgress && (
              <Button 
                color="inherit" 
                onClick={handleLogin}
                startIcon={<AccountCircle />}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      {renderMenu}
      {renderMobileMenu}
    </AppBar>
  );
};

export default Header; 