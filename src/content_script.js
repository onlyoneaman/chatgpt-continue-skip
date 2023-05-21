import { errorTrack } from "./utils/analytics";
import { ContinueButtonText } from "./utils/i18n";

function skipContinueButton() {
  try {
    var buttons = document.querySelectorAll('button.btn');

    // Iterate through each button to find the one with the text "Continue generating"
      buttons.forEach(function(button) {
        if (button.textContent.includes(ContinueButtonText)) {
          // Trigger a click event on the button
          button.click();
        }
      });

  } catch (err) {
    errorTrack(err, "FETCH_DOM_NODE");
  }
}

setInterval(() => skipContinueButton(), 850);
