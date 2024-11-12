import { adicionarCarro, removerCarro, activate as sistemaActivate } from "./scripts/sistema.js";
import { activate as timePickerActivate } from "./scripts/TimePicker.js";
import { activate as playActivate} from "./scripts/play.js";
import { activate as blobActivate} from "./scripts/blob-animation.js";

blobActivate();
playActivate();
sistemaActivate();
timePickerActivate();

document.querySelector("#adicionar").addEventListener("click", adicionarCarro);
document.querySelector("#remove").addEventListener("click", removerCarro);