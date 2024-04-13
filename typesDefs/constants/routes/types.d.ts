export type RouteDeclaration = {
  path: string;
  exact: boolean;
};

export type AppRoutesObject = {
  HOME: string;
  ABOUT_POKEMON: string;
};

export type RoutesClassification = {
  PUBLIC: {
    HOME: RouteDeclaration;
    ABOUT_POKEMON: RouteDeclaration;
  };
};
