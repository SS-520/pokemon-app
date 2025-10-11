import { useEffect } from 'react';
import './App.scss';
import type { PokemonListResponse } from './utilities/types'; // PokemonListResponse型を使用（type{型}）
import { getAllPokemon } from './utilities/pokemon'; // getAllPokemon関数を呼び出し

function App() {
  // 土台になるポケモンAPIのURLを指定
  const initialURL: string = 'https://pokeapi.co/api/v2/pokemon';

  // ブラウザロード時実行
  // 一度だけ実行⇒第二引数は[]で空配列
  useEffect(() => {
    // 非同期処理でAPIから情報取得処理を定義
    const fetchPokemonData = async () => {
      try {
        // 失敗の可能性がある処理（awaitで呼び出す関数）

        // 全ポケデータを取得
        // getAllPokemon()の処理が終わるまで待機してからresPokemonに格納
        const resPokemon: PokemonListResponse = await getAllPokemon(initialURL); // src/utilities/pokemon.tsxの関数にAPIのUPLを渡す
        console.log(resPokemon); // 結果を出力
      } catch (error) {
        // awaitの処理が失敗（reject）されたらこっちに入る(引数：error)
        console.error('データ取得中にエラーが発生しました:', error);
      }
    };
    fetchPokemonData(); // 定義した非同期関数を実行
  }, []);
  return <div className='App'>ポケモンAPI</div>;
}

export default App;
