# API for new commer training

## 環境
※Mac環境でDocker内でアプリケーションを動かすと実行速度が極端に遅いので、データストアのみDockerを使用
- Node.js v15
- Docker(& Docker compose)

## セットアップ
```
$ npm i
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
任意のユーザを作成するには、開発環境実行中に、`scripts/create_member.ts`内のパラメータを変えたのち、  
`./node_modules/.bin/ts-node ./scripts/create_member.ts`を実行。

## テスト
```
# 開発環境を実行中
$ npm run test
```