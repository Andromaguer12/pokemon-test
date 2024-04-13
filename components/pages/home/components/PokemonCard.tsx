import * as React from 'react';
import Typography from '@mui/material/Typography';
import useTranslation from '../../../../hooks/translation/useTranslation';
import styles from '../styles/PokemonCard.module.scss';
import { useRouter } from 'next/router';
import { AllRoutes } from '../../../../constants/routes/routes';
import { IPokemon } from '../../../../typesDefs/constants/app/pokemons/pokemons.types';
import { IconButton } from '@mui/material';
import { ShareOutlined } from '@mui/icons-material';
import { pokemonTypesColor } from '../constants/pokemonTypesColor';
interface PokemonCardProps {
  item: Partial<IPokemon>;
}

export default function PokemonCard({ item }: PokemonCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleViewMore = () => {
    router.push(AllRoutes.ABOUT_POKEMON + '/' + item.id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: t('share.pokemon'),
          url: AllRoutes.ABOUT_POKEMON + '/' + item.id
        });
      } catch (error) {
        console.error('error in share', error);
      }
    } else {
      console.log('cant share...');
    }
  };

  const link = item?.sprites?.front_default;

  const media = link;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer} onClick={handleViewMore}>
        <img 
          src={media}
          alt="pokemon-front"
          className={styles.image}
        />
      </div>
      <div className={styles.cardText}>
        <div className={styles.nameAndShare}>
          <Typography
            className={styles.pokemonName}
            fontWeight={'bold'}
            color="text.secondary"
          >
            {item.name}
          </Typography>

          <IconButton onClick={handleShare} size='medium' className={styles.shareButton}>
            <ShareOutlined style={{ fontSize: "20px" }} htmlColor='#0C92C1' />
          </IconButton>
        </div>
        <div className={styles.types}>
          {item.types && item.types.map((type) => {
            return (
              <div className={styles.typeCard} style={{ borderColor: pokemonTypesColor[type.type.name], backgroundColor: pokemonTypesColor[type.type.name]+"1f"}} key={type.slot}>
                <Typography style={{ color: pokemonTypesColor[type.type.name] }} className={styles.text}>{t(type.type.name)}</Typography>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
