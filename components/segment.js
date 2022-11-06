import React, {useState} from 'react'
import {Global} from '@emotion/react'
import {styled} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {grey} from '@mui/material/colors'
// import {Divider, Header, Grid, Icon, Segment} from 'semantic-ui-react'
import {List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@mui/material'
import {Box, Typography, SwipeableDrawer, Card, CardContent, CardMedia, Grid} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'


const listItemsIndex = [
    {
        ticker: 'spx',
        label: 'S&P500',
        img: 'us.png',
        description: 'S&P 500、スタンダード・アンド・プアーズ500種指数とは、S&P ダウ・ジョーンズ・インデックスが算出しているアメリカの代表的な株価指数である。'
    },
    {
        ticker: 'ndx',
        label: 'Nasdaq',
        img: 'us.png',
        description: 'ナスダック総合指数は、株価指数のひとつ。アメリカの全米証券業協会が開設・運営している電子株式市場「NASDAQ」に上場している3,000以上の銘柄の全てを対象に、時価総額加重平均で算出した指数である。'
    },
]

const listItemsFund = [
    {ticker: 'aaa', label: 'eMaxis 全世界株式インデックス', img: 'us.png'},
    {ticker: 'aaa', label: 'eMaxis 先進国株式インデックス', img: 'us.png'},
    {ticker: 'aaa', label: 'eMaxis TOPIXインデックス', img: 'jp.png'},
    {ticker: 'aaa', label: 'eMaxis 国内リート', img: 'jp.png'}
]


const CustomSegment = ({onSubmit}) => {
    const [selectedList, setSelectedList] = useState([...listItemsIndex])
    const [open, setOpen] = useState(false)
    const drawerBleeding = 56

    const toggleDrawer = newOpen => () => {
        setOpen(newOpen)
    }

    const handleClick = selection => {
        if (selection == 'index') {
            setSelectedList([...listItemsIndex])
        } else {
            setSelectedList([...listItemsFund])
        }
        setOpen(true)
    }

    const handleListItemClicked = item => {
        onSubmit(item)
        setOpen(!open)
    }

    const CustomListItem = ({item}) => {
        return (
            <ListItem onClick={() => handleListItemClicked(item)} style={{cursor: 'pointer'}}>
                <ListItemAvatar>
                    <Avatar src={item['img']} alt={item['label']}/>
                </ListItemAvatar>
                <ListItemText primary={item['label']}/>
            </ListItem>
        )
    }

    const Drawer = () => {
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
                            {selectedList.map(item => <CustomListItem item={item}/>)}
                        </List>
                    </StyledBox>
                </SwipeableDrawer>
            </Root>
        )
    }

    return (
        <>
            <Grid container spacing={2} style={{justifyContent: 'space-around'}}>
                <Grid xs={5} md={5} spacing={2}>
                    <CardWrapper>
                        <CardItem>
                            <div style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold'}}>
                                <div><TrendingUpIcon sx={{fontSize: 40}}/></div>
                                <p>世界の株式指数でシミュレーション</p>
                            </div>
                        </CardItem>
                    </CardWrapper>
                </Grid>
                <Grid xs={5} md={5}>
                    <CardWrapper>
                        <CardItem>
                            <div style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold'}}>
                                <div><TrendingUpIcon sx={{fontSize: 40}}/></div>
                                <p>個別銘柄でシミュレーション</p>
                            </div>
                        </CardItem>
                    </CardWrapper>
                </Grid>

            </Grid>


            {/*<Segment placeholder>*/}
            {/*    <Grid columns={2} stackable textAlign='center'>*/}
            {/*        <Divider vertical>Or</Divider>*/}
            {/*        <Grid.Row verticalAlign='middle' style={{cursor: 'pointer'}}>*/}
            {/*            <Grid.Column onClick={() => handleClick('index')}>*/}
            {/*                <Header icon>*/}
            {/*                    <Icon name='area graph'/>世界の株価指数で計算する*/}
            {/*                </Header>*/}
            {/*            </Grid.Column>*/}

            {/*            <Grid.Column onClick={() => handleClick('fund')}>*/}
            {/*                <Header icon>*/}
            {/*                    <Icon name='money'/>投資信託の銘柄で計算する*/}
            {/*                </Header>*/}
            {/*            </Grid.Column>*/}
            {/*        </Grid.Row>*/}
            {/*    </Grid>*/}
            {/*</Segment>*/}

            <Drawer/>
        </>
    )
}

export default CustomSegment


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


const CardWrapper = styled('div')({
    // display: 'flex',
    marginBottom: '20px',
})

const CardItem = styled('div')({
    // boxShadow: 'inset 3px 3px 7px rgb(136 165 191 / 48%), inset -3px -3px 7px #ffffff',
    boxShadow: '9px 9px 16px rgb(163 177 198 / 60%), -9px -9px 16px rgb(255 255 255 / 50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 30px',
    borderRadius: '20px',
    position: 'relative',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    minWidth: '0',
    wordWrap: 'break-word',
})