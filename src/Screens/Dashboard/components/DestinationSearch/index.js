import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersistantStore from '../../../../Zstore/usePersistantStore';
import { Indiancities } from '../../../../constants/Citieslist';

const initialKeys = {
    journeyDate: null,
    startingPlace: '',
    droppingPlace: '',
    fromSource: [],
    toDestiny: [],
};

const reducer = (state, newState) => ({
    ...state,
    ...newState,
});

function DestinationSearch() {
    const [state, setState] = useReducer(reducer, initialKeys);
    const { startingPlace, droppingPlace, fromSource, toDestiny } = state;
    const saveJourney = PersistantStore(state => state.setJourneyDetails);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCities = Indiancities.reduce((acc, e) => {
            if (e.state === 'Andhra Pradesh') {
                acc.push({ label: e.city, value: e.city });
            }
            return acc;
        }, []);
        setState({ fromSource: filteredCities, toDestiny: filteredCities });
    }, []);

    useEffect(() => {
        if (startingPlace) {
            setState({ toDestiny: toDestiny?.filter(e => e?.value !== startingPlace?.value) });
        }
    }, [startingPlace]);

    const handleChange = (name, val) => {
        setState({ [name]: val });
    };

    const handleSearchForDestination = () => {
        if (state.startingPlace?.value && state.droppingPlace?.value && state.journeyDate) {
            const obj = {
                startedPlace: state.startingPlace?.value,
                droppedPlace: state.droppingPlace?.value,
                journeyDate: moment(state.journeyDate).format('L'),
            };
            saveJourney(obj);
            if (Object.values(obj)) {
                navigate('/bookings');
            }
        } else {
            alert('Please select the place and date');
        }
    };

    return (
        <div style={{ position: 'absolute', zIndex: 100, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Grid container gap={'10px'} sx={{ backgroundColor: '#fff', margin: '0px auto', padding: '10px', flexWrap: 'nowrap', alignItems: 'center', borderRadius: '12px' }}>
                <Grid item md={3.5} sx={{ width: 250 }}>
                    <Autocomplete
                        disablePortal
                        size='small'
                        options={fromSource}
                        onChange={(e, newValue) => handleChange('startingPlace', newValue)}
                        getOptionLabel={option => option.label || ''}
                        isOptionEqualToValue={(option, value) => option.value === value || ''}
                        value={state.startingPlace}
                        renderInput={params => (
                            <TextField
                                {...params}
                                value={state?.startingPlace}
                                placeholder='From'
                                sx={{
                                    '& .MuiInputBase-root': {
                                        height: '60px',
                                        // width: '200px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        // WebkitTextFillColor: theme.palette.form.color1,
                                        backgroundColor: '#a8dadc',
                                        color: state.startingPlace ? 'black' : '#666666',

                                        '& fieldset': {
                                            border: `1px solid grey`,
                                            borderRadius: '6px',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={3.5} sx={{ width: 250 }}>
                    <Autocomplete
                        disablePortal
                        size='small'
                        options={toDestiny}
                        onChange={(e, newValue) => handleChange('droppingPlace', newValue)}
                        getOptionLabel={option => option.label || ''}
                        value={droppingPlace}
                        renderInput={params => (
                            <TextField
                                {...params}
                                value={droppingPlace}
                                placeholder='To'
                                sx={{
                                    '& .MuiInputBase-root': {
                                        height: '60px',
                                        // width: '200px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        // WebkitTextFillColor: theme.palette.form.color1,
                                        backgroundColor: '#a8dadc',
                                        color: state.startingPlace ? 'black' : '#666666',

                                        '& fieldset': {
                                            border: `1px solid grey`,
                                            borderRadius: '6px',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            placeholder='Journey Date'
                            disablePast={true}
                            value={state.journeyDate}
                            openPickerButton={<CalendarMonthIcon fontSize='15px' />}
                            onChange={newValue => setState({ journeyDate: newValue })}
                            slotProps={{
                                textField: {
                                    sx: {
                                        '& .MuiInputBase-root': {
                                            height: '60px',
                                            // width: '200px',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            // WebkitTextFillColor: theme.palette.form.color1,
                                            backgroundColor: '#a8dadc',
                                            color: state.startingPlace ? 'black' : '#666666',

                                            '& fieldset': {
                                                border: `1px solid grey`,
                                                borderRadius: '6px',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2} sx={{ border: '1px solid #666', borderRadius: '6px', textAlign: 'center', backgroundColor: '#333333' }}>
                    <Button
                        sx={{
                            background: 'linear-gradient(314deg, #42d392, #647eff)',
                            WebkitTextFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                        }}
                        onClick={handleSearchForDestination}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default DestinationSearch;
