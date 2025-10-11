/* パーツとして使用する関数を記述 */
import type { PokemonListResponse } from './types'; // ユーザー定義型を読み込む（type{型}）

// ポケモンAPIからデータを取得する
/*** @name getAllPokemon
 *   @function
 *   @type PokemonListResponse
 *   @param url
 *   @return
 */

// 受け取るデータの型を定義する

export const getAllPokemon = (url: string): Promise<PokemonListResponse> => {
  // resolve:成功
  // resolve:失敗
  // Promise：fetch以下の処理が終わるまで待機
  return new Promise<PokemonListResponse>((resolve, reject) => {
    // fetchで引数のURLに対しAPIを接続して情報取得
    fetch(url)
      // 成功ルート
      .then((res: Response) => {
        // resがResponse型なのは自動型推論されるので、省略可（今回は練習なので記述）
        // HTTPエラーコード(4xx/5xx)も Promise は成功とみなすため、チェックを追加
        // HTTPエラーコードで返ってきたときの処理
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`); // Error型の新規オブジェクトとして生成→errorもError型
        }
        return res.json(); //res: fetchで受け取ったデータを格納した変数⇒json形式に変換（data）
      })
      // dataはjson形式かつresolveとして返されるので、Promiseと同じ結果→PokemonListResponse型
      .then((data: PokemonListResponse) => resolve(data)) // dataを「成功」として返す（resolve関数使用）【成功ルート完了】
      // ここから失敗ルート
      .catch((error: Error) => {
        // errorの型はTypeErrorになることもあるので、anyか自動推論に任せてもOK
        // fetchや res.json() で発生したエラーを Promise の失敗ルートに送る
        reject(error);
      });
  });
};
