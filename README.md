# API for new commer training
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
$ npm i
# 失敗することがあるので、その場合再度以下を実行すると正常に終了する
$ ./scripts/setup.sh
```

## DB初期化
```
$ ./scripts/drop_database.sh
```

## 実行
```
$ npm run dev
```

### 初期ユーザ
以下が`setup.sh`で作られる初期ユーザのログイン情報。
```
email: charlotte@de.witte
password: password
```
任意のユーザを作成するには、`scripts/create_member.ts`内のパラメータを変えた後、  
開発環境実行中に`./node_modules/.bin/ts-node ./scripts/create_member.ts`を実行。

## テスト
```
# 開発環境を実行中に、以下を実行
$ npm run test
```

## APIエンドポイント情報
`src/app.ts`の`// routes`コメント以降でロードされているモジュールの中身を参照する。  
大まかに、`res.send()`の内容を見れば、その通りだが、分かりにくい場合など、以下使用Webフレームワークのドキュメントを参照する。  

Express  
[https://expressjs.com/ja/](https://expressjs.com/ja/)