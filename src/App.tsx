// 基本設定と拡張機能
import { useEffect, useState } from 'react';
import type { Result } from 'neverthrow';

// 外部の関数・型定義ファイル
import type { PokemonDetail, FetchError } from './utilities/types'; // PokemonListResponse型を使用（type{型}）
import { fetchPokemonData } from './utilities/pokemon'; // getAllPokemon関数を呼び出し
import './scss/App.scss'; // viteがコンパイル時にcssに自動で処理するので、importはscssでOK

// 読み込むコンポーネント
import Card from './components/Card';
import NavigationBar from './components/NavigationBar';

function App() {
  // 土台になるポケモンAPIのURLを指定
  const initialURL: string = 'https://pokeapi.co/api/v2/pokemon';

  // ローディング画面設定
  // 画面の状態管理のためuseStateを使用
  // ロード中/ロード済の二択なのでbooleanで判断
  // 初期値⇒リロード＝ローディング中＝true
  const [loading, setLoading] = useState<boolean>(true);

  // 各ポケモンの詳細情報を格納（useEffect外で使用）
  const [pokemonDetailData, setPokemonDetailData] = useState<PokemonDetail[]>([]);

  // ブラウザロード時実行
  // 一度だけ実行⇒第二引数は[]で空配列
  useEffect(() => {
    //
    // 非同期記述エリア ↓↓
    const asynchroFunction = async () => {
      // 非同期処理でAPIから情報取得処理を定義

      // fetch処理一式実行
      // エラー含めResult型で結果が戻ってくる
      const resultPokemonData: Result<PokemonDetail[], FetchError> = await fetchPokemonData(initialURL);

      // resultPokemonData:Resultは成功も失敗も内包⇒matchで分岐処理
      resultPokemonData.match(
        // 成功：変数pokemonData
        (pokemonData) => {
          // 結果をpokemonDetailDataに格納（更新）
          setPokemonDetailData(pokemonData);
        },
        // 失敗：変数fetchError
        (fetchError) => {
          // FetchError を処理
          console.error(`[データ取得失敗] エラータイプ: ${fetchError.type}`, fetchError);
        },
      );

      // ローディング解除
      setLoading(false);
    };
    // 非同期記述エリア ↑↑

    // 非同期処理実行
    asynchroFunction();
  }, []);

  // 変数loadingの状態で画面の表示を変更⇒短いのでifを使用せず３項演算子で済ませる
  // 条件文 ? trueの処理 : falseの処理
  return (
    <>
      <NavigationBar />
      <div className='App'>
        {loading ? (
          <h1>Now Loading</h1>
        ) : (
          /* ロード完了後のメイン処理 */
          <div className='pokemonCardContainer'>
            {pokemonDetailData.map((pokemon: PokemonDetail, i: number) => {
              // 配列pokemonDetailDataの各データをpokemonをする
              // i = index(0~19)
              // Cardコンポーネントを呼び出す
              // key:配列ループのindex
              // props名：pokemon(引数pokemonを渡す)
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
