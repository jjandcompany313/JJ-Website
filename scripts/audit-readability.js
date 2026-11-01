const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function fleschReadingEase(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  if (sentences.length === 0 || words.length === 0) return 100;

  let totalSyllables = 0;
  words.forEach(w => {
    totalSyllables += countSyllables(w);
  });

  const wordsPerSentence = words.length / sentences.length;
  const syllablesPerWord = totalSyllables / words.length;

  const score = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
  return { score: Math.round(score * 10) / 10, words: words.length, sentences: sentences.length, avgSentenceLen: Math.round(wordsPerSentence) };
}

const files = getHtmlFiles('.');
const scores = [];

files.forEach(f => {
  const raw = fs.readFileSync(f, 'utf8');
  // Strip head, scripts, styles, svg
  const bodyText = raw
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const res = fleschReadingEase(bodyText);
  scores.push({ file: path.relative('.', f).replace(/\\/g, '/'), ...res });
});

scores.sort((a, b) => a.score - b.score);

console.log('Top 10 Most Difficult Pages by Flesch Reading Ease:');
scores.slice(0, 10).forEach(s => {
  console.log(`Score: ${s.score.toFixed(1)} [Avg Words/Sentence: ${s.avgSentenceLen}] -> ${s.file}`);
});
