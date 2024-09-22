import React, { useEffect, useState } from 'react';
import { Travelersdata } from '../../../constants/Travelersdata';
import { Box, Paper, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment/moment';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersistantStore from '../../../Zstore/usePersistantStore';
import GradeTwoToneIcon from '@mui/icons-material/GradeTwoTone';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import Modal from '../Modal/index';

function Busesdetails() {
    const bookedDetails = PersistantStore(state => state.journeyDetails);
    const [openDialog, setDialog] = useState(false);
    const [selectedBus, SetSelectedBus] = useState({});
    const [busData, setBusData] = useState(Travelersdata);
    console.log(busData, 'busData');
    console.log(bookedDetails, 'book');

    /*     useEffect(() => {
        console.log(Travelersdata, 'Travelersdata');
        const date = moment(new Date()).format('LT').toString();
        console.log(typeof date, 'date');
        const filterDataBasedOnPresentTime = Travelersdata.filter(e => e.startTime > date);
        console.log(filterDataBasedOnPresentTime, 'filterDataBasedOnPresentTime');
        setBusData(filterDataBasedOnPresentTime);
    }, []); */

    function handleBookTicket(a) {
        setDialog(true);
        SetSelectedBus(a);
    }

    function handleClose() {
        setDialog(false);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    zIndex: 20,
                    border: '1px solid #ebebeb',
                    boxShadow: '0px 0px 8px #ebebeb',
                    borderRadius: '6px',
                    backgroundColor: '#0093E9',
                    backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                }}>
                <Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ padding: '10px 20px', gap: '50px' }}>
                    <Typography>From - {bookedDetails.startedPlace}</Typography>
                    <ArrowRightAltIcon style={{ fontSize: '20px' }} />
                    <Typography>To - {bookedDetails.droppedPlace}</Typography>
                    <Typography>Date of Jounery - {bookedDetails.journeyDate}</Typography>
                    <Button sx={{ border: '1px solid grey', background: 'linear-gradient (135deg, #42d392, #647eff)' }}>Modify Search</Button>
                </Stack>
            </Box>
            {busData.map((e, i) => (
                <Paper key={i} elevation={3} sx={{ padding: '10px 20px', boxShadow: 'none' }}>
                    <Card sx={{ border: '1px solid #5AB3CE' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                            <Box sx={{ width: '30%' }}>
                                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                    {e.travelerAgentName}
                                </Typography>
                                <Typography variant='body2'>{e.busTypeName}</Typography>
                            </Box>
                            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>{bookedDetails.startedPlace}</Typography>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                        {e.startTime}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                        {e.travelTime}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
                                        {bookedDetails.droppedPlace}
                                    </Typography>
                                    <Typography>{e.arriveTime}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                    {e.busType}
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CurrencyRupeeTwoToneIcon /> {e.sortFare}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <span>
                                        <GradeTwoToneIcon />
                                    </span>
                                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                        {e.rating}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button size='small' onClick={() => handleBookTicket(e)}>
                                Select Seats
                            </Button>
                        </CardActions>
                    </Card>
                </Paper>
            ))}
            <>
                <Modal selectedBus={selectedBus} handleClose={handleClose} openDialog={openDialog} />
            </>
        </div>
    );
}

export default Busesdetails;
