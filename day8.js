/**
 * @fileoverview Description of this file.
 */

 const fs = require('fs');

 const segmentCounts = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
 const uniqueCounts = [2, 4, 3, 7];
 /**
  * Segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  * segCounts = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
  *              0. 1. 2. 3. 4. 5. 6. 7. 8. 9
  * lengths      [2, 3, 4, 5, 5, 5, 6, 6, 6, 7]
  * sortedSegs = [1, 7, 4, 2, 3, 5, 0, 6, 9, 8]
  */
 
 const checkUnique = (nums) => {
   let count = 0;
   for (let i = 0; i < nums.length; i++) {
     if (uniqueCounts.includes(nums[i].length)) {
       count = count + 1;
     }
   }
   return count;
 };
 
 const decodeSegments = (nums) => {
   const sortedNums = nums.sort((x,y) => x.length - y.length);
   const [tempc, tempf] = sortedNums[0];
   const decodedSegs = [];
   // Solve for a
   for (let c of sortedNums[1]) {
     if (c != tempc && c != tempf) {
       decodedSegs[0] = c;
     }
   }
   // solve for c and f
   // Loop through chars of 6 count nums and find either c or f
   // is missing and that is the value for the real c
   let cCount = 0;
   let fCount = 0;
   const temp6 = sortedNums[6];
   const temp9 = sortedNums[7];
   const temp0 = sortedNums[8];
   for (let i = 0; i < 6; i++) {
     if (temp6[i] == tempc) {
       cCount = cCount + 1;
     }
     if (temp9[i] == tempc) {
       cCount = cCount + 1;
     }
     if (temp0[i] == tempc) {
       cCount = cCount + 1;
     }
     if (temp6[i] == tempf) {
       fCount = fCount + 1;
     }
     if (temp9[i] == tempf) {
       fCount = fCount + 1;
     }
     if (temp0[i] == tempf) {
       fCount = fCount + 1;
     }
   }
   if (cCount < fCount) {
     decodedSegs[2] = tempc;
     decodedSegs[5] = tempf;
   } else {
     decodedSegs[2] = tempf;
     decodedSegs[5] = tempc;
   }
 
   // get b and d using 4
   const actual4 = sortedNums[2];
   const unkown4vals = [];
   for (let i = 0; i < 4; i++) {
     if (actual4[i] != tempf && actual4[i] != tempc) {
       unkown4vals.push(actual4[i]);
     }
   }
 
   //use b and d with 0,6 and 9 to solve for both of them
   // this gives us solutions for a,b,c,d, and f
   if (!(temp0.includes(unkown4vals[0]) || temp6.includes(unkown4vals[0]) || temp9.includes(unkown4vals[0]))) {
     decodedSegs[3] = unkown4vals[0];
     decodedSegs[1] = unkown4vals[1];
   } else {
     decodedSegs[3] = unkown4vals[1];
     decodedSegs[1] = unkown4vals[0];
   }
 
   // use 0,6, and 9 and the current decoded values to solve for e and g
   for (let c of "abcdefg") {
     let count = 0;
     if(temp0.includes(c)){
       count = count + 1;
     } if (temp6.includes(c)) {
       count = count + 1;
     } if (temp9.includes(c)) {
       count = count + 1;
     }
     if (count == 2 && !decodedSegs.includes(c)) {
       decodedSegs[4] = c;
     }
     if (count == 3 && !decodedSegs.includes(c)) {
       decodedSegs[6] = c;
     }
   }
   // console.log(decodedSegs);
   return decodedSegs;
 };
 
 const solveWithCode = (decodedSegs, outputs) => {
   let finalNum = 0;
   let decimalPlace = 3;
   for (output of outputs) {
     if (output.length == 2) {
         finalNum = finalNum + (1 * (10 ** decimalPlace));
     }
     if (output.length == 3) {
         finalNum = finalNum + (7 * (10 ** decimalPlace));
     }
     if (output.length == 4) {
       finalNum = finalNum + (4 * (10 ** decimalPlace));
     }
     if (output.length == 7) {
       finalNum = finalNum + (8 * (10 ** decimalPlace));
     }
     if (output.length == 5) {
       // If the number includes the e segment it's a 2
       if (output.includes(decodedSegs[4])) {
         finalNum = finalNum + (2 * (10 ** decimalPlace));
       } else if (output.includes(decodedSegs[2])) {
         finalNum = finalNum + (3 * (10 ** decimalPlace));
       } else {
         finalNum = finalNum + (5 * (10 ** decimalPlace));
       }
     }
     if (output.length == 6) {
       if (!output.includes(decodedSegs[3])) {
         finalNum = finalNum + (0 * (10 ** decimalPlace));
       } else if (output.includes(decodedSegs[4])) {
         finalNum = finalNum + (6 * (10 ** decimalPlace));
       } else {
         finalNum = finalNum + (9 * (10 ** decimalPlace));
       }
     }
     decimalPlace--;
   }
   return finalNum;
 }
 
 const day8 = () => {
   const data = fs.readFileSync('day8.txt', 'utf8');
   const arrData = data.split("\n");
   const inputs = [];
   const outputs = [];
   console.log(arrData.length);
   // let uniqueSegments = 0;
   let outputSum = 0;
   for (let i = 0; i< arrData.length; i++) {
     if (arrData[i]) {
       const [input, output] = arrData[i].split('|');
       outputs[i] = (output.split(' ').filter(x => x != ''));
       // uniqueSegments = uniqueSegments + checkUnique(outputs[i]);
       inputs[i] = (input.split(' ').filter(x => x != ''));
       const decodedSegs = decodeSegments(inputs[i]);
       const result = solveWithCode(decodedSegs, outputs[i]);
    //    console.log(result);
       outputSum = outputSum + result;
     }
   }
   // const decodedSegs = decodeSegments(inputs[7]);
   // const result = solveWithCode(decodedSegs, outputs[7]);
   // console.log(result);
   console.log(outputSum);
 }
 
 day8();