import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'
import background from '../../../../assets/pages/home/background.jpg'
import Image from 'next/image'
import { MenuItem, Pagination, Select, Typography } from '@mui/material'
import useTranslation from '../../../../hooks/translation/useTranslation'
import PokemonCard from './PokemonCard'
import SkeletonPokemonCard from './SkeletonPokemonCard'
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store'
import { PokemonBarSections } from '../../../../constants/components/pages/SkillsBar/skillsBar';
import FeatureCard from './FeatureCard'
import { Warning } from '@mui/icons-material'
import { convertObjToRequestParams } from '../../../../utils/helpers/convert-obj-to-request-params'
import { getAllPokemons } from '../../../../services/redux/reducers/home/pokemons/actions'
import useFetchingContext from '../../../../contexts/backendConection/hook'

const Home = () => {
  const  { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [page, setPage] = useState<number>(0)
  const rowsPerPage = 15;
  const fContext = useFetchingContext()

  useEffect(() => {
    dispatch(getAllPokemons({
      context: fContext,
      filters: convertObjToRequestParams({
        page,
        limit: rowsPerPage
      })
    }))
  }, [page, rowsPerPage])

  const { getPokemons: { loadingPokemons, dataPokemons, pageInfoPokemons, errorPokemons } } = useAppSelector(({ pokemons }) => pokemons)

  return (
    <>
      <div className={styles.homePageContainer}>
        <Image 
          src={background}
          alt="background-image"
          className={styles.imageContainer}
        />
        <div className={styles.shadow}>
          <div className={styles.texts}>
            <Typography variant='h1' className={styles.titles}>
              {t('pages.home.mainTitle')}
            </Typography>
            <Typography variant='h6' className={styles.titles}>
              {t('pages.home.mainSubtitle')}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.skillsInfoContainer}>
        <div className={styles.maxContainer}>
          {PokemonBarSections.map((d) => {
            return <FeatureCard key={d.title} item={d} />;
          })}
        </div>
      </div>
      <div className={styles.aboutUsContainer} id="projects-container">
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
            {loadingPokemons && (
              <div className={styles.pokemons}>
                {Array(6).fill(1).map((_i, index) => (
                  <SkeletonPokemonCard key={index} />
                ))}
              </div>
            )}
            {!loadingPokemons && <div className={styles.pokemons}>
              {!loadingPokemons && dataPokemons && dataPokemons.map((item) => {
                return <PokemonCard key={item._id} item={item} />
              })}
              <div className={styles.paginationContainer}>
                <Pagination onChange={(_e, newValue) => setPage(newValue)} count={pageInfoPokemons?.totalPages} variant="outlined" color="primary" />
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