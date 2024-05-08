import { styled } from '@mui/material/styles';

/**
 * DrawerHeader type used in EditMainContent and ResponsiveDrawer
 */
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  marginTop: 44,
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default DrawerHeader;
