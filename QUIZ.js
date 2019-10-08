const QUIZ = [{
              question: "Which iterative method returns an array with values of arr greater than 6?", 
              codeBox: "const arr = [5,6,7,8,9, 10]",
              answers: ["arr.filter(num => num > 6);", "arr.find(num => num > 6);", "arr.reduce(num => num > 6);", "arr.map(num => num > 6);"], 
              correctIndex: 0, 
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
              topic: "Array.prototype.filter()"
              },
              
              {question: "Which method will NOT mutate arr?", 
              codeBox: "let arr = [11,12,13,14,15]",
              answers: ["arr.pop();", "arr.shift();", "arr.push(16);", "arr.concat(16);"], 
              correctIndex: 3,
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
              topic: "Array.prototype.concat()"
            },
            
              {question: "Which method can I use to add an element to the front of the array?", 
              
              codeBox: "let arr = [3,4,5,6,7]",
              answers: ["arr.push(2);", "arr.shift(2);", "arr.pop(2);", "arr.unshift(2);"], 
              correctIndex: 3,
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
              topic: "Array.prototype.unshift()"
            },

              {question: "Find the expression where bool === true.", 
              
              codeBox: "const arr = [1,2,3,4,5]",
              answers: [
                  "let bool = arr.filter(num => num < 6);", 
                  "let bool = arr.forEach(num => num === 5);", 
                  "let bool = arr.some(num => num > 2);", 
                  "let bool = arr.every(num => num > 2);"
                ], 
              correctIndex: 2,
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
              topic: "Array.prototype.some()"
            },

              {question: "How can I console.log() the name of each cow?", 
              
              codeBox: "const milkcows = ['Daisy','Mary','Bertha','Sue']",
              answers: [
                  "for (cow in milkcows){console.log(cow)}", 
                  "for (cow in array){console.log(cow)}", 
                  "for (milkcow of farm){console.log(cow)}", 
                  "for (cow of milkcows){console.log(cow)}", 
                ], 
              correctIndex: 3,
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
              topic: "for ...of"}
            
              

            
            
            
            ];