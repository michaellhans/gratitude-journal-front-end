import PropTypes from 'prop-types';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Rating, Chip, Stack, Divider } from '@mui/material';
import {
    Star as StarIcon,
    Favorite as HeartIcon,
    EmojiEmotions as EmotionIcon,
    School as LearnedIcon,
    Person as PeopleIcon,
    ThumbUp as GoodHabitIcon,
    ThumbDown as BadHabitIcon,
    Error as MistakeIcon
} from '@mui/icons-material';
import { longFormattedDate } from 'utils/format';

const SectionTitle = ({ icon: Icon, title }) => (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Icon color="primary" sx={{ fontSize: '1.5rem' }} />
        <Typography variant="h4">{title}</Typography>
    </Stack>
);

SectionTitle.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired
};

const ArraySection = ({ items, icon: Icon, color = 'primary' }) => (
    <List sx={{ pl: 2 }}>
        {items.map((item, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                    <Icon color={color} />
                </ListItemIcon>
                <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                        variant: 'body1',
                        sx: { fontSize: '0.9rem' }
                    }}
                />
            </ListItem>
        ))}
    </List>
);

ArraySection.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string
};

function GratitudeCard({ data }) {
    const { date, story, rating, emotion, learned, grateful, mistake, people, good_habit, bad_habit } = data;

    return (
        <Card sx={{ p: 2.25 }}>
            {date && (
                <CardContent sx={{ pb: 1 }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                        {longFormattedDate(date)}
                    </Typography>
                </CardContent>
            )}

            <Divider sx={{ my: 2, borderColor: 'grey.500' }} />

            {rating && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={StarIcon} title="Day Rating" />
                    <Rating
                        value={parseInt(rating, 10)}
                        readOnly
                        max={10}
                        size="large"
                        icon={<StarIcon fontSize="inherit" color="warning" />}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                        sx={{ ml: 0.5 }}
                    />
                </CardContent>
            )}

            {story && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={StarIcon} title="Story of the Day" />
                    <Typography
                        variant="body1"
                        sx={{
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            pl: 3,
                            ml: 0.5,
                            borderLeft: 3,
                            borderColor: 'primary.main',
                            py: 1
                        }}
                    >
                        "{story}"
                    </Typography>
                </CardContent>
            )}

            {emotion && emotion.length > 0 && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={EmotionIcon} title="Emotions" />
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ pl: 0.5 }}>
                        {emotion.map((item, index) => (
                            <Chip key={index} label={item} icon={<EmotionIcon />} color="primary" variant="outlined" sx={{ mb: 1 }} />
                        ))}
                    </Stack>
                </CardContent>
            )}

            {learned && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={LearnedIcon} title="What I Learned" />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '0.9rem',
                            pl: 4,
                            ml: 0.5
                        }}
                    >
                        {learned}
                    </Typography>
                </CardContent>
            )}

            {grateful && grateful.length > 0 && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={HeartIcon} title="Grateful For" />
                    <ArraySection items={grateful} icon={HeartIcon} color="error" />
                </CardContent>
            )}

            {mistake && mistake.length > 0 && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={MistakeIcon} title="Mistakes to Learn From" />
                    <ArraySection items={mistake} icon={MistakeIcon} color="error" />
                </CardContent>
            )}

            {people && people.length > 0 && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={PeopleIcon} title="People Who Made My Day" />
                    <ArraySection items={people} icon={PeopleIcon} color="info" />
                </CardContent>
            )}

            {good_habit && good_habit.length > 0 && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={GoodHabitIcon} title="Good Habits" />
                    <ArraySection items={good_habit} icon={GoodHabitIcon} color="success" />
                </CardContent>
            )}

            {bad_habit && bad_habit.length > 0 && (
                <CardContent sx={{ pb: 2 }}>
                    <SectionTitle icon={BadHabitIcon} title="Habits to Improve" />
                    <ArraySection items={bad_habit} icon={BadHabitIcon} color="warning" />
                </CardContent>
            )}
        </Card>
    );
}

GratitudeCard.propTypes = {
    data: PropTypes.shape({
        date: PropTypes.string.isRequired,
        story: PropTypes.string,
        rating: PropTypes.string,
        emotion: PropTypes.arrayOf(PropTypes.string),
        learned: PropTypes.string,
        grateful: PropTypes.arrayOf(PropTypes.string),
        mistake: PropTypes.arrayOf(PropTypes.string),
        people: PropTypes.arrayOf(PropTypes.string),
        good_habit: PropTypes.arrayOf(PropTypes.string),
        bad_habit: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default GratitudeCard;
