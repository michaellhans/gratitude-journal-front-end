import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { longFormattedDate } from 'utils/format';

GratitudeCard.propTypes = {
    data: PropTypes.shape({
        date: PropTypes.string.isRequired,
        story: PropTypes.string,
        learned: PropTypes.string,
        grateful: PropTypes.arrayOf(PropTypes.string),
        mistake: PropTypes.arrayOf(PropTypes.string),
        people: PropTypes.arrayOf(PropTypes.string),
        good_habit: PropTypes.arrayOf(PropTypes.string),
        bad_habit: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

function GratitudeCard({ data }) {
    return (
        <Card sx={{ p: 2.25 }}>
            {data.date && (
                <CardContent>
                    <Typography variant="h4">Date</Typography>
                    <Typography variant="body1">{longFormattedDate(data.date)}</Typography>
                </CardContent>
            )}
            {data.story && (
                <CardContent>
                    <Typography variant="h4">Story</Typography>
                    <Typography variant="body1">{data.story}</Typography>
                </CardContent>
            )}
            {data.learned && (
                <CardContent>
                    <Typography variant="h4">Learned</Typography>
                    <Typography variant="body1">{data.learned}</Typography>
                </CardContent>
            )}
            {data.grateful && data.grateful.length > 0 && (
                <CardContent>
                    <Typography variant="h4">Grateful</Typography>
                    <List>
                        {data.grateful.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </List>
                </CardContent>
            )}
            {data.mistake && data.mistake.length > 0 && (
                <CardContent>
                    <Typography variant="h4">Mistake</Typography>
                    <List>
                        {data.mistake.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </List>
                </CardContent>
            )}
            {data.people && data.people.length > 0 && (
                <CardContent>
                    <Typography variant="h4">People</Typography>
                    <List>
                        {data.people.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </List>
                </CardContent>
            )}
            {data.good_habit && data.good_habit.length > 0 && (
                <CardContent>
                    <Typography variant="h4">Good Habits</Typography>
                    <List>
                        {data.good_habit.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </List>
                </CardContent>
            )}
            {data.bad_habit && data.bad_habit.length > 0 && (
                <CardContent>
                    <Typography variant="h4">Bad Habits</Typography>
                    <List>
                        {data.bad_habit.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </List>
                </CardContent>
            )}
        </Card>
    );
}

export default GratitudeCard;
