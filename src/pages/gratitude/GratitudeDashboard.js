import { useEffect, useState } from 'react';
import { Grid, Skeleton, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import MainCard from 'components/MainCard';
import HighlightProfile from 'components/cards/statistics/HighlightProfile';
import dayjs from 'dayjs';
import { formattedDate } from 'utils/format';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { retrieveKPIDashboard, startLoading } from 'store/reducers/gratitude';
import HorizontalBarChart from './components/HorizontalBarChart';
import { fetchKPIDashboard } from '../../api/dashboard';

const DEFAULT_START_DATE = `${new Date().getFullYear()}-01-01`;
const DEFAULT_END_DATE = new Date().toISOString().split('T')[0];

import PropTypes from 'prop-types';

const StatisticCard = ({ title, data, percentage, isLoss = false, color = 'warning', extra = '1,943' }) => (
    <HighlightProfile title={title} count={data} percentage={percentage} isLoss={isLoss} color={color} extra={extra} />
);

StatisticCard.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percentage: PropTypes.number.isRequired,
    isLoss: PropTypes.bool,
    color: PropTypes.string,
    extra: PropTypes.string
};

const ChartSection = ({ title, data }) => (
    <Grid item xs={12} md={6}>
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <Typography variant="h5">{title}</Typography>
            </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
            <HorizontalBarChart data={data || []} />
        </MainCard>
    </Grid>
);

ChartSection.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};

const GratitudeDashboard = () => {
    const [startDate, setStartDate] = useState(dayjs(DEFAULT_START_DATE));
    const [endDate, setEndDate] = useState(dayjs(DEFAULT_END_DATE));
    const { isLoading, statistics: kpiStatistics = {}, chart: kpiChart = {} } = useSelector((state) => state.gratitude);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(startLoading);
                const data = await fetchKPIDashboard(
                    startDate ? formattedDate(startDate) : DEFAULT_START_DATE,
                    endDate ? formattedDate(endDate) : DEFAULT_END_DATE
                );
                dispatch(retrieveKPIDashboard(data));
            } catch (error) {
                // Error is already logged in the service
            }
        };

        fetchData();
    }, [dispatch, startDate, endDate]);

    const renderDatePicker = (label, value, onChange) => (
        <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={0.5}>
                <Typography>{label}</Typography>
                <DatePicker value={value} onChange={onChange} />
            </Stack>
        </Grid>
    );

    const averageGratefulThings =
        kpiStatistics?.total_grateful_things && kpiStatistics?.total_entries
            ? (kpiStatistics.total_grateful_things / kpiStatistics.total_entries).toFixed(2)
            : 0;

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Gratitude Dashboard</Typography>
            </Grid>

            {isLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={800} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12} sm={12}>
                        <MainCard contentSX={{ p: 2.25 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4} />
                                {renderDatePicker('Start Period', startDate, setStartDate)}
                                {renderDatePicker('End Period', endDate, setEndDate)}
                            </Grid>
                        </MainCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <StatisticCard title="Total Journal Days" data={kpiStatistics?.total_entries || 0} percentage={27.4} />
                            <StatisticCard title="Total Entries in Period" data={kpiStatistics?.total_entries_mtd || 0} percentage={27.4} />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <StatisticCard
                                title="Total Grateful Things"
                                data={kpiStatistics?.total_grateful_things || 0}
                                percentage={59.3}
                                isLoss={false}
                                extra="35,000"
                            />
                            <StatisticCard
                                title="Total Mistakes"
                                data={kpiStatistics?.total_mistakes || 0}
                                percentage={59.3}
                                isLoss={false}
                                extra="35,000"
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <StatisticCard
                                title="Total Unique People Meet"
                                data={kpiStatistics?.total_unique_people || 0}
                                percentage={27.4}
                            />
                            <StatisticCard title="Average of Grateful Things" data={averageGratefulThings} percentage={27.4} />
                        </Stack>
                    </Grid>

                    <ChartSection title="Good Habits Statistics" data={kpiChart?.good_habits || []} />
                    <ChartSection title="Bad Habits Statistics" data={kpiChart?.bad_habits || []} />
                    <ChartSection title="Most Grateful Days" data={kpiChart?.most_grateful_days || []} />
                    <ChartSection title="Most Mistake Days" data={kpiChart?.most_mistake_days || []} />
                    <ChartSection title="Top 10 Precious People" data={kpiChart?.top_people || []} />
                </>
            )}
        </Grid>
    );
};

export default GratitudeDashboard;
