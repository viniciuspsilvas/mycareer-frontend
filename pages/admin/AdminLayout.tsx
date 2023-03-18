import { NextLinkComposed } from '@components/global/Link'
import { Routes } from '@lib/common/route'
import { AccountCircle } from '@mui/icons-material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import { Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { isEqual } from 'lodash'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const drawerWidth = 240
export interface AdminLayoutProps {
  window?: () => Window
  children?: JSX.Element | JSX.Element[]
}

const ItemSideMenu: React.FC<{ pathname: string; label: string; icon: JSX.Element | null }> = ({
  pathname,
  label,
  icon
}) => {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <ListItem disablePadding>
      <ListItemButton component={NextLinkComposed} to={{ pathname }} selected={isEqual(currentPath, pathname)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}

export const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: session } = useSession()

  const user = session?.user
  const { window } = props

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ItemSideMenu label="Home" pathname={Routes.admin} icon={<HomeIcon />} />
      </List>
      <Divider />
      <List>
        <ItemSideMenu label="Awards" pathname={Routes.adminAwards} icon={<EmojiEventsIcon />} />
        {/* <ItemSideMenu label="Certificates" pathname={Routes.adminCertificates} icon={<EmojiEventsIcon />} />
        <ItemSideMenu label="Skills" pathname={Routes.adminSkills} icon={<EmojiEventsIcon />} /> */}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* APP TOP BAR */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: !!user ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Career
          </Typography>
          {user && (
            <>
              <div className="flex">
                <Typography component="div" sx={{ flexGrow: 1 }}>
                  {`Welcome, `}
                  <span className="italic">{`${user?.firstname} ${user?.lastname}`}</span>
                </Typography>
              </div>
              <div className="flex">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() =>
                      signOut({
                        callbackUrl: `/`
                      })
                    }
                  >
                    Logout
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* DRAWERS */}
      {user && (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
              }
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}
