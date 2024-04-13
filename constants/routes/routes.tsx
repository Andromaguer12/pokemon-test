import { RoutesClassification } from '../../typesDefs/constants/routes/types';

export const RoutesHeadTitles = {
  HOME: 'home',
  ABOUT_POKEMON: 'pokemonInfo',
};
export const AllRoutes = {
  HOME: '/',
  ABOUT_POKEMON: '/pokemon/',
};

export const AppRoutes: RoutesClassification = {
  PUBLIC: {
    HOME: {
      path: AllRoutes.HOME,
      exact: false
    },
    ABOUT_POKEMON: {
      path: AllRoutes.HOME,
      exact: false
    },
  }
};
