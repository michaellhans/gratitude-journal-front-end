import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, FormControl, Grid, MenuItem, Skeleton, Stack, Typography } from '@mui/material';

import Select from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers-pro';

// project import
import MainCard from 'components/MainCard';
import HighlightProfile from 'components/cards/statistics/HighlightProfile';

// assets
import dayjs from 'dayjs';
import { code, formattedDate } from 'utils/format';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
// import GreenAction from './GreenAction';
// import VerticalBarChart from './VerticalBarChart';
import { retrieveKPIDashboard, startLoading } from 'store/reducers/gratitude';
import HorizontalBarChart from './components/HorizontalBarChart';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://localhost:3000/api/gratitude/kpi-dashboard';
const DEFAULT_START_DATE = '2022-08-01';
const DEFAULT_END_DATE = '2024-05-31';

const GratitudeDashboard = () => {
    const [startDate, setStartDate] = useState(dayjs(DEFAULT_START_DATE));
    const [endDate, setEndDate] = useState(dayjs(DEFAULT_END_DATE));
    const kpiState = useSelector((state) => state.gratitude);
    const isLoading = kpiState.isLoading;
    const kpiStatistics = kpiState.statistics;
    const kpiChart = kpiState.chart;

    const dispatch = useDispatch();

    const handleStartDateChange = (value) => {
        setStartDate(value);
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                startDate: startDate ? formattedDate(startDate) : DEFAULT_START_DATE,
                endDate: endDate ? formattedDate(endDate) : DEFAULT_END_DATE
            });
            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (response.ok) {
                    const res = await response.json();
                    dispatch(retrieveKPIDashboard(res));
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        dispatch(startLoading);
        fetchData();
    }, [dispatch, startDate, endDate]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Gratitude Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}></Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Stack spacing={0.5}>
                                <Typography>Start Period</Typography>
                                <DatePicker value={startDate} onChange={handleStartDateChange} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Stack spacing={0.5}>
                                <Typography>End Period</Typography>
                                <DatePicker value={endDate} onChange={handleEndDateChange} />
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            {isLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rounded" height={1000} sx={{ width: 1 / 1 }} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <HighlightProfile
                                title="Total Journal Days"
                                count={kpiStatistics && kpiStatistics.total_entries}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                            <HighlightProfile
                                title="Total Entries in Period"
                                count={kpiStatistics && kpiStatistics.total_entries_mtd}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <HighlightProfile
                                title="Total Grateful Things"
                                count={kpiStatistics && kpiStatistics.total_grateful_things}
                                percentage={59.3}
                                extra="35,000"
                            />
                            <HighlightProfile
                                title="Total Mistakes"
                                count={kpiStatistics && kpiStatistics.total_mistakes}
                                percentage={59.3}
                                extra="35,000"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <HighlightProfile
                                title="Total Unique People Meet"
                                count={kpiStatistics && kpiStatistics.total_unique_people}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                            <HighlightProfile
                                title="Average of Grateful Things"
                                count={kpiStatistics && (kpiStatistics.total_grateful_things / kpiStatistics.total_entries).toFixed(2)}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                        </Stack>
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                    {/* row 2 */}
                    {/* <Grid item xs={12} md={8}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Carbon Footprint From Time to Time</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={0}>
                                    <Button
                                        size="small"
                                        onClick={() => setSlot('month')}
                                        color={slot === 'month' ? 'primary' : 'secondary'}
                                        variant={slot === 'month' ? 'outlined' : 'text'}
                                    >
                                        Month
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => setSlot('day')}
                                        color={slot === 'day' ? 'primary' : 'secondary'}
                                        variant={slot === 'day' ? 'outlined' : 'text'}
                                    >
                                        Day
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <MainCard content={false} sx={{ mt: 1.5 }}>
                            <Box sx={{ pt: 1, pr: 2 }}>
                                <EmissionPredictionSingle slot={slot} history={majorData.cf_history} />
                            </Box>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Green Action</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{ mt: 2, mb: 4 }}>
                            <GreenAction
                                green_action={green_action}
                                total_emission={majorData.cf_in_out['in_class'] + majorData.cf_in_out['out_class']}
                            />
                        </Grid>
                    </Grid> */}

                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Good Habits Statistics</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <HorizontalBarChart data={kpiChart.good_habits} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Bad Habits Statistics</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <HorizontalBarChart data={kpiChart.bad_habits} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Most Grateful Days</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <HorizontalBarChart data={kpiChart.most_grateful_days} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Most Mistake Days</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <HorizontalBarChart data={kpiChart.most_mistake_days} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Top 10 Precious People</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <HorizontalBarChart data={kpiChart.top_people} />
                        </MainCard>
                    </Grid>
                    {/* <Grid item xs={12} md={5}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Commuting Transportation Distribution</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <Box sx={{ p: 3, pb: 0 }}>
                                <Stack spacing={2}>
                                    <Typography variant="h6" color="textSecondary">
                                        Based on {majorProfile && majorProfile.num_of_students} {code[major]} students
                                    </Typography>
                                    <Typography variant="h3">
                                        {majorProfile &&
                                            (
                                                (majorProfile.most_mode_transportation[most_used_transport] * 100) /
                                                Object.values(majorProfile.most_mode_transportation).reduce((acc, val) => acc + val, 0)
                                            ).toFixed(2)}
                                        % are using {most_used_transport}
                                    </Typography>
                                </Stack>
                            </Box>
                            <VerticalBarChart
                                transportationDistribution={majorProfile && majorProfile.most_mode_transportation}
                                unit={'students'}
                            />
                        </MainCard>
                    </Grid> */}
                </>
            )}
        </Grid>
    );
};

export default GratitudeDashboard;
