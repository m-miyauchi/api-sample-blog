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

## テスト
```
# 開発環境を実行中
$ npm run test
```