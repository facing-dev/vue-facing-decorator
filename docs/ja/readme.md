# インフォメーション

![GitHub](https://img.shields.io/github/license/facing-dev/vue-facing-decorator) ![npm](https://img.shields.io/npm/v/vue-facing-decorator) ![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/vue-facing-decorator/peer/vue) ![lts](https://img.shields.io/badge/LTS-prepared-blue)

`vue-facing-decorator`は Vue 3 向けに設計され、クラス内に Vue コンポーネントを記述することができます。

TypeScript とデコレーターで動作します。

-   TypeScript のデコレーターを使用して Vue クラスコンポーネントを作成します。
-   Stage2、および Stage3 の両デコレーターで使用できます。
-   TypeScript、JavaScript の両プロジェクトで使用できます。
-   安全性: 指定に応じて、ES クラスを Vue Options API へと変換します。
-   パフォーマンス: 一度プロジェクトにロードしてしまえば、どこでも利用できます。
-   ES のクラス継承に加え、Vue の`extends`、`mixins`に対応しています。
-   [詳細はこちら](https://class-component.vuejs.org)

[](./quick-start/code-what-it-is-example.ts ':include :type=code typescript')

[vue-class-component](https://github.com/vuejs/vue-class-component)および、[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)はいずれも Deprecated です。ご所望の場合はリンクからお試し下さい。

ご提案、ご寄付をお待ちしております。

[クイックスタート > ](/ja/quick-start/quick-start.md)

# ディスカッション

[Discord への入場はこちら https://discord.gg/4exxtFgkcz](https://discord.gg/4exxtFgkcz)

# ドキュメントの翻訳

ドキュメントの翻訳をご希望の場合は以下の手順に従ってください。

1. このリポジトリをフォーク、クローン
2. cd repo/docs
3. npm install -g http-server
4. http-server

その後、ターミナルに表示される URL からドキュメントのサイトにアクセスできます。`en`ディレクトリを修正しプルリクエストを作成してください。

ご協力ありがとうございます。:)
