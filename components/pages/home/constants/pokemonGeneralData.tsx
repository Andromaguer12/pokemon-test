import React from 'react';
import { IPokemon } from '../../../../typesDefs/constants/app/pokemons/pokemons.types';
import { Female, Male } from '@mui/icons-material';
import { Typography } from '@mui/material';

export const generalData = (pokemon: IPokemon, styles: any) => [
  {
    label: "category",
    name: "category",
    value: (
      <>
        {pokemon?.flavor_text_entries}
      </>
    )
  },
  {
    label: "generation",
    name: "generation",
    value: (
      <>
        <Typography className={styles?.data}>{pokemon?.species?.generation?.name.split("generation-")[1].toUpperCase()}</Typography>
      </>
    )
  },
  {
    label: "height",
    name: "height",
    value: (
      <>
        <Typography className={styles?.data}>{pokemon?.height}m</Typography>
      </>
    )
  },
  {
    label: "weight",
    name: "weight",
    value: (
      <>
        <Typography className={styles?.data}>{pokemon?.weight}kg</Typography>
      </>
    )
  },
  {
    label: "gender",
    name: "gender",
    value: (
      <>
        {pokemon?.gender_rate === 0 || pokemon?.gender_rate !== 8 && <Male htmlColor="#000000" style={{ fontSize: "18px"}} />}
        {pokemon?.gender_rate === 8 || pokemon?.gender_rate !== 0  && <Female htmlColor="#000000" style={{ fontSize: "18px"}} />}
      </>
    )
  }
]