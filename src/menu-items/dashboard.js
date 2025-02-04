// assets
import {
    BookOutlined, // for Journal
    DashboardOutlined, // for Dashboard
    UserOutlined, // for Student
    TableOutlined // for Data View
} from '@ant-design/icons';

// icons
const icons = {
    BookOutlined,
    DashboardOutlined,
    TableOutlined,
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'journal',
            title: 'Journal',
            type: 'item',
            url: '/journal',
            icon: icons.BookOutlined,
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
