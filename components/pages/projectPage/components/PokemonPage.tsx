/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styles from '../styles/PokemonPage.module.scss';
import background from '../../../../assets/pages/home/background.jpg'
import {
  useAppDispatch,
  useAppSelector
} from '../../../../services/redux/store';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { getPokemonById } from '../../../../services/redux/reducers/home/pokemons/actions';
import Image from 'next/image';
import { pokemonTypesColor } from '../../home/constants/pokemonTypesColor';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { generalData } from '../../home/constants/pokemonGeneralData';
import { useRouter } from 'next/router';
interface PokemonPageProps {
  pokemonId: string;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const PokemonPage = ({ pokemonId }: PokemonPageProps) => {
  const dispatch = useAppDispatch();
  const fContext = useFetchingContext();
  const { t } = useTranslation();
  const router = useRouter();
  const currentLanguage = router.locale

  const {
    getPokemonById: {
      loadingPokemonById,
      currentPokemon,
      errorPokemonById
    }
  } = useAppSelector(({ pokemons }) => pokemons);

  const description  = 
    currentPokemon && 
      currentPokemon.species.flavor_text_entries
        .filter(({ language }) => language.name == currentLanguage)
        .map(({flavor_text}) => flavor_text).join("<br /><br />")

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

  return (
    <>
      <div className={styles.homePageContainer}>
        <Image 
          src={background}
          alt="background-image"
          className={styles.imageContainer}
        />
        <div className={styles.shadow}>
        </div>
      </div>
      <div className={styles.aboutUsContainer} id="pokemons-container">
      <div className={styles.pokemonImage}>
        {currentPokemon && (
          <div className={styles.typeRingAndImage}>
            <div className={styles.typeRing} style={{ backgroundColor: pokemonTypesColor[currentPokemon.types[0].type.name] }}>
              <div className={styles.imageContainer}>
                <img 
                  src={currentPokemon.sprites.front_default}
                  alt="pokemon-front"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        )}
      </div>
        <div className={styles.maxContainer}>
          {currentPokemon && <div className={styles.datas}>
            <div className={styles.pokemonDatas} style={{ width: "30%" }}>
              <div className={styles.imageContainer}>
                <img 
                  src={currentPokemon.sprites.back_default}
                  alt="pokemon-front"
                  className={styles.image}
                />
                <Typography className={styles.subtitles}>
                  {t("type")}:
                </Typography>
                <div className={styles.types}>
                  {currentPokemon.types && currentPokemon.types.map((type) => {
                    return (
                      <div className={styles.typeCard} style={{ borderColor: pokemonTypesColor[type.type.name], backgroundColor: pokemonTypesColor[type.type.name]+"1f"}} key={type.slot}>
                        <Typography style={{ color: pokemonTypesColor[type.type.name] }} className={styles.text}>{t(type.type.name)}</Typography>
                      </div>
                    )
                  })}
                </div>
                <Typography className={styles.subtitles}>
                  {t("weaknesses")}:
                </Typography>
                <div className={styles.types}>
                  {currentPokemon.weaknesses && currentPokemon.weaknesses.map((type) => {
                    return (
                      <div className={styles.typeCard} style={{ borderColor: pokemonTypesColor[type], backgroundColor: pokemonTypesColor[type]+"1f"}} key={type.slot}>
                        <Typography style={{ color: pokemonTypesColor[type] }} className={styles.text}>{t(type)}</Typography>
                      </div>
                    )
                  })}
                </div>
                <Typography className={styles.subtitles}>
                  {t("stats")}:
                </Typography>
                <div className={styles.stats}>
                  {currentPokemon.stats && currentPokemon.stats.map((stat) => {
                    return (
                      <div className={styles.statCard} key={stat.stat.name}>
                        <Typography className={styles.statName}>
                          {t(stat.stat.name)}:
                        </Typography>
                        <BorderLinearProgress variant="determinate" value={stat.base_stat} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.pokemonDatas}>
              <Typography className={styles.name}>{currentPokemon.name}</Typography>
              <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>
              <div className={styles.divisor} />
              <Typography className={styles.subtitles}>{t("generalInfo")}</Typography>
              <div className={styles.dataLabels}>
                {generalData(currentPokemon, styles).map((pkm) => {
                  return (
                    <div className={styles.label} key={pkm.name}>
                      <Typography className={styles.labelName}>{t(pkm.label)}:</Typography>
                      {pkm.value}
                    </div>
                  )
                })}
              </div>
              <div className={styles.divisor} />
              <Typography className={styles.subtitles}>{t("abilities")}</Typography>
              <div className={styles.dataLabels}>
                {currentPokemon.abilities.map((abi) => {
                  return (
                    <div className={styles.label} key={abi.ability.name}>
                      <Typography className={styles.labelName}>{t(abi.ability.name)}</Typography>
                      {abi.is_hidden && <Typography className={styles.data}>{t("hidden")}</Typography>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
