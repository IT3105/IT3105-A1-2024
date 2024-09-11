const A = 1;

const B = 2;

function sumAandB(a, b) {
  let sum = a + b;
  return sum;
}

const sumAB = sumAandB(A, B);

console.log(this.sumAandB(A, B));
