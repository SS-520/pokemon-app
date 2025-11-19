import React from 'react';
import type { PokemonDetail } from '../utilities/types';
import '../scss/Card.scss';
interface CardProps {
    pokemon: PokemonDetail;
}
/*** @name
 *   @function
 *   @type component
 *   @props pokemon
 */
declare const Card: ({ pokemon }: CardProps) => React.ReactNode;
export default Card;
