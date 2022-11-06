import React, {useState} from 'react'
import {Global} from '@emotion/react'
import {styled} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {grey} from '@mui/material/colors'
import {Box, Typography, SwipeableDrawer, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@mui/material'


const Drawer = ({_open, listItems, onListClick}) => {
    const [open, setOpen] = useState(_open)
    const drawerBleeding = 56

    const toggleDrawer = newOpen => () => {
        setOpen(newOpen)
    }


    const CustomListItem = ({imgUrl, label, ticker}) => {
        return (
            <ListItem onClick={() => onListClick(ticker)} style={{cursor: 'pointer'}}>
                <ListItemAvatar>
                    <Avatar src={imgUrl} alt={label}/>
                </ListItemAvatar>
                <ListItemText primary={label}/>
            </ListItem>
        )
    }

    return (
            <Root>
                <CssBaseline/>
                <Global styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`, overflow: 'visible'
                    }
                }}/>
                <SwipeableDrawer anchor="bottom" open={open} onClose={toggleDrawer(false)}
                                 onOpen={toggleDrawer(true)} swipeAreaWidth={drawerBleeding}
                                 disableSwipeToOpen={false} ModalProps={{keepMounted: true,}}>
                    <StyledBox sx={{
                        position: 'absolute', top: -drawerBleeding, borderTopLeftRadius: 8,
                        borderTopRightRadius: 8, visibility: 'visible', right: 0, left: 0
                    }}>
                        <Puller/>
                        <Typography sx={{p: 2, color: 'text.secondary'}}>51 results</Typography>
                    </StyledBox>
                    <StyledBox sx={{px: 2, pb: 2, height: '100%', overflow: 'auto'}}>
                        <List>
                            {listItems.map(item => <CustomListItem imgUrl={item['img']} label={item['label']}
                                                                      ticker={item['ticker']}/>)}
                        </List>
                    </StyledBox>
                </SwipeableDrawer>
            </Root>
        )
}

export default Drawer

const Root = styled('div')(({theme}) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}))

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}))

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}))