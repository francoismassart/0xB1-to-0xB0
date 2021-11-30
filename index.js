const removeSpaces = (str) => str.replace(/\s{1,}/g, '');

const toHex = (num) => num.toString(16).toUpperCase();

const leftPad = (str, len = '2', char = '0') => {
  while (str.length < len) {
    str = char + str;
  }
  return str;
};

const extractMainData = (input) => {
  let mainData = '';
  try {
    // Remove spaces
    let output = removeSpaces(input);
    // Uppercase
    output = output.toUpperCase();
    // Extract data between prefix (AAB1) and suffix (55)
    const re = /(^AAB1)([0-9A-F]*)(55$)/;
    const result = re.exec(output);
    if (result && result.length === 4) {
      mainData = result[2];
    }
  } catch (err) {

  } finally {
    return mainData;
  }
};

const convertB1toB0 = (input, repeatVal = 8) => {
  const inputStr = extractMainData(input);
  if (inputStr === '') {
    throw new Error('invalid input');
  }
  const bucketLength = 4;
  const hexNbrOfBuckets = inputStr.substr(0, 2);
  const intNbrOfBuckets = parseInt(hexNbrOfBuckets, 16);
  
  const bucketsArr = [];
  for (let i = 0; i < intNbrOfBuckets; i++) {
    const bucket = inputStr.substr(2 + (i * bucketLength), bucketLength);
    bucketsArr.push(bucket);
  }
  const data = inputStr.substring(2 + (intNbrOfBuckets * bucketLength), inputStr.length);
  const hexLength = leftPad(toHex((2 + 2 + (intNbrOfBuckets * bucketLength) + data.length)/2));
  const hexRepVal = leftPad(toHex(repeatVal));
  // 0xAA: sync start
  // 0xB0: command
  // 0x??: length
  // 0x??: number of buckets
  // 0x??: repeats
  // buckets
  // data
  // 0x55: sync end
  return `AA B0 ${hexLength} ${hexNbrOfBuckets} ${hexRepVal} ${bucketsArr.join(' ')} ${data} 55`;
};

module.exports = convertB1toB0;
