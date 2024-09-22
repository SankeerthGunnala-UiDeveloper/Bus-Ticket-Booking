import React, { useReducer } from 'react';
import { Stack, Typography, Autocomplete, TextField } from '@mui/material';
import SeatLayout from '../SeatLayout';

const reducerFun = (state, newState) => ({
    ...state,
    ...newState,
});

const initialData = {
    boardingPoint: null,
    droppingPoint: null,
};

export default function Selection({ selectedBus }) {
    const [state, setState] = useReducer(reducerFun, initialData);

    const handleChange = (name, value) => {
        setState({ [name]: value });
    };
    return (
        <div>
            <Stack direction={'row'} spacing={2}>
                <Autocomplete
                    disablePortal
                    size='small'
                    options={selectedBus.boardingInfoList}
                    onChange={(e, newValue) => handleChange('boardingPoint', newValue)}
                    getOptionLabel={option => option.placeName || ''}
                    isOptionEqualToValue={(option, value) => option.value === value || ''}
                    value={state.boardingPoint}
                    renderInput={params => (
                        <TextField
                            {...params}
                            value={state?.boardingPoint}
                            placeholder='Boarding Point'
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '60px',
                                    width: '200px',
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#ebebeb',
                                    color: '#666666',

                                    '& fieldset': {
                                        border: `1px solid grey`,
                                        borderRadius: '6px',
                                    },
                                },
                            }}
                        />
                    )}
                />
                {state.boardingPoint && (
                    <Autocomplete
                        disablePortal
                        size='small'
                        options={selectedBus.droppingInfoList}
                        onChange={(e, newValue) => handleChange('droppingPoint', newValue)}
                        getOptionLabel={option => option.placeName || ''}
                        isOptionEqualToValue={(option, value) => option.value === value || ''}
                        value={state.droppingPoint}
                        renderInput={params => (
                            <TextField
                                {...params}
                                value={state?.droppingPoint}
                                placeholder='From'
                                sx={{
                                    '& .MuiInputBase-root': {
                                        height: '60px',
                                        width: '200px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#ebebeb',
                                        color: '#666666',

                                        '& fieldset': {
                                            border: `1px solid grey`,
                                            borderRadius: '6px',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                )}
            </Stack>
            {state.boardingPoint && state.droppingPoint && <SeatLayout selectedBus={selectedBus} />}
        </div>
    );
}
