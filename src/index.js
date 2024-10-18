import { Player} from "./player";
import {TouchHandler} from "./TouchHandler";
document.getElementById("startbutton")
.addEventListener("click", Start)
function Start() {
const speechEnabled =document.getElementById("switch").checked
    document.getElementById("start").remove()
const main = document.getElementById("main");
const result =document.getElementById("result");
const player= new Player(speechEnabled);
const touchHandler = new TouchHandler(player, result);
main.addEventListener("touchstart", (e) => touchHandler.Handle(e));
player.SayMessage("Начинаем! Если вы используете скринридер, выключите его, чтобы вводить брайлевские цифры");
}