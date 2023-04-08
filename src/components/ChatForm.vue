<template>
    <div class="chat-container">
        <h2 class="chat-title">Chat</h2>
        <div class="chat-display">
        <!-- Chatの内容をv-forでリスト表示 keyは配列のIndex-->
        <div v-for="(chat, index) in chats" :key="index" class="chat-item">
            <div class="chat-info">
                <!-- Chatオブジェクトのsenderプロパティを表示 -->
                <div class="chat-sender">{{ chat.sender }}</div>
                <!-- Chatオブジェクトのtimestampプロパティを表示 -->
                <div class="chat-timestamp">{{ chat.timestamp }}</div>
            </div>
            <!-- Chatオブジェクトのmessageプロパティを表示 -->
            <div class="chat-message">{{ chat.message }}</div>
            <!-- @clickはv-on:clickと同じ。イベントハンドラ。methodsプロパティの中に定義されている関数名を指定して呼び出せる。 -->
            <button class="chat-delete" @click="deleteChat(index)">Delete</button>
        </div>

      </div>
        <div class="chat-input">
            <!-- @submitはフォームを送信したときのイベントハンドラを設定するが、SPAの場合は画面全体の読み込みはさせないため、.preventでsubmitを阻止する。 -->
            <form @submit.prevent="sendMessage">
            <!-- v-modelは指定したリアクティブな値を表示する。(双方向のバインディングを行う)-->
                <p>{{ message }}</p>
                <input class="chat-input-box" type="text" placeholder="Enter message..." v-model="message">
                <button class="chat-send">Send</button>
            </form>
        </div>
    </div>
  </template>
  
<script>
    // 外でコンポーネントを参照するためのおまじない 
    export default {
        // data()の中にはこのコンポーネント内で使うデータの初期値を設定する。returnするのはお約束。
        // リアクティブによってデータが更新されたときは自動的に画面が更新される
        data() {
            return {
            // sessionStorageはグローバル変数としてもアクセスできるが、非推奨らしい。vue-sessionライブラリを使う。
            // JSON.perse()でJSONデータをjavascriptオブジェクトにパース。
            // 「||」はjsの場合三項演算子のように使うことができる。
            chats: JSON.parse(sessionStorage.getItem("chats")) || [],
            message: "",
            };
        },
        // methodsプロパティ内にはイベントで使う処理だけでなく、同じmethods内に定義された関数から呼び出す関数も定義できる。
        // テンプレートから呼び出す場合はマスタッシュ、オブジェクト内からはthis.~~。
        methods: {
            sendMessage() {
                // thisはdata()内で定義されたリアクティブな値を参照する。
                if (!this.message) {
                    return;
                }
                const newChat = {
                    sender: "User",
                // 現在の日時を取得する。ブラウザによってフォーマットが異なる。
                    timestamp: new Date().toLocaleString(),
                    message: this.message,
                };
                this.chats.push(newChat);
                // sessionStorageには文字列しか保存できないため、JSON.strigfy()でJSONオブジェクトに変換する。
                sessionStorage.setItem("chats", JSON.stringify(this.chats));
                this.message = "";
            },
            deleteChat(index) {
                // 配列の要素を削除する。
                this.chats.splice(index, 1);
                // 削除した値を保存しなおす。
                sessionStorage.setItem("chats", JSON.stringify(this.chats));
            },
        },
    };
</script>
  
<style scoped>
  .chat-container {
    margin: 50px auto;
    width: 500px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .chat-title {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background-color: #1890ff;
    padding: 16px;
    border-radius: 8px 8px 0 0;
    text-align: center;
  }
  
  .chat-display {
    height: 400px;
    overflow-y: scroll;
  }
  
  .chat-item {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
  }
  
  .chat-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .chat-sender {
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
  
  .chat-timestamp {
    font-size: 12px;
    color: #999;
  }
  
  .chat-message {
    font-size: 18px;
    color: #333;
    word-wrap: break-word;
  }
  
  .chat-delete {
    background-color: #f5222d;
    border: none;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    margin-top: 8px;
    cursor: pointer;
  }
  
  .chat-delete:hover {
    background-color: #ff4d4f;
  }
  .chat-input {
    margin-top: 8px;
    padding: 16px;
  }
</style>
  