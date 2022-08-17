<template>
<div class="emoji">
        <ul class="emoji-default">
            <li v-for="(item, index) in emojiJson" :key="index"
                @click="chooseEmojiDefault(item)">
                {{item}}
            </li>
        </ul>

    </div>
</template>

<script>
import {reactive} from "vue"
const emotion={
    "data": "😀,😁,😂,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,😇,😐,😑,😶,😏,😣,😥,😮,😯,😪,😫,😴,😌,😛,😜,😝,😒,😓,😔,😕,😲,😷,😖,😞,😟,😤,😢,😭,😦,😧,😨,😬,😰,😱,😳,😵,😡,😠,💘,❤,💓,💔,💕,💖,💗,💙,💚,💛,💜,💝,💞,💟,❣,💪,👈,👉,☝,👆,👇,✌,✋,👌,👍,👎,✊,👊,👋,👏,👐,✍,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🍎,🍏,🍐,🍑,🍒,🍓,🍅,🍆,🌽,🍄,🌰,🍞,🍖,🍗,🍔,🍟,🍕,🍳,🍲,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🍡,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🍫,🍬,🍭,🍮,🍯,🍼,☕,🍵,🍶,🍷,🍸,🍹,🍺,🍻,🍴,🌹,🍀,🍎,💰,📱,🌙,🍁,🍂,🍃,🌷,💎,🔪,🔫,🏀,⚽,⚡,👄,👍,🔥,🙈,🙉,🙊,🐵,🐒,🐶,🐕,🐩,🐺,🐱,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🐈,🐯,🐅,🐆,🐴,🐎,🐮,🐂,🐃,🐄,🐷,🐖,🐗,🐽,🐏,🐑,🐐,🐪,🐫,🐘,🐭,🐁,🐀,🐹,🐰,🐇,🐻,🐨,🐼,🐾,🐔,🐓,🐣,🐤,🐥,🐦,🐧,🐸,🐊,🐢,🐍,🐲,🐉,🐳,🐋,🐬,🐟,🐠,🐡,🐙,🐚,🐌,🐛,🐜,🐝,🐞,🦋,😈,👿,👹,👺,💀,☠,👻,👽,👾,💣"
}
export default {
   /* data(){
        return{
            emojiJson:emotion.data.split(',')

        }
    },
    methods:{
        chooseEmojiDefault(e){
            console.log(e)
            this.$emit("chooseEmojiDefault",e)
        }

    },*/
   setup(props,context){
       const emojiJson=reactive(emotion.data.split(','))
       const chooseEmojiDefault=(e)=>{
           console.log(e)
           context.emit("chooseEmojiDefault",e)     
       }
       return{
           emojiJson,
           chooseEmojiDefault
       }
   }
     

}
</script>

<style lang="less">
scroll-bar {
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ffffff;
    }
    &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
        background-color: #ffffff;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.2);
    }
}

.emoji {
    text-align: left;
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    .emoji-default {
        width: calc(100% - 40px);
        height: 202px;
        overflow-y: auto;
        @include scroll-bar();
        padding: 0px 20px;

        li {
            display: inline-block;
            //padding: 5px;
            font-size: 24px;
            width: 30px;
            height: 34px;
            overflow: hidden;
            cursor: pointer;
        }

        li:hover {
            background-color: #d5d5d5;
        }
    }
}

</style>