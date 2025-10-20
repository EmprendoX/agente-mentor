const fs = require('fs');
const path = require('path');

const markerSequences = [
  String.fromCharCode(60, 60, 60, 60, 60, 60, 60), // <<<<<<<
  String.fromCharCode(62, 62, 62, 62, 62, 62, 62), // >>>>>>>
  String.fromCharCode(61, 61, 61, 61, 61, 61, 61), // =======
];

const conflictPatterns = markerSequences.map(sequence => new RegExp(`^${sequence}`, 'm'));

const shouldSkipDirectory = dirName => ['.git', 'node_modules', '.next'].includes(dirName);

const scanDirectory = (dir, collection) => {
  fs.readdirSync(dir).forEach(entry => {
    if (shouldSkipDirectory(entry)) {
      return;
    }

    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, collection);
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    if (conflictPatterns.some(pattern => pattern.test(content))) {
      collection.push(fullPath);
    }
  });
};

const scanForConflicts = rootDir => {
  const filesWithMarkers = [];
  scanDirectory(rootDir, filesWithMarkers);
  return filesWithMarkers;
};

module.exports = {
  scanForConflicts,
};
