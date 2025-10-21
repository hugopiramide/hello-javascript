window.addEventListener("DOMContentLoaded", () => {
  const recordingButton = document.getElementById("recording-button");
  const transcriptionResult = document.getElementById("transcription-result");
  let isRecording = false;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    const onResult = (event) => {
      transcriptionResult.textContent = "";
      for (const result of event.results) {
        const text = document.createTextNode(result[0].transcript);

        const p = document.createElement("p");
        p.appendChild(text);
        if (result.isFinal) {
          p.classList.add("final");
        }
        transcriptionResult.appendChild(p);
      }
    };

    const onClick = (event) => {
      if (isRecording) {
        recognition.stop();
        recordingButton.textContent = "Start recording";
      } else {
        recognition.start();
        recordingButton.textContent = "Stop recording";
      }
      isRecording = !isRecording;
    };
    recognition.addEventListener("result", onResult);
    recordingButton.addEventListener("click", onClick);
  } else {
    recordingButton.remove();
    const message = document.getElementById("error-message");
    message.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
  }
});