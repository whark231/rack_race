import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import useAuth from '../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Nav() {
  const { authUser } = useContext(UserContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const searchInput = React.useRef(null)
  const [search, setSearch] = useState('')

  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const listener = event => {
      if ((event.code === "Enter" || event.code === "NumpadEnter") && focused) {
        event.preventDefault();
        navigate(`/users?search=${search}`)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [focused, search]);

  return (
    <div className='nav'>

      {/* Search Box*/}
      { authUser && 
        <TextField 
          onFocus={onFocus} onBlur={onBlur}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          style={{marginLeft: "2em", backgroundColor: "#606164", borderRadius: 5, color: "white"}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{color: 'white'}}/>
              </InputAdornment>
            ),
          }}
          placeholder="search users"
          size="small"
        />
      }

      <div style={{flex: 1}}/>

      {authUser ?
        <div className='row' style={styles.nav}>
          <div style={styles.greeting}>hi {authUser.username}</div>

          <div onClick={handleClick} style={{cursor: "pointer"}}>
            <Avatar>H</Avatar>
          </div>
        </div>
        :
        <div className='row' style={{color: "white"}}>
          <div className='clickable' onClick={() => navigate('login')}>login</div>
          <div className='clickable' onClick={() => navigate('register')}>register</div>
        </div>
      }
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {navigate(`/users/${authUser._id}`); handleClose()}}>Profile</MenuItem>
        <MenuItem onClick={() => {navigate(`/settings`); handleClose()}}>Settings</MenuItem>
        <MenuItem onClick={() => {logout(); handleClose()}}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

const styles = {
  nav: {
    marginRight: "2em"
  },
  greeting: {
    marginRight: "1.5em",
    color: "white"
  }
}