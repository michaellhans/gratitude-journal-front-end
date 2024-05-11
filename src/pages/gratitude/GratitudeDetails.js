import { useState, Fragment, useEffect } from 'react';

// material-ui
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, Typography } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers-pro';

// project import
import MainCard from 'components/MainCard';

// assets
import itbAvatar from 'assets/images/actions/itb.png';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { retrieveGratitudeData, startLoading } from 'store/reducers/gratitude';
import { formattedDate } from 'utils/format';
import GratitudeCard from './components/GratitudeCard';
import { Button } from '@mui/material';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://localhost:3000/api/gratitude';

const GratitudeDetails = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs('05/01/2024'));
    const gratitudeData = useSelector((state) => state.gratitude);
    const isLoading = gratitudeData.isLoading;
    const data = gratitudeData.data;

    const dispatch = useDispatch();

    const handleChangeDate = (value) => {
        setSelectedDate(value);
    };

    const handlePrevious = () => {
        setSelectedDate(dayjs(selectedDate).subtract(1, 'day'));
    };

    const handleNext = () => {
        setSelectedDate(dayjs(selectedDate).add(1, 'day'));
    };

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                date: selectedDate ? formattedDate(selectedDate) : '05/01/2024'
            });
            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (response.ok) {
                    const res = await response.json();
                    dispatch(retrieveGratitudeData(res.gratitude));
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        dispatch(startLoading);
        fetchData();
    }, [dispatch, selectedDate]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Overall Dashboard</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="profile user" src={itbAvatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Institut Teknologi Bandung"
                                    secondary={
                                        <Fragment>
                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                School of Electrical Engineering and Informatics
                                            </Typography>
                                            {' / Computation '}
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                spacing={3}
                                direction="row"
                                sx={{
                                    justifyContent: { md: 'flex-end', xs: 'space-between' }
                                }}
                            >
                                <Stack spacing={0.5}>
                                    <Typography>Date</Typography>
                                    <DatePicker value={selectedDate} onChange={handleChangeDate} />
                                </Stack>
                                <Stack spacing={0.5} direction="row" alignItems="flex-end">
                                    <Button onClick={handlePrevious} variant="contained" color="info" sx={{ mr: 1 }}>
                                        Previous
                                    </Button>
                                    <Button onClick={handleNext} variant="contained" color="info" sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>

            {/* row 2 */}
            <Grid item xs={12}>
                {isLoading & (data === undefined) ? (
                    <Skeleton variant="rounded" height={1000} sx={{ width: 1 / 1 }} />
                ) : (
                    <Grid container spacing={3}>
                        {data.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <GratitudeCard data={item}></GratitudeCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default GratitudeDetails;
