import type { Dispatch, SetStateAction } from 'react';
export interface PokemonResult {
    name: string;
    url: string;
}
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}
/**
 *  各ポケモンの個別データ
 *    叩き台：API情報からAIが生成
 *    最終版：実データと検証・より正確な構造に手動でリファイン
 */
interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details: {
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        }[];
        order: number | null;
        version_group: {
            name: string;
            url: string;
        };
    };
}
interface PokemonStatus {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}
interface PokemonTypes {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
interface PokemonCries {
    latest: string;
    legacy: string;
}
interface PokemonAbilities {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}
interface PokemonPastAbility extends Omit<PokemonAbilities, 'ability'> {
    ability: {
        name: string;
        url: string;
    } | null;
}
interface PokemonForms {
    name: string;
    url: string;
}
interface PokemonGameIndices {
    game_index: number;
    version: {
        name: string;
        url: string;
    };
}
interface HeldItemVersionDetails {
    rarity: number;
    version: {
        name: string;
        url: string;
    };
}
interface PokemonHeldItems {
    item: {
        name: string;
        url: string;
    };
    version_details: HeldItemVersionDetails[];
}
interface PokemonPastAbilities {
    abilities: PokemonPastAbility[];
    generation: {
        name: string;
        url: string;
    };
}
interface PokemonPastTypes {
    generation: {
        name: string;
        url: string;
    };
    types: PokemonTypes[];
}
interface PokemonSprites {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
}
export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    moves: PokemonMove[];
    stats: PokemonStatus[];
    types: PokemonTypes[];
    abilities: PokemonAbilities[];
    base_experience: number;
    cries: PokemonCries;
    forms: PokemonForms[];
    game_indices: PokemonGameIndices[];
    held_items: PokemonHeldItems[];
    is_default: boolean;
    location_area_encounters: string;
    order: number;
    past_abilities: PokemonPastAbilities[];
    past_types: PokemonPastTypes[];
}
export type PokemonDetailAndURL = Pick<PokemonListResponse, 'next' | 'previous'> & {
    pokemonDetailData: PokemonDetail[];
};
export interface FetchError {
    type: 'HTTP_ERROR' | 'NETWORK_ERROR' | 'PARSE_ERROR';
    message: string;
    status?: number;
}
export type setURL = Dispatch<SetStateAction<PokemonListResponse['previous']> | PokemonListResponse['next']>;
export type setBoolean = Dispatch<SetStateAction<boolean>>;
export type setTypePokemonDetailData = Dispatch<SetStateAction<PokemonDetail[]>>;
export {};
