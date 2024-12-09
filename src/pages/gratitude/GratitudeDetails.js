import { useState, Fragment, useEffect } from 'react';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

// project imports
import MainCard from 'components/MainCard';
import GratitudeCard from './components/GratitudeCard';
import { retrieveGratitudeData, startLoading } from 'store/reducers/gratitude';
import { formattedDate } from 'utils/format';
import { fetchGratitudeData } from 'api/dashboard';
// assets
import itbAvatar from 'assets/images/actions/itb.png';

const DEFAULT_DATE = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const SchoolInfo = () => (
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
);

const DateControls = ({ selectedDate, onDateChange, onPrevious, onNext }) => (
    <Stack
        spacing={3}
        direction="row"
        sx={{
            justifyContent: { md: 'flex-end', xs: 'space-between' }
        }}
    >
        <Stack spacing={0.5}>
            <Typography>Date</Typography>
            <DatePicker value={selectedDate} onChange={onDateChange} />
        </Stack>
        <Stack spacing={0.5} direction="row" alignItems="flex-end">
            <Button onClick={onPrevious} variant="contained" color="info" sx={{ mr: 1 }}>
                Previous
            </Button>
            <Button onClick={onNext} variant="contained" color="info" sx={{ mr: 1 }}>
                Next
            </Button>
        </Stack>
    </Stack>
);

const GratitudeDetails = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs(DEFAULT_DATE));
    const { isLoading, data } = useSelector((state) => state.gratitude);
    const dispatch = useDispatch();

    const fetchData = async (date) => {
        try {
            const gratitudeData = await fetchGratitudeData(selectedDate ? formattedDate(selectedDate) : DEFAULT_DATE);
            dispatch(retrieveGratitudeData(gratitudeData));
        } catch (error) {
            console.error('Error fetching gratitude data:', error);
        }
    };

    useEffect(() => {
        dispatch(startLoading);
        fetchData(selectedDate);
    }, [dispatch, selectedDate]);

    const handleDateChange = (value) => setSelectedDate(value);
    const handlePrevious = () => setSelectedDate(dayjs(selectedDate).subtract(1, 'day'));
    const handleNext = () => setSelectedDate(dayjs(selectedDate).add(1, 'day'));

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
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
                            <SchoolInfo />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DateControls
                                selectedDate={selectedDate}
                                onDateChange={handleDateChange}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>

            <Grid item xs={12}>
                {isLoading && !data ? (
                    <Skeleton variant="rounded" height={1000} sx={{ width: 1 }} />
                ) : (
                    <Grid container spacing={3}>
                        {data?.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <GratitudeCard data={item} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default GratitudeDetails;
