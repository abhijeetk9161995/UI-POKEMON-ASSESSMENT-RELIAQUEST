import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


export type PokemonSelected = {
    id: string,
    number: string,
    name: string,
    weight: {
      minimum: string,
      maximum: string
    },
    height: {
      minimum: string,
      maximum: string
    },
    classification: string,
    types: [
      string
    ],
    resistant: [
      string
    ],
    weaknesses: [
      string
    ],
    fleeRate: number,
    maxCP: number,
    maxHP: number,
    image: string
}

export const GET_SELECTED_POKEMON = gql`
  query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useSelectedGetPokemon = () => {
  const [reqData, setReqData] =  useState<{id?: string}>({});
  const { data, ...queryRes } = useQuery(GET_SELECTED_POKEMON, {
    variables: {
      id: reqData.id
    },
  });

  const pokemon: PokemonSelected = useMemo(() => data?.pokemon || {}, [data]);

  return {
    pokemon,
    setReqData,
    ...queryRes,
  };
};
