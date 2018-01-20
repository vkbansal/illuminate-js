import glamorous from 'glamorous';
import { NavLink } from 'react-router-dom';

const SIDEBAR_WIDTH = 300;
const CONTAINER_WIDTH = 800;
const CONTAINER_PADDING = 16;

export const Container = glamorous.div('container', {
    maxWidth: `${CONTAINER_WIDTH}px`,
    minWidth: `600px`,
    padding: `0 ${CONTAINER_PADDING}px`,
    margin: '0 auto',
    '& pre': {
        margin: '8px 0',
        padding: '16px 0',
        position: 'relative',
        overflow: 'visible',
        '&::before, &::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: `calc(50vw - ${(CONTAINER_WIDTH + SIDEBAR_WIDTH - CONTAINER_PADDING) / 2}px)`,
            height: '100%',
            background: '#2d2d2d',
            top: '0'
        },
        '&::before': {
            right: '100%'
        },
        '&::after': {
            left: '100%'
        }
    },
    '& ol pre::before, & ul pre::before': {
        width: `calc(50vw - ${(CONTAINER_WIDTH + SIDEBAR_WIDTH - CONTAINER_PADDING) / 2}px + 80px)`
    }
});

Container.displayName = 'Container';

export const Wrapper = glamorous.div({
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'stretch',
    minWidth: '960px'
});

Wrapper.displayName = 'Wrapper';

export const Sidebar = glamorous.nav('pure-menu', {
    background: '#eee',
    width: `${SIDEBAR_WIDTH}px`,
    padding: '16px 0',
    maxHeight: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto'
});

Sidebar.displayName = 'Sidebar';

export const Content = glamorous.section({
    background: '#fff',
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    minWidth: '600px',
    boxShadow: '-2px 0px 8px -2px rgba(0, 0,0, 0.2)',
    maxHeight: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto'
});

Content.displayName = 'Content';

export const NavHeading = glamorous.div('pure-menu-heading', {
    fontWeight: 'bold'
});

NavHeading.displayName = 'NavHeading';

export const Nav = glamorous.ul('pure-menu-list', {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    fontSize: '0.9rem'
});

Nav.displayName = 'Nav';

export const NavItem = glamorous.li('pure-menu-item', {
    height: 'auto',
    '&::before': {
        content: '""',
        margin: 0
    }
});

NavItem.displayName = 'NavItem';

export const Link = glamorous(NavLink)('pure-menu-link', {
    position: 'relative',
    transition: 'background 0.2s linear',
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.07)'
    },
    '&.active': {
        color: '#e94949',
        '&::after': {
            opacity: 1
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: 0,
        height: 0,
        border: '8px solid transparent',
        borderRightColor: '#fff',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0,
        transition: 'opacity 0.2s linear'
    }
});

Link.displayName = 'Link';
