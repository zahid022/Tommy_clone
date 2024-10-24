import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceRange } from '../../store/FilterSlice';

function valuetext(value: number) {
    return `${value}°C`;
}

export default function InputRange() {

    const dispatch = useDispatch()

    const [value, setValue] = useState([0,1000])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleCompleteChange = (event:  React.SyntheticEvent | Event, newValue: number | number[]) => {
        dispatch(setPriceRange(newValue as number[]));
    };

    return (
        <Box>
            <Slider
                min={0}
                max={1000}
                step={100}
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleCompleteChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{
                    color: '#00174f',
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#00174f',
                        width: 12,
                        height: 12,
                        '&:hover': {
                            boxShadow: '0px 0px 0px 0px rgba(220, 55, 95, 0.16)',
                        },
                    },
                    '& .MuiSlider-rail': {
                        color: '#00174f80',
                    },
                    '& .MuiSlider-valueLabel': {
                        backgroundColor: '#00174f',
                    },
                }}
            />
        </Box>
    );
}
