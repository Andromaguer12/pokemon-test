/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styles from '../styles/PokemonPage.module.scss';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../services/redux/store';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { getPokemonById } from '../../../../services/redux/reducers/home/pokemons/actions';
import { Button, Skeleton, Typography } from '@mui/material';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { ShoppingCart, Warning, ZoomIn } from '@mui/icons-material';
import ImageZoomer from '../../../commonLayout/ImageZoomer/ImageZoomer';
import { PokemonMediaCard } from '../../../../typesDefs/constants/app/pokemons/pokemons.types';

interface PokemonPageProps {
  pokemonId: string;
}

const AutoSwipeableViews: any = autoPlay(SwipeableViews);

const PokemonPage = ({ pokemonId }: PokemonPageProps) => {
  const dispatch = useAppDispatch();
  const fContext = useFetchingContext();
  const { t } = useTranslation();

  const [hoveringImage, setHoveringImage] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string>('')

  const {
    getPokemonById: {
      loadingPokemonById,
      currentPokemon,
      errorPokemonById
    }
  } = useAppSelector(({ pokemons }) => pokemons);

  useEffect(() => {
    if (pokemonId) {
      dispatch(
        getPokemonById({
          context: fContext,
          pokemonId
        })
      );
    }
  }, [pokemonId]);
  

  const handleOnAutoScroll = (index: number) => {
    setCurrentIndex(index);
  };

  const shadowClick = (image: string) => {
    setZoomImage(image)
  }

  return (
    <>
      <div className={styles.pokemonPageContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.pokemonCardImages}>
            {loadingPokemonById && (
              <>
                <div className={styles.sectionTitle}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem' }}
                    width={'200px'}
                  />

                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                    width={'120px'}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={'100%'}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={'50%'}
                />
                <Skeleton variant="text" width={'100%'} height={'100%'} />
              </>
            )}
            {!loadingPokemonById && !errorPokemonById && (
              <>
                {currentPokemon?.media &&
                    currentPokemon?.media.length > 0 && <AutoSwipeableViews
                  style={{ width: '100%', height: '75%' }}
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                    background: '#e7e7e7'
                  }}
                  enableMouseEvents
                  onChangeIndex={handleOnAutoScroll}
                >
                  {currentPokemon?.media &&
                    currentPokemon?.media.length > 0 &&
                    currentPokemon?.media.map((image: PokemonMediaCard, index) => {
                      const media = image.mediaType === 'video' ? fContext.videoHandler(image.link, '/pokemons/') : fContext.imageHandler(image.link, '/pokemons/')
                      
                      return (
                        <div className={styles.carouselSlide} onMouseEnter={() => setHoveringImage(true)} onMouseLeave={() => setHoveringImage(false)} key={image._id}>
                          {image.mediaType === 'video' ? 
                            (
                              <video 
                                className={styles.image}
                                style={{ marginRight: '5px' }}
                                controls
                                autoPlay={currentIndex === index}
                                src={media} 
                              />
                            ) : (
                              <img
                                className={styles.image}
                                src={media}
                                style={{ marginRight: '5px' }}
                                alt={image.name}
                              />
                            )}
                          {image.mediaType === 'image' && hoveringImage && <div className={styles.zoomShadow} onClick={() => shadowClick(fContext.imageHandler(image.link, '/pokemons/'))}>
                            <ZoomIn sx={{ color: "#ffffff", fontSize: 50 }} />
                          </div>}
                        </div>
                      )
                    })}
                </AutoSwipeableViews>}
                {currentPokemon?.media &&
                    currentPokemon?.media.length > 0 && <div className={styles.dots}>
                  {currentPokemon?.media &&
                    currentPokemon?.media.length > 0 &&
                    currentPokemon?.media.map(
                      (image: PokemonMediaCard, index: number) => (
                        <div
                          className={
                            currentIndex === index
                              ? styles.dot__selected
                              : styles.dot
                          }
                          key={image._id}
                        />
                      )
                    )}
                </div>}
              </>
            )}
            {errorPokemonById && (
              <div className={styles.error}>
                <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
                <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                  {typeof errorPokemonById == 'string'
                    ? errorPokemonById
                    : 'error'}
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.pokemonInfoCard}>
            {(loadingPokemonById || errorPokemonById) && (
              <>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '2rem' }}
                  width={'100%'}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '30px' }}
                  width={80}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={80}
                />
                <div className={styles.ownerCard}>
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    className={styles.avatar}
                  />
                  <div className={styles.ownerInfo}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={'80%'}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={'80px'}
                    />
                  </div>
                </div>
                <div className={styles.horizontalDivider} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={80}
                />
                <div className={styles.descriptionContainer}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'50%'}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={120}
                />
                <div className={styles.pokemonTypes}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                </div>
                <div className={styles.horizontalDivider} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '0px' }}
                  width={80}
                />
                <div className={styles.usedTechnologies}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                </div>
              </>
            )}
            {currentPokemon && (
              <>
                <Typography className={styles.title}>
                  {currentPokemon?.address}
                </Typography>
                <Typography
                  className={styles.subtitles}
                  sx={{ marginBottom: ' 30px' }}
                >
                  {t('pages.pokemonPage.pokemonInfo')}
                </Typography>
                <Typography className={styles.subtitles2}>
                  {t('pages.pokemonPage.description')}
                </Typography>
                <div className={styles.descriptionContainer}>
                  <Typography className={styles.description}>
                    {t(currentPokemon?.description ?? 'No description')}
                  </Typography>
                </div>
                <Typography className={styles.subtitles2}>
                  {t('pages.pokemonPage.details')}
                </Typography>
                <Typography className={styles.squareMeters}>
                  {currentPokemon?.squareMeters}{'m²'}
                </Typography>
                <div className={styles.horizontalDivider} />
                <Typography className={styles.subtitles2}>
                  {t('pages.pokemonPage.price')}
                </Typography>
                <Typography className={styles.price}>
                  {currentPokemon?.price && currentPokemon?.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Typography>

                <Button 
                  color='primary' 
                  fullWidth 
                  variant='contained' 
                  endIcon={<ShoppingCart />}
                  disableElevation
                  sx={{ padding: '10px 20px', marginTop: '30px'}}
                  >
                  {t('pages.pokemonPage.button.buy')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <ImageZoomer 
        open={Boolean(zoomImage)}
        image={zoomImage}
        close={() => setZoomImage('')}
      />
    </>
  );
};

export default PokemonPage;
