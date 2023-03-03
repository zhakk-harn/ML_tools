async function init() {
  const channel = new MessageChannel();
  const model = await Vosk.createModel(
    "/vosk_speech_recognition/models/vosk-model-small-fr-0.22.zip"
  );
  model.registerPort(channel.port1);

  const sampleRate = 48000;

  const recognizer = new model.KaldiRecognizer(sampleRate);
  recognizer.setWords(true);

  recognizer.on("result", (message) => {
    const text = message.result.text;
    if (text.trim().length > 0) {
      onFullMessage(text);
      onPartialAndFull(text);
    }
  });

  recognizer.on("partialresult", (message) => {
    const partial = message.result.partial;
    onPartial(partial);
    onPartialAndFull(partial);
  });

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      channelCount: 1,
      sampleRate,
    },
  });

  const audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule("lib/recognizer-processor.js");
  const recognizerProcessor = new AudioWorkletNode(
    audioContext,
    "recognizer-processor",
    { channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1 }
  );
  recognizerProcessor.port.postMessage(
    { action: "init", recognizerId: recognizer.id },
    [channel.port2]
  );
  recognizerProcessor.connect(audioContext.destination);

  const source = audioContext.createMediaStreamSource(mediaStream);
  source.connect(recognizerProcessor);
}

window.onload = () => {
  const trigger = document.getElementById("trigger");
  trigger.onmouseup = () => {
    trigger.disabled = true;
    init();
  };
};
