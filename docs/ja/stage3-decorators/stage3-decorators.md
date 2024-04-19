## Stage3 デコレーター

`vue-facing-decorator`と Stage3 デコレーターは互換性がありますが、サードパーティーライブラリの中では Stage3 デコレーターをサポートしていないものもあります。例えば、typescript コードを`.vue`ファイルにコンパイルする`esbuild`などです。

既存のプロジェクトでは Stage2 デコレーターの使用を継続することを推奨します。ただし、新規プロジェクトで Stage3 を使用したい場合はこのドキュメントの内容を参考にしてください。

## 設定

Stage3 のデコレーターを有効化するためには以下の手順に従ってください。

1. `typescript` をバージョン 5 にアップデートします。

2. Stage3 のデコレーターを有効にするには、`compilerOptions.experimentalDecorators` を `false`に設定します。

## 重要

クラスコンポーネントを Vue Option API に即時変換するために`toNative`を使用しなければいけません。
