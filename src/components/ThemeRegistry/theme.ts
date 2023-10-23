import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ptBR as corePtBR } from '@mui/material/locale';
import { ptBR } from '@mui/x-date-pickers/locales';


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: createColor("#00585E"),
    warning: createColor("#BE0000"),
    success: createColor("#2B7D83")
  },
  // @ts-ignore
  ptBR,
  corePtBR,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;