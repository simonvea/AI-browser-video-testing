const image = document.getElementById('image'); // The image we want to classify
const result = document.getElementById('result'); // The result tag in the HTML
const probability = document.getElementById('probability'); // The probability tag in the HTML

// Initialize the Image Classifier method with MobileNet
ml5
  .imageClassifier('MobileNet')
  .then((classifier) => classifier.classify(image))
  .then((results) => {
    console.table(results);
    result.innerText = results[0].label;
    probability.innerText = results[0].confidence.toFixed(4);
  });
