const QUIZ = [{
              question: "Which iterative method returns an array with values of arr greater than 6?", 
              arr: "const arr = [5,6,7,8,9, 10]",
              answers: ["arr.filter(num => num > 6);", "arr.find(num => num > 6);", "arr.reduce(num => num > 6);", "arr.map(num => num > 6);"], 
              correct: "arr.filter(num => num > 6);", 
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
              topic: "Array.prototype.filter",
              gotRight: false},
              
              {question: "Which method will NOT mutate arr?", 
              arr: "let arr = [11,12,13,14,15]",
              answers: ["arr.pop();", "arr.shift();", "arr.push(16);", "arr.concat(16);"], 
              correct: "arr.concat(16);",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
              topic: "Array.prototype.concat()",
              gotRight: false},
            
              {question: "Which method can I use to add an element to the front of the array?", 
              
              arr: "let arr = [3,4,5,6,7]",
              answers: ["arr.push(2);", "arr.shift(2);", "arr.pop(2);", "arr.unshift(2);"], 
              correct: "arr.unshift(2);",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
              topic: "Array.prototype.unshift()",
              gotRight: false},

              {question: "Find the expression where bool === true.", 
              
              arr: "const arr = [1,2,3,4,5]",
              answers: [
                  "let bool = arr.filter(num => num < 6);", 
                  "let bool = arr.forEach(num => num === 5);", 
                  "let bool = arr.some(num => num > 2);", 
                  "let bool = arr.every(num => num > 2);"
                ], 
              correct: "let bool = arr.some(num => num > 2);",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
              topic: "Array.prototype.some()",
              gotRight: false},

              {question: "How can I console.log() the name of each cow?", 
              
              arr: "const milkcows = ['Daisy','Mary','Bertha','Sue']",
              answers: [
                  "for (cow in milkcows){console.log(cow)}", 
                  "for (cow in array){console.log(cow)}", 
                  "for (milkcow of farm){console.log(cow)}", 
                  "for (cow of milkcows){console.log(cow)}", 
                ], 
              correct: "for (cow of milkcows){console.log(cow)}",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
              topic: "for ...of", 
              gotRight: false,
              endScore:0}
            
              

            
            
            
            ];