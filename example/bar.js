/**
 *
 * bar.js
 * simple, elegant bar chart library
 * 04/11/2019 - version 1.0
 * <https://github.com/ryanzola/rz-charts-js>
 *
 * Copyright 2017 ryanzola <ryanzola@me.com>
 * Released under the MIT License
 * <https://github.com/ryanzola/rz-charts-js/blob/master/LICENSE.md>
 *
 */

'use strict';

function BarChart(targetId, width, height, data){
    // base
    let chart = this;

    chart.configureChart(targetId, width, height, data)
    // pre operations 
    chart.performOperations();
}

// member functions
BarChart.prototype.configureChart = function(targetId, width, height, data) {
  // base
  let chart = this;

  // global canvas specifications
  chart.setCanvasParameters(targetId, width, height, data);

  // canvas specifications
  chart.setChartParameters();
}

BarChart.prototype.setCanvasParameters = function(targetId, width, height, data) {
  // base
  let chart = this;

  // global specifications
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
}

BarChart.prototype.setChartParameters = function() {
  // base
  let chart = this;

  // canvas specifications
  // axis configurations
  chart.axisRatio = 10; // percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = '#b1b1b1';
  chart.axisWidth = 0.75;

  // label configurations
  chart.fontRatio = 3; // percentage
  chart.fontFamily = 'times';
  chart.fontStyle = 'normal';
  chart.fontWeight = 300;
  chart.fontColor = '#666';
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // guide line configurations
  chart.guidelineColor = '#e5e5e5';
  chart.guidelineWidth = 0.5  
}

BarChart.prototype.performOperations = function() {
  // base
  let chart = this;

  // create the canvas
  chart.createCanvas();

  // get data
  chart.handleData();

  //prepare data
  chart.prepareData();

  // draw chart
  chart.drawChart();
}

BarChart.prototype.createCanvas = function() {
  // base
  let chart = this;

  let canvas = document.createElement('canvas');
  canvas.id = `${chart.id}-${Math.random()}`;
  canvas.width = chart.width;
  canvas.height = chart.height;

  // append canvas
  document.getElementById(chart.id).innerHTML = '';
  document.getElementById(chart.id).appendChild(canvas);

  // add canvas to the chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext('2d');
}

BarChart.prototype.handleData = function() {
  // base
  let chart = this;

  //data sets
  chart.labels = [];
  chart.values = [];

  // handle data
  chart.data.forEach(item => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  })
}

BarChart.prototype.prepareData = function() {
  // base
  let chart = this;

  // global variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  // axis specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margin
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin; // left and right margin

  // label specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFrequency = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFrequency = chart.horizontalAxisWidth / chart.itemsNum;

}

BarChart.prototype.drawChart = function() {
  // base
  let chart = this;

  // draw the vertical axis
  chart.drawVerticalAxis();

  // draw the vertical labels
  chart.drawVerticalLabels();

  // draw the vertical guidelines
  chart.drawVerticalGuidelines();

  // draw the horizontal axis
  chart.drawHorizontalAxis();

  // draw the horizontal labels
  chart.drawHorizontalLabels();

  // draw the horizontal guidelines
  chart.drawHorizontalGuidelines();

  // draw the bars
  chart.drawBars();
}

BarChart.prototype.drawVerticalAxis = function() {
  // base
  let chart = this;

  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.stroke();
}

BarChart.prototype.drawVerticalLabels = function() {
  // base
  let chart = this;

  // text specifications
  chart.labelFont = `${chart.fontStyle} ${chart.fontWeight} ${chart.verticalFontSize}px ${chart.fontFamily}`;
  chart.context.font = chart.labelFont;
  chart.context.textAlign = 'right';
  chart.context.fillStyle = chart.fontColor;

  // scale values
  let scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFrequency;

  // draw labels
  for(let i = 0; i <= chart.itemsNum; i++) {
    let labelText = chart.verticalUpperBound - i * chart.verticalLabelFrequency;
    let verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    let verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
}

BarChart.prototype.drawVerticalGuidelines = function() {
  // base
  let chart = this;

  // specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // draw labels
  for(let i = 0; i <= chart.itemsNum; i++) {
    let verticalGuidelineStartX = chart.horizontalMargin + i * chart.horizontalLabelFrequency;
    let verticalGuidelineStartY = chart.height - chart.verticalMargin;

    // end point coordinates
    let verticalGuidelineEndX = chart.horizontalMargin + i * chart.horizontalLabelFrequency;
    let verticalGuidelineEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    chart.context.stroke();
  }
}

BarChart.prototype.drawHorizontalAxis = function() {
  // base
  let chart = this;

  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.stroke();
}

BarChart.prototype.drawHorizontalLabels = function() {
  // base
  let chart = this;

  // text specifications
  chart.labelFont = `${chart.fontStyle} ${chart.fontWeight} ${chart.verticalFontSize}px ${chart.fontFamily}`;
  chart.context.font = chart.labelFont;
  chart.context.textAlign = 'center';
  chart.context.textBaseline = 'top';
  chart.context.fillStyle = chart.fontColor;

  // draw labels
  for(let i = 0; i < chart.itemsNum; i++) {
    let horizonalLabelX = chart.horizontalMargin + i * chart.horizontalLabelFrequency + chart.horizontalLabelFrequency / 2;
    let horizonalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRatio;

    chart.context.fillText(chart.labels[i], horizonalLabelX, horizonalLabelY);
    
  }
}

BarChart.prototype.drawHorizontalGuidelines = function() {
  // base
  let chart = this;

  // specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // scale values
  let scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFrequency;

  // draw labels
  for(let i = 0; i <= chart.itemsNum; i++) {

    // starting point coordinates
    let horizontalGuidelineStartX = chart.horizontalMargin;
    let horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    // ending point coordinates
    let horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxisWidth;
    let horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    chart.context.stroke();
  }
}

BarChart.prototype.drawBars = function() {
  // base
  let chart = this;

  
  for(let i = 0; i < chart.itemsNum; i++) {
    let color = chart.createRandomColor();
    let fillOpacity = 0.3;
    let fillColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${fillOpacity})`;
    let borderColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;

    chart.context.beginPath();

    let barX = chart.horizontalMargin + i * chart.horizontalLabelFrequency + chart.horizontalLabelFrequency / chart.axisRatio;
    let barY = chart.height - chart.verticalMargin;

    let barWidth = chart.horizontalLabelFrequency - 2 * chart.horizontalLabelFrequency / chart.axisRatio;
    let barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue;

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = borderColor;

    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
}

BarChart.prototype.createRandomColor = function() {
  let red = getRandomInt(0, 257);
  let green = getRandomInt(0, 257);
  let blue = getRandomInt(0, 257);

  return { r: red, g: green, b: blue};
}