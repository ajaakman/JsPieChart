let data;
let sliceArray = [];
let percentArray = [];
let colorArray = [];

function drawChart() {
  data = document.getElementById("json-data").value;
  percentArray = createPercentArray();
  colorArray = createRandomColorArray();
  populateArray(data);
  drawPie();
}

function populateArray(jsonData) {
  let sliceArrays = JSON.parse(jsonData);
  for (let i = 0; i < sliceArrays.slices.length; i++) {
    let slice = sliceArrays.slices[i];
    sliceArray[i] = slice;
  }
}

function createPercentArray() {
  let perArr = [];
  for (let i = 0; i < sliceArray.length; i++) {
    perArr[i] = sliceArray[i].percent * 0.02;
  }
  return perArr;
}

function createRandomColorArray() {
  let randColorArr = [];
  for (let i = 0; i < sliceArray.length; i++) {
    randColorArr[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  return randColorArr;
}

function drawPie() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  let startAngle = 0;
  let endAngle = 0;

  for (let i = 0; i < percentArray.length; i++) {
    startAngle = endAngle;
    endAngle = endAngle + percentArray[i] * Math.PI;

    drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i]);

    drawSliceText(
      context,
      300,
      200,
      150,
      startAngle,
      endAngle,
      percentArray[i] * 50
    );
  }
}

function drawSlice(
  ctx,
  sliceCenterX,
  sliceCenterY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();

  let medianAngle = (startAngle + endAngle) / 2;
  xOffset = Math.cos(medianAngle) * 30;
  yOffset = Math.sin(medianAngle) * 30;

  ctx.moveTo(sliceCenterX + xOffset, sliceCenterY + yOffset);
  ctx.arc(
    sliceCenterX + xOffset,
    sliceCenterY + yOffset,
    radius,
    startAngle,
    endAngle
  );
  ctx.closePath();
  ctx.fill();
}

function drawSliceText(
  ctx,
  sliceCenterX,
  sliceCenterY,
  radius,
  startAngle,
  endAngle,
  percentText
) {
  let textX = sliceCenterX + Math.cos((startAngle + endAngle) / 2) * radius;
  let textY = sliceCenterY + Math.sin((startAngle + endAngle) / 2) * radius;

  ctx.fillStyle = "black";
  ctx.font = "24px Calibri";
  ctx.fillText(percentText, textX, textY);
}
