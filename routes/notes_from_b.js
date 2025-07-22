const express = require('express');
const router = express.Router();
const cors = require('cors'); // corsミドルウェアを追加
require('dotenv').config();

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not set in the environment variables.");
}

const client = new MongoClient(uri);

// corsミドルウェアを使用
router.use(cors());

router.get('/', async (req, res) => {
  try {
    // データベース、コレクションを指定
    await client.connect(); // 接続を確立
    const database = client.db('notes');
    const notes = database.collection('notes');

    //// idが1のドキュメントを取得
    //const query = { id: 1 };
    //const note = await notes.findOne(query);
    // 全てのドキュメントを取得
    const note = await notes.find({}).toArray();

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close(); // 忘れずに接続を閉じる
  }
});

module.exports = router;
