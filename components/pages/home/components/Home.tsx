import React, {useCallback, useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'
import background from '../../../../assets/pages/home/background.jpg'
import Image from 'next/image'
import { InputBase, Pagination, Typography } from '@mui/material'
import useTranslation from '../../../../hooks/translation/useTranslation'
import PokemonCard from './PokemonCard'
import SkeletonPokemonCard from './SkeletonPokemonCard'
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store'
import { Search, Warning } from '@mui/icons-material'
import useFetchingContext from '../../../../contexts/backendConection/hook'
import { clearPokemons, getAllPokemons, getPokemonById } from '../../../../services/redux/reducers/home/pokemons/actions'
import pokeball from '../../../../assets/pages/home/pokeball.png'
import ashPikachu from '../../../../assets/pages/home/ashPikachu.png'

const Home = () => {
  const  { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState("")

  const [page, setPage] = useState<number>(0)
  const rowsPerPage = 15;
  const fContext = useFetchingContext()

  const {
    getPokemons: {
      loadingPokemons,
      dataPokemons,
      pageInfoPokemons,
      errorPokemons
    },
    getPokemonById: {
      currentPokemon,
    }
  } = useAppSelector(({ pokemons }) => pokemons);

  useEffect(() => {
    dispatch(getAllPokemons({
      context: fContext,
      offset: page,
    }))
  }, [page, rowsPerPage])

  const handleSearch = useCallback(
    () => {
      if(searchValue.length > 0)
        dispatch(getPokemonById({
          context: fContext,
          pokemonId: searchValue
        }))
    },
    [searchValue],
  )

  const handleInput = (e) => setSearchValue(e.target.value.toLowerCase());
  
  useEffect(() => {
    if(currentPokemon && searchValue.length > 0) {
      const element = document.getElementById('pokemons-container');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPokemon, searchValue])

  useEffect(() => {
    return () => {
      dispatch(clearPokemons())
    }
  }, [])

  return (
    <>
      <div className={styles.homePageContainer}>
        <Image 
          src={background}
          alt="background-image"
          className={styles.imageContainer}
        />
        <div className={styles.shadow}>
          <div className={styles.ashPikachu}>
          </div>
          <div className={styles.maxContainer}>
            <div className={styles.pokemonsWelcome}>
              <div className={styles.mainText}>
                <Typography className={styles.modernPokedex}>Modern Pokedex</Typography>
                <Typography className={styles.text}>{t('pages.home.welcome')}</Typography>
              </div>
              <div className={styles.searchBar}>
                <div className={styles.barAndIcon}>
                  <Search style={{ marginRight: "10px"}} htmlColor="#0C92C1" />
                  <InputBase 
                    placeholder={t('searchByName')}
                    onChange={handleInput}
                    className={styles.input}
                    sx={{ fontSize: "16px", width: "80%"}}
                  />
                </div>
                <div onClick={handleSearch} className={styles.button}>
                  <Typography className={styles.textButton}>{t('search')}</Typography>
                </div>
              </div>
              <Image className={styles.pokedex} src={pokeball} width={120} height={100} alt="pokedex" />
            </div>
            <Image className={styles.imgashPikachu} src={ashPikachu} alt="pokedex" />

          </div>
        </div>
      </div>
      <div className={styles.aboutUsContainer} id="pokemons-container">
        <div className={styles.maxContainer}>
          <div className={styles.mixedProjectsContainer}>
            <div className={styles.sectionTitle}>
              <p className={styles.title}>
                {t('pages.home.pokemonsTitle')}
              </p>

              <p className={styles.section}>
                {t('pages.home.pokemonsTitle.section')}
              </p>
            </div>
            <p className={styles.text}>
              {t('pages.home.pokemonsText')}
            </p>
            {loadingPokemons && (
              <div className={styles.pokemons}>
                {Array(8).fill(1).map((_i, index) => (
                  <SkeletonPokemonCard key={index} />
                ))}
              </div>
            )}
            {!loadingPokemons && <div className={styles.pokemons}>
              {!loadingPokemons && dataPokemons && dataPokemons.map((item) => {
                return <PokemonCard key={item.id} item={item} />
              })}
              <div className={styles.paginationContainer}>
                <Pagination onChange={(_e, newValue) => setPage(newValue)} page={page} count={pageInfoPokemons?.totalPages} variant="outlined" color="primary" />
              </div>
            </div>}
            {errorPokemons && (
              <div className={styles.error}>
                <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
                <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                  {typeof errorPokemons == 'string' ? errorPokemons : 'error'}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home