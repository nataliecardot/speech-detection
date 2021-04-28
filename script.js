window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
p.textContent = 'Say something...';

recognition.addEventListener('result', (e) => {
  // For each item in the array (that usually has one or two items each named SpeechRecognitionResult), which is itself an array, taking its first item, which is the SpeechRecognitionAlternative, then mapping over that nested array and returning a new array that only has the transcript property
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  const emojiScript = transcript
    .replace(/cat|kitty|kitten|feline/gi, '🐱')
    .replace(/unicorn/gi, '🦄')
    .replace(/poop|poo|pooped/gi, '💩');
  p.textContent = emojiScript;

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
});

recognition.addEventListener('end', recognition.start);

recognition.start();
