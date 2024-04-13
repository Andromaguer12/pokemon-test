import { SxProps, Theme } from '@mui/material';

export const styles = {
  icons: {
    marginRight: '10px',
    fontSize: '17px'
  } as SxProps<Theme>,
  collapsesTextTitles: {
    fontSize: '15px',
    fontFamily: 'Rubik',
    fontWeight: 700,
    color: '#fff'
  },
  collapseItem: {
    borderBottom: '1px solid #fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};
