import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import { Skeleton } from '@mui/material';
import styles from '../styles/SkeletonPokemonCard.module.scss'

export default function SkeletonProjectCard() {
  return (
    <div className={styles.cardContainer}>
      <Skeleton variant="rectangular" width={150} height={150} sx={{ borderRadius: "7px" }} />
      <CardActions disableSpacing sx={{ width: "100%"}}>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: "80%", marginRight: "10px" }} />
        <Skeleton
          variant="circular"
          sx={{ marginRight: '10px' }}
          width={30}
          height={30}
        />
      </CardActions>
      <CardActions disableSpacing sx={{ width: "100%", paddingBottom: 0}}>
        <Skeleton variant="rectangular" width={70} height={25} sx={{ borderRadius: "12px", marginRight: "10px" }} />
        <Skeleton variant="rectangular" width={70} height={25} sx={{ borderRadius: "12px", marginRight: "10px" }} />
      </CardActions>
    </div>
  );
}
