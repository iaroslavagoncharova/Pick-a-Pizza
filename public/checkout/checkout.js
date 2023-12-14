import onCommonReload from "../common.js";
import {checkDevice} from "../menu-button.js";
import getPrompts from "../prompts.js";
import initializeCountdown from "./countdown.js";

window.onload = () => {
  getPrompts();
  onCommonReload();
  checkDevice();
  initializeCountdown();
};