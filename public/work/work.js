import onCommonReload from "../common.js";
import { checkDevice } from "../menu-button.js";
import getPrompts from "../prompts.js";

window.onload = () => {
    getPrompts();
    checkDevice();
    onCommonReload();
};