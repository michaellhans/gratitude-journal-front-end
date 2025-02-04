import { useState, Fragment, useEffect, useCallback } from 'react';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import GratitudeCard from './components/GratitudeCard';
import { retrieveGratitudeData, startLoading } from 'store/reducers/gratitude';
import { formattedDate } from 'utils/format';
import { fetchGratitudeData } from 'api/dashboard';
// assets
import schoolAvatar from 'assets/images/actions/itb.png';

const INITIAL_DATE = dayjs().subtract(1, 'day');

const SchoolProfile = () => (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="School Logo" src={schoolAvatar} />
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

const DateNavigator = ({ currentDate, onDateChange, onPreviousDay, onNextDay }) => (
    <Stack
        spacing={3}
        direction="row"
        sx={{
            justifyContent: { md: 'flex-end', xs: 'space-between' }
        }}
    >
        <Stack spacing={0.5}>
            <Typography>Date</Typography>
            <DatePicker value={currentDate} onChange={onDateChange} />
        </Stack>
        <Stack spacing={0.5} direction="row" alignItems="flex-end">
            <Button onClick={onPreviousDay} variant="contained" color="info" sx={{ mr: 1 }}>
                Previous
            </Button>
            <Button onClick={onNextDay} variant="contained" color="info" sx={{ mr: 1 }}>
                Next
            </Button>
        </Stack>
    </Stack>
);

DateNavigator.propTypes = {
    currentDate: PropTypes.object.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onPreviousDay: PropTypes.func.isRequired,
    onNextDay: PropTypes.func.isRequired
};

const GratitudeJournal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get('date');

    const [selectedDate, setSelectedDate] = useState(dateParam ? dayjs(dateParam) : INITIAL_DATE);
    const { isLoading, data: gratitudeEntries } = useSelector((state) => state.gratitude);
    const dispatch = useDispatch();

    const fetchGratitudeEntries = useCallback(async () => {
        try {
            const formattedSelectedDate = selectedDate ? formattedDate(selectedDate) : formattedDate(INITIAL_DATE);
            const gratitudeData = await fetchGratitudeData(formattedSelectedDate);
            dispatch(retrieveGratitudeData(gratitudeData));
        } catch (error) {
            console.error('Failed to fetch gratitude entries:', error);
        }
    }, [selectedDate, dispatch]);

    useEffect(() => {
        dispatch(startLoading());
        fetchGratitudeEntries();
    }, [selectedDate, dispatch, fetchGratitudeEntries]);

    const updateURL = (date) => {
        const today = dayjs().format('YYYY-MM-DD');
        const selectedDay = date.format('YYYY-MM-DD');

        if (selectedDay === today) {
            // Remove date parameter if it's today
            navigate('', { replace: true });
        } else {
            navigate(`?date=${selectedDay}`, { replace: true });
        }
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        updateURL(newDate);
    };

    const handlePreviousDay = () => {
        const newDate = dayjs(selectedDate).subtract(1, 'day');
        setSelectedDate(newDate);
        updateURL(newDate);
    };

    const handleNextDay = () => {
        const newDate = dayjs(selectedDate).add(1, 'day');
        setSelectedDate(newDate);
        updateURL(newDate);
    };

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
                            <SchoolProfile />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DateNavigator
                                currentDate={selectedDate}
                                onDateChange={handleDateChange}
                                onPreviousDay={handlePreviousDay}
                                onNextDay={handleNextDay}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>

            <Grid item xs={12}>
                {isLoading && !gratitudeEntries ? (
                    <Skeleton variant="rounded" height={1000} sx={{ width: 1 }} />
                ) : (
                    <Grid container spacing={3}>
                        {gratitudeEntries?.map((entry, index) => (
                            <Grid item xs={12} key={index}>
                                <GratitudeCard data={entry} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default GratitudeJournal;
