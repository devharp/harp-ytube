import { Box, Button, IconButton, Menu, MenuItem, Popover, TextField, Typography } from "@mui/material";
import { withStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import WalletIcon from '@mui/icons-material/Wallet';
import HelpIcon from '@mui/icons-material/Help';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from "react";

function Home(props) {
    const host = props.host;
    useEffect(() => {
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(25, 25, 40)';

    }, []);


    function HeadingBar() {
        function HeadingBreak() {
            return (
                <>
                    <div className="mx-4 d-flex align-items-center">
                        <div className="" style={{ height: '1em', width: '2px', backgroundColor: 'rgb(255, 255, 255, 0.55)', borderRadius: '0.5em', boxShadow: '0px 0px 2px 1px rgb(50, 50, 50)' }}></div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="d-flex pt-2 px-4" >
                    <div className="p-2 me-2" style={{ borderRadius: '0.5em', backgroundImage: 'linear-gradient(2deg, rgb(30, 30, 45), rgb(45, 45, 55))' }}>
                        <IconButton sx={{ color: 'white' }}><HomeIcon /></IconButton>
                    </div>
                    <div className="flex-grow-1 d-flex justify-content-end pe-3" style={{ borderRadius: '0.5em', backgroundImage: 'linear-gradient(2deg, rgb(30, 30, 45), rgb(45, 45, 55))' }}>
                        <div className="d-flex align-items-center">
                            <Button className='px-4' variant="contained" sx={{ bgcolor: 'rgb(30,30, 40)', '&:hover': { bgcolor: 'rgb(15, 15, 30)' } }} startIcon={<WalletIcon />}>Add Wallet</Button>
                        </div>
                        <HeadingBreak />
                        <IconButton sx={{ color: 'rgb(255, 255, 255, 0.4)' }}><HelpIcon /></IconButton>
                        <HeadingBreak />
                        <IconButton sx={{ color: 'rgb(255, 255, 255, 0.4)' }}><SettingsIcon /></IconButton>
                        {/* <Button variant='outlined' size='small' onClick={() => { window.localStorage.setItem('token', null); props.authToken(); }} >logout</Button> */}
                    </div>
                </div>
            </>
        )

    }

    function MainSection() {
        const CssTextField = withStyles({
            root: {
                '& label.Mui-focused': {
                    color: 'white',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'yellow',
                },
                '& .MuiInputLabel-root': {
                    color: 'rgb(150, 150, 150)'
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'yellow',
                    },
                },
            },
        })(TextField);
        function BasicMenu() {
            const [anchorEl, setAnchorEl] = useState(null);
            const open = Boolean(anchorEl);
            const handleClick = (event) => {
                setAnchorEl(event.currentTarget);
            };
            const handleClose = () => {
                setAnchorEl(null);
            };

            return (
                <div>
                    <Button
                        id="basic-button"
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant='outlined'
                        sx={{
                            borderColor: 'rgb(100, 100, 100)',
                            color: 'rgb(100, 100, 100)',
                            '&:hover': {
                                borderColor: 'rgb(200, 200, 200)',
                                color: 'rgb(200, 200, 200)',
                                bgcolor: 'none',
                                boxShadow: '0 0 10px 1px rgb(40,40,40)'
                            }
                        }}
                    >
                        <span>sort by&nbsp;-&nbsp;</span>
                        <span style={{ color: 'rgb(255, 255, 255)' }}>date</span>
                    </Button>
                    <Popover
                        className="mt-2"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box>
                            <MenuItem sx={{ p: 2 }} >Last Added</MenuItem>
                            <MenuItem sx={{ p: 2 }} >Last Added</MenuItem>
                            <MenuItem sx={{ p: 2 }} >Last Added</MenuItem>
                        </Box>
                    </Popover>
                </div>
            );
        }


        function he() {
            fetch("https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=in&gs_rn=64&gs_ri=youtube&tok=WZQ1DlJwA5beBUNpj0aZ6w&ds=yt&cp=5&gs_id=k&q=hello&callback=google.sbox.p50&gs_gbg=Kg4B49HP", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
                    "sec-ch-ua-arch": "\"x86\"",
                    "sec-ch-ua-bitness": "\"64\"",
                    "sec-ch-ua-full-version": "\"108.0.5359.98\"",
                    "sec-ch-ua-full-version-list": "\"Not?A_Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"108.0.5359.98\", \"Google Chrome\";v=\"108.0.5359.98\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-model": "",
                    "sec-ch-ua-platform": "\"Linux\"",
                    "sec-ch-ua-platform-version": "\"5.15.0\"",
                    "sec-ch-ua-wow64": "?0",
                    "sec-fetch-dest": "script",
                    "sec-fetch-mode": "no-cors",
                    "sec-fetch-site": "same-site",
                    "x-client-data": "CJa2yQEIpLbJAQipncoBCNjdygEIlaHLAQjr8swBCOT6zAEI7//MAQjygM0BCIeBzQEItYLNAQjFg80B",
                    "cookie": "VISITOR_INFO1_LIVE=KMUDg7Avhz8; PREF=tz=Asia.Calcutta; LOGIN_INFO=AFmmF2swRgIhAJzkxRCPTI5OYyHyINlYKPY6ympSE-VWQvZMiAvxHAhcAiEAucC55bA6lPsjj76FpDs9IjivlEskxfIOAOjUXMDafe8:QUQ3MjNmelVpZjFlYmx5RVFIVVZ3VkZELUVZTWhpR1N4eUpNN1VITE9KOTAwTG02YkxwZ0FMYUJ0T05yVnh6R1RCMHl5LTdDM2M1LXVaOF9mbTJ3MTNXUUUzdFdGX1ZEMk00emkxZzFydnRUYTkyUFhCVWpkbGU5amJFTVVhRlZnRHFxUHY1bjJYYWI5M3psSEUwMVBHS3h0RTFzS1RTZ1VB; NID=511=esRnT_maoAO-7aHwEzXEbPtEbziw4s5POt337SKdMuxzA-1HFdTC31pKDf_sChCyE_c9WOpAchLH43feaw8JVZRgl1Of13Cm6i2a8aZRbHWrFRnsc9ouyXXEu9LtutjC_YT22OSl6vSSq7IYl_9-YEo3o04c2JGgDzXimcHTg9s; SID=Rgirgef6oVAfgDy6XEtw9qNBj5j4gHgAsu32WRl96kznBRPBz5ddpgY00AUsKD_Vsb7Ytw.; __Secure-1PSID=Rgirgef6oVAfgDy6XEtw9qNBj5j4gHgAsu32WRl96kznBRPBiwa1tUWM0kiUn1HoUU3DhQ.; __Secure-3PSID=Rgirgef6oVAfgDy6XEtw9qNBj5j4gHgAsu32WRl96kznBRPBnq6YFcpcnDJDYmzYAduthw.; HSID=A5QTlkCByOXPJi-Cm; SSID=A5fA7Vuhhnu8OhgZt; APISID=uNDt4VXJkD5KlBX4/AThaKBaWwfUlH_Nmy; SAPISID=jcFyl19yZPWYNI1e/AAQ9v8bBCKMoyLZgw; __Secure-1PAPISID=jcFyl19yZPWYNI1e/AAQ9v8bBCKMoyLZgw; __Secure-3PAPISID=jcFyl19yZPWYNI1e/AAQ9v8bBCKMoyLZgw; YSC=mfbLHzzlGvI; SIDCC=AIKkIs3T4B1_jEAgAd32BEsvrCZGviV3itaaaYmyfB0_nVDIb_hBYVgyRWHMjb0dlyDeiiWHzt4; __Secure-1PSIDCC=AIKkIs0UcuCmfRPVh66M8Ery_yuOectK_vlhZ-saCU0ho7ESwgeg7GveAd27n4Yc8gWc2i2QBkQ; __Secure-3PSIDCC=AIKkIs1bnGmh-eGD_q6ayyZfht4_c9uckJPg-DnoS3SIfVegzsZp8YujuY-Gb1RXO1gnJy0VYgR1",
                    "Referer": "https://www.youtube.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": null,
                "method": "GET"
            });
        }

        async function searchYT(event){
            const query = encodeURIComponent(event.target.value);
            // const secret_api = `https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=in&gs_rn=64&gs_ri=youtube&q=${query}`;
            const secret_api = `${host}/search?query=${query}`;
            const res = await fetch(secret_api);

            console.log(await res.text());

        }
        return (
            <>
                <div className="mt-5 p-4">
                    <div className="d-flex">
                        <h1 style={{ color: 'white', fontWeight: '800' }} onClick={(e) => { console.log(e.currentTarget); }} >YouTube videos</h1>
                        <div className="flex-grow-1 d-flex justify-content-center">
                            <CssTextField onChange={searchYT} sx={{ width: '50%', input: { color: 'white' } }} size='small' label='search videos here' />
                        </div>
                        <div className="d-flex align-items-center me-5"><BasicMenu /></div>
                        <div className="d-flex align-items-center"><Button variant='contained' sx={{ bgcolor: 'yellow', color: 'black', '&:hover': { bgcolor: 'rgb(220, 220, 0)' } }} startIcon={<DownloadIcon />}>Download</Button></div>
                    </div>
                </div>
            </>
        );
    }


    return (
        <>
            <div className="">
                <HeadingBar />
                <MainSection />
            </div>
        </>
    );
}

export default Home;