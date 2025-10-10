// プロジェクトのルートディレクトリに作成するファイル
// Sass関連の設定はここに記述
// ≒gulpfile.js
module.exports = {
  plugins: [
    // 1. メディアクエリのソートと結合 (postcss-sort-media-queries)
    // 開発時 (npm run dev) でも常にメディアクエリを結合・ソート
    require('postcss-sort-media-queries')({
      sort: 'mobile-first',
    }),

    // 本番ビルド時 (npm run build) のみ cssnano で完全に圧縮
    process.env.NODE_ENV === 'production' &&
      require('cssnano')({
        preset: 'default',
      }),

    // filter(Boolean) は、開発時に 'false' となった cssnano の設定を除外するために必要
  ].filter(Boolean),
};
