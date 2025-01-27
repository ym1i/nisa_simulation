import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import moment from 'moment'
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, InputAdornment, Stack, TextField} from '@mui/material'
import DateRangePicker from '../components/dateRangePicker'
import StackedBarChart from '../components/barChart'


const Index = () => {
    const [product, setProduct] = useState(null)
    const [productSymbol, setProductSymbol] = useState('us500')
    const [productType, setProductType] = useState('index')
    const [productData, setProductData] = useState(null)
    const [startDate, setStartDate] = useState(moment('2000-01-01'))
    const [endDate, setEndDate] = useState(moment('2020-01-01'))
    const [monthlySaving, setMonthlySaving] = useState(10000)


    useEffect(() => {
        const fetchData = async () => {
            const url = `/api/dataHandler?product=${productSymbol}&start=${startDate}&end=${endDate}&monthlysaving=${monthlySaving}`
            const response = await fetch(url)
            const data = await response.json()
            setProductData(data)
            setProduct(data['productList'][productType][productSymbol])
        }
        fetchData()
    }, [productSymbol, startDate, endDate, monthlySaving])


    const ProductList = () => {
        let currentList
        if (productType == 'index') {
            currentList = productData['productList']['index']
        } else if (productType == 'individual') {
            currentList =  productData['productList']['individual']
        } else if (productType == 'crypto') {
            currentList =  productData['productList']['crypto']
        }

        return (
            <List style={{height: '260px', overflow: 'auto'}}>
                {_.map(currentList, item =>
                    <StyledListItem className={productSymbol == item['symbol'] ? 'active' : ''}
                                    onClick={() => setProductSymbol(item['symbol'])}>
                        <ListItemAvatar>
                            <Avatar src={item['img']} alt={item['label']}/>
                        </ListItemAvatar>
                        <ListItemText primary={item['label']}/>
                    </StyledListItem>)}
            </List>
        )
    }

    if (!productData || !product) return

    return (
        <Container>
            <App>
                <Header>Simulator</Header>
                <Wrapper>
                    <Main>
                        <MainHeader>
                            <HeaderMenu>
                                <Menu className={productType == 'index' ? 'active' : ''}
                                      onClick={() => setProductType('index')}>株式指数</Menu>
                                <Menu className={productType == 'individual' ? 'active' : ''}
                                      onClick={() => setProductType('individual')}>個別銘柄</Menu>
                                <Menu className={productType == 'crypto' ? 'active' : ''}
                                      onClick={() => setProductType('crypto')}>暗号資産</Menu>
                            </HeaderMenu>
                        </MainHeader>
                        <ContentWrapper>
                            <ContentHeader>
                                <ProductList/>
                            </ContentHeader>
                            <ContentSection>
                                <div>積立設定</div>
                                <ul>
                                    <li>
                                        <div style={{width: '150px'}}>積立銘柄</div>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={product['img']} alt={product['label']}/>
                                            </ListItemAvatar>
                                            <ListItemText primary={product['label']}/>
                                        </ListItem>
                                    </li>
                                    <li>
                                        <div style={{width: '150px'}}>積立期間</div>
                                        <DateRangePicker start={startDate} end={endDate} min={productData['minDate']}
                                                         max={productData['maxDate']}
                                                         onStartChange={_d => setStartDate(_d)}
                                                         onEndChange={_d => setEndDate(_d)}/>
                                    </li>
                                    <li>
                                        <div style={{width: '150px'}}>毎月積立額</div>
                                        <TextField label='' style={{margin: '0'}} value={monthlySaving}
                                                   InputProps={{
                                                       endAdornment: <InputAdornment position='end'>円</InputAdornment>
                                                   }}
                                                   onChange={e => setMonthlySaving(Number(e.target.value))}/>
                                    </li>
                                </ul>
                            </ContentSection>
                            <ContentSection>
                                <div className='chart-wrapper'>
                                    <StackedBarChart
                                        data={productData['simulationData']['chartData']} product={product}
                                        start={startDate} end={endDate} monthly={monthlySaving}/>
                                </div>
                            </ContentSection>
                        </ContentWrapper>
                    </Main>
                </Wrapper>
            </App>
        </Container>
    )
}

export default Index


const Container = styled.div`
    background: #333;
    color: #fff;
    font-family:  "Poppins", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2em;
    width: 100%;
    height: 100vh;
    background-image: url('Einstein01.jpeg');
    // background-image: linear-gradient(45deg, #888, transparent);
    background-size: cover;
    background-position: center;
`

const App = styled.div`
    background-color: rgba(16 18 27 / 40%);
    max-width: 1250px;
    max-height: 860px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    width: 100%;
    border-radius: 14px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    font-size: 15px;
    font-weight: 500;
    // background-image: url('neon-frame2.webp');
    // background-image: linear-gradient(45deg, #888, transparent);
    background-size: cover;
    background-position: center;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 58px;
    width: 100%;
    border-bottom: 1px solid rgba(113 119 144 / 25%);;
    padding: 0 30px;
    white-space: nowrap;
`

const Wrapper = styled.div`
    display: flex;
    flex-grow: 1;
    overflow: hidden;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const MainHeader = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(113 119 144 / 25%);
    height: 58px;
    flex-shrink: 0;
`

const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
`

const Menu = styled.a`
    padding: 20px 24px;
    text-decoration: none;
    color: rgb(113 119 144 / 78%);
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    cursor: pointer;
    background-color: transparent;
    
    &.active {
        color: #f9fafb;
        border-bottom: 2px solid #f9fafb;    
    }
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: #f9fafb;
    padding: 20px 40px;
    height: 100%;
    overflow: auto;
    background-color: rgba(16 18 27 / 40%);
`

const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    border-radius: 14px;
    padding: 20px 40px;
    background-color: rgb(146 151 179 / 13%);
    padding-left: 0;
    margin: 0;
    border-radius: 14px;
    border: 1px solid rgba(16 18 27 / 40%);
    cursor: pointer;
    
    ul {
        width: 100%;
    }
    
    ul li + li {
        border-top: 1px solid rgba(113 119 144 / 25%);
    }
`

const StyledListItem = styled(ListItem)`
    cursor: pointer;
    &.active {
        // transform: scale(1.02);
        background-color: rgba(255 255 255 / 40%);
    }  
`

const ContentSection = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    
    > div {
        // .content-section-title
        color: #999ba5;
        margin-bottom: 14px;
    }
    
    ul, .chart-wrapper {
        // .content-section ul
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        background-color: rgb(146 151 179 / 13%);
        padding-left: 0;
        margin: 0;
        border-radius: 14px;
        border: 1px solid rgba(16 18 27 / 40%);
        cursor: pointer;
    }
    
    ul li {
        // .content-section ul li
        list-style: none;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        font-size: 16px;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        transition: 0.3s;
    }
    
    ul li + li {
        border-top: 1px solid rgba(113 119 144 / 25%);
    }
    
    ul li div {
        display: flex;
        align-items: center;
        
    }
`
