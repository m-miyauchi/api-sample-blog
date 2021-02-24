# API for new commer training(Blog API)
新人教育のためのブログを想定した簡易API。

## 環境
※Mac環境でDocker内でアプリケーションを動かすと、実行速度(特にWebpackによるビルド)が極端に遅いため、  
データストアのみDockerを使用する
- Node.js v15
- Docker(& Docker compose)

## 主な技術構成
- Node.js(TypeScript)
- [Express](https://expressjs.com/ja/)
- [TypeOrm](https://typeorm.io/#/)
- PostgreSQL 11(Docker)

## セットアップ
```
$ npm i -g yarn
# 使用中シェル設定を再読み込み、またはシェルのセッションを新しく開いた後
$ yarn install
# 失敗することがあるので、その場合再度以下を実行すると正常に終了する
$ ./scripts/setup.sh
# 以下は任意で、初期データを大量投入したい場合(seed)
$ yarn seed:all
```

## DB初期化
```
$ ./scripts/drop_database.sh
```

## 実行
```
$ yarn dev
```

### 初期ユーザ
以下が`setup.sh`で作られる初期ユーザのログイン情報。
```
email: charlotte@de.witte
password: password
```
任意のユーザを作成するには、`scripts/create_member.ts`内のパラメータを変えた後、  
開発環境実行中に`./node_modules/.bin/ts-node ./scripts/create_member.ts`を実行。

## APIドキュメント
以下を実行することにより、`swagger.yml`をHTMLファイルとして出力可能

```
# redoc-static.htmlを生成
$ yarn build:doc
```
フロントエンド環境でもAPI返却値として使用可能なTypeScript型定義ファイルは、`src/types`配下を適宜参照する。

## APIエンドポイントの認証について
記事一覧、詳細、ログインを除き、HTTPヘッダに所定のトークンを設定する必要がある。    
ログインAPI成功時に取得可能な認証トークンを、HTTPヘッダに`auth`というパラメータを設け指定すること(※HTTPプロトコル使用の`Authorization`と異なる点に注意)。  

## テスト
```
# 開発環境を実行中に、以下を実行
$ yarn test
```

## プロダクションビルド
ホスティングする場合に使用。DBコネクションの設定は、`src/modules/create_db_connection.ts`を参照する。  
```
$ yarn build
```

## その他ドキュメント
実装を知りたい場合、以下使用Webアプリケーションフレームワークのドキュメントを参照する。

Express  
[https://expressjs.com/ja/](https://expressjs.com/ja/)