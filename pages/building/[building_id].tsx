import Head from 'next/head';
import React from 'react';
import useTranslation from '../../hooks/translation/useTranslation';
import { useRouter } from 'next/router';
import PokemonPage from '../../components/pages/projectPage/components/PokemonPage';

export default function AboutMeView() {
  const { getTitle } = useTranslation();
  const { pokemon_id } = useRouter().query;

  return (
    <>
      <Head>
        <title>{getTitle('POKEMONPAGE')}</title>
      </Head>
      <PokemonPage pokemonId={pokemon_id as string} />
    </>
  );
}
