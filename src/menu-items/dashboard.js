// assets
import { DashboardOutlined, TableOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    TableOutlined,
    TeamOutlined,
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'details',
            title: 'Details',
            type: 'item',
            url: '/details',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'student',
            title: 'Student',
            type: 'item',
            url: '/student',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'data-view',
            title: 'Data View',
            type: 'item',
            url: '/data-view',
            icon: icons.TableOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
