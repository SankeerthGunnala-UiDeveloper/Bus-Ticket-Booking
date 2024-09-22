import { Stack, Typography, Autocomplete, TextField } from '@mui/material';
import { useReducer, useState } from 'react';
import FlightTwoToneIcon from '@mui/icons-material/FlightTwoTone';

const colorObject = {
    avaliableColor: '#ffffff',
    unavaliableColor: '#aaaaaa',
    selectedColor: '#3DC070',
};

const abc = {
    seatLayout: {
        lower: {
            first: [
                [1, 2, 3, 4, 5, 6],
                [7, 8, 9, 10, 11, 12],
            ],
            second: [13, 14, 15, 16, 17, 18],
            isSleeper: true,
        },
        upper: {
            first: [
                [1, 2, 3, 4, 5, 6],
                [7, 8, 9, 10, 11, 12],
            ],
            second: [13, 14, 15, 16, 17, 18],
            isSleeper: true,
        },
    },
};

const seatr = {
    seatLayout: {
        lower: {
            first: [
                [1, 5, 9, 13, 17, 21, 25, 29, 31],
                [2, 6, 10, 14, 18, 22, 26, 30, 32],
            ],
            second: [33],
            third: [
                ['', 3, 7, 11, 15, 19, 23, 27, 34],
                [36, 4, 8, 12, 16, 20, 24, 28, 35],
            ],
            isSleeper: false,
        },
    },
};

// Seat component
const Seat = ({ id, isBooked, onClick }) => {
    const seatStyle = {
        backgroundColor: isBooked ? 'red' : 'green',
        width: '50px',
        height: '50px',
        margin: '5px',
        cursor: isBooked ? 'not-allowed' : 'pointer',
    };

    return (
        <div style={seatStyle} onClick={() => onClick(id)}>
            {id}
        </div>
    );
};

const reducerFun = (state, newState) => ({
    ...state,
    ...newState,
});

const initialData = {
    boardingPoint: null,
    droppingPoint: null,
};

// Bus component
const SeatLayout = ({ selectedBus }) => {
    console.log(selectedBus, 'selectedbu');

    const [selectedSeat, setSelectedSeat] = useState([]);
    const [busInfo, setBusInfo] = useState(selectedBus);

    // const handleSeatClick = seatIndex => {
    //     if (!seats[seatIndex]) {
    //         const newSeats = [...seats];
    //         newSeats[seatIndex] = true;
    //         setSeats(newSeats);
    //     }
    // };

    const isSeatSelected = seat => selectedSeat.includes(seat);

    const handleSelectSeat = s => {
        console.log(s, 'seat');
        const arr = [];
        arr.push(s);
        setSelectedSeat([...selectedSeat, ...arr]);
    };

    const handleBookTicket = () => {};

    const generateSeats = (array, key = '', isSleeper = false) => {
        return (
            <>
                {array.map(seats =>
                    Array.isArray(seats) ? (
                        <div style={{ display: 'flex', margin: '8px' }}>
                            {seats.map(seat => (
                                <div
                                    onClick={() => handleSelectSeat(seat)}
                                    style={{
                                        width: isSleeper ? '40px' : '20px',
                                        border: seat ? '1px solid grey' : 'none',
                                        backgroundColor: isSeatSelected(seat) ? colorObject['selectedColor'] : colorObject['avaliableColor'],
                                        margin: '4px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}>
                                    {key}
                                    {seat}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: isSleeper ? '40px' : '20px', border: '1px solid grey', margin: '4px', textAlign: 'center' }}>
                                {key}
                                {seats}
                            </div>
                        </div>
                    )
                )}
            </>
        );
    };

    return (
        <div>
            <h2>Bus Seating</h2>
            <>
                <Stack direction={'row'} spacing={2}>
                    <Typography>SERVICE NUMBER {selectedBus.serviceKey}</Typography>
                    <Typography>{selectedBus.busTypeName}</Typography>
                </Stack>
                <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                    <div>
                        <p style={{ border: '1px solid #000000', margin: '0px', width: '25px', height: '25px', backgroundColor: '#ffffff', borderRadius: '4px' }}></p>
                        <span style={{ fontSize: '8px' }}>Available Seats</span>
                    </div>
                    {/* <p style={{ border: '1px solid #000000', margin:'0px' ,width: '25px', height: '25px', backgroundColor: '#aaaaaa', borderRadius: '4px' }}></p> */}
                    <div>
                        <p style={{ border: '1px solid #000000', margin: '0px', width: '25px', height: '25px', backgroundColor: '#3DC070', borderRadius: '4px' }}></p>
                        <span style={{ fontSize: '8px' }}>Selected Seats</span>
                    </div>
                </Stack>
                <Stack direction={'column'} gap={'25px'} sx={{ margin: '10px 0px' }}>
                    {selectedBus.busType === 'NON-AC-SLEEPER' ? (
                        <>
                            <div style={{ boxShadow: '0px 0px 0px 5px #ebebeb', display: 'flex', alignItems: 'flex-end', width: '360px' }}>
                                <h4 style={{ transform: 'rotate(270deg)' }}>Upper</h4>
                                <Stack direction={'column'} gap={'30px'}>
                                    <div>{generateSeats(abc.seatLayout.upper.first, 'U', true)}</div>
                                    <div style={{ display: 'flex', margin: '8px' }}>{generateSeats(abc.seatLayout.upper.second, 'U', true)}</div>
                                </Stack>
                            </div>
                            <div style={{ boxShadow: '0px 0px 0px 5px #ebebeb', display: 'flex', alignItems: 'flex-end', width: '360px' }}>
                                <div style={{ display: 'inline-grid', alignItems: 'center', justifyItems: 'center', gridTemplateRows: '80px 80px' }}>
                                    <FlightTwoToneIcon sx={{ transform: 'rotate(270deg)' }} />
                                    <h4 style={{ transform: 'rotate(270deg)' }}>Lower</h4>
                                </div>
                                <Stack direction={'column'} gap={'30px'}>
                                    <div>{generateSeats(abc.seatLayout.lower.first, 'L', true)}</div>
                                    <div style={{ display: 'flex', margin: '8px' }}>{generateSeats(abc.seatLayout.lower.second, 'L', true)}</div>
                                </Stack>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ boxShadow: '0px 0px 0px 5px #ebebeb', width: '325px', display: 'flex' }}>
                                <div style={{ display: 'inline-grid', alignItems: 'center', justifyItems: 'center', gridTemplateRows: '80px 80px', padding: '10px' }}>
                                    <FlightTwoToneIcon sx={{ transform: 'rotate(270deg)' }} />
                                </div>
                                <Stack direction={'column'}>
                                    <div>{generateSeats(seatr.seatLayout.lower.first, '', false)}</div>
                                    <div style={{ display: 'flex', margin: '0px 8px', justifyContent: 'flex-end' }}>{generateSeats(seatr.seatLayout.lower.second, '', false)}</div>
                                    <div>{generateSeats(seatr.seatLayout.lower.third, '', false)}</div>
                                </Stack>
                            </div>
                        </>
                    )}
                </Stack>
                <Stack direction={'row'}>
                    <button onClick={handleBookTicket}>Proceed To Book</button>
                </Stack>
            </>
        </div>
    );
};

export default SeatLayout;
