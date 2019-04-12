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

class BarChart {
  constructor(targetId, width, height, data) {
    this.id = targetId;
    this.width = width;
    this.height = height;
    this.data = data;

    // canvas specifications
    // axis configurations
    this.axisRatio = 10; // percentage
    this.verticalMargin = (this.height * this.axisRatio) / 100;
    this.horizontalMargin = (this.width * this.axisRatio) / 100;
    this.axisColor = "#b1b1b1";
    this.axisWidth = 0.75;

    // label configurations
    this.fontRatio = 3; // percentage
    this.fontFamily = "times";
    this.fontStyle = "normal";
    this.fontWeight = 300;
    this.fontColor = "#666";
    this.verticalFontSize = (this.height * this.fontRatio) / 100;
    this.horizontalFontSize = (this.width * this.fontRatio) / 100;

    // guide line configurations
    this.guidelineColor = "#e5e5e5";
    this.guidelineWidth = 0.5;

    this.performOperations();
  }

  drawBars() {
    const fillOpacity = 0.3;
    let color;
    let fillColor;
    let borderColor;
    let barX;
    let barY;

    let barWidth;
    let barHeight;
    
    for(let i = 0; i < this.itemsNum; i++) {
      color = this.createRandomColor();
      fillColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${fillOpacity})`;
      borderColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;

      this.context.beginPath();
  
      barX = this.horizontalMargin + i * this.horizontalLabelFrequency + this.horizontalLabelFrequency / this.axisRatio;
      barY = this.height - this.verticalMargin;
  
      barWidth = this.horizontalLabelFrequency - 2 * this.horizontalLabelFrequency / this.axisRatio;
      barHeight = -1 * this.verticalAxisWidth * this.values[i] / this.maxValue;
  
      this.context.fillStyle = fillColor;
      this.context.strokeStyle = borderColor;
      this.context.rect(barX, barY, barWidth, barHeight);
      this.context.stroke();
      this.context.fill();
    }
  }

  drawLine(startX, startY, endX, endY) {
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();
  }

  createRandomColor() {
    const red = getRandomInt(0, 257);
    const green = getRandomInt(0, 257);
    const blue = getRandomInt(0, 257);
  
    return { r: red, g: green, b: blue};
  }

  performOperations() {
    // create the canvas
    this.createCanvas();

    // get data
    this.handleData();
  
    //prepare data
    this.prepareData();
  
    // draw chart
    this.drawChart();
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = this.id;
    canvas.width = this.width;
    canvas.height = this.height;

    // append canvas
    document.getElementById(this.id).innerHTML = "";
    document.getElementById(this.id).appendChild(canvas);

    // add canvas to the chart object
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  handleData() {
    //data sets
    this.labels = [];
    this.values = [];
  
    // handle data
    this.data.forEach((item) => {
      this.labels.push(item.label);
      this.values.push(item.value);
    });
  }

  prepareData() {
    // global variables
    this.itemsNum = this.data.length;
    this.maxValue = Math.max.apply(null, this.values);
    this.minValue = Math.min.apply(null, this.values);

    // axis specifications
    this.verticalAxisWidth = this.height - 2 * this.verticalMargin; // bottom and top margin
    this.horizontalAxisWidth = this.width - 2 * this.horizontalMargin; // left and right margin

    // label specifications
    this.verticalUpperBound = Math.ceil(this.maxValue / 10) * 10;
    this.verticalLabelFrequency = this.verticalUpperBound / this.itemsNum;
    this.horizontalLabelFrequency = this.horizontalAxisWidth / this.itemsNum;
  }

  drawChart() {
    // draw the vertical axis
    this.drawVerticalAxis();

    // draw the vertical labels
    this.drawVerticalLabels();

    // draw the vertical guidelines
    this.drawVerticalGuidelines();

    // draw the horizontal axis
    this.drawHorizontalAxis();

    // draw the horizontal labels
    this.drawHorizontalLabels();

    // draw the horizontal guidelines
    this.drawHorizontalGuidelines();

    // draw the bars
    this.drawBars();
  }

  drawVerticalAxis() {
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.drawLine(this.horizontalMargin, this.verticalMargin, this.horizontalMargin, this.height - this.verticalMargin);
  }

  drawVerticalLabels() {
    let labelText;
    let verticalLabelX;
    let verticalLabelY;

    // text specifications
    this.labelFont = `${this.fontStyle} ${this.fontWeight} ${this.verticalFontSize}px ${this.fontFamily}`;
    this.context.font = this.labelFont;
    this.context.textAlign = "right";
    this.context.fillStyle = this.fontColor;

    // scale values
    const scaledVerticalLabelFreq = (this.verticalAxisWidth / this.verticalUpperBound) * this.verticalLabelFrequency;

    // draw labels
    for(let i = 0; i <= this.itemsNum; i++) {
      labelText = this.verticalUpperBound - i * this.verticalLabelFrequency;
      verticalLabelX = this.horizontalMargin - this.horizontalMargin / this.axisRatio;
      verticalLabelY = this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.fillText(labelText, verticalLabelX, verticalLabelY);
    }
  }

  drawVerticalGuidelines() {
    // start point coordinates
    let verticalGuidelineStartX;
    let verticalGuidelineStartY;

    // end point coordinates
    let verticalGuidelineEndX;
    let verticalGuidelineEndY;

    // specifications
    this.context.strokeStyle = this.guidelineColor;
    this.context.lineWidth = this.guidelineWidth;

    // draw labels
    for(let i = 0; i <= this.itemsNum; i++) {
      // start point coordinates
      verticalGuidelineStartX = this.horizontalMargin + i * this.horizontalLabelFrequency;
      verticalGuidelineStartY = this.height - this.verticalMargin;

      // end point coordinates
      verticalGuidelineEndX = this.horizontalMargin + i * this.horizontalLabelFrequency;
      verticalGuidelineEndY = this.verticalMargin;

      // draw guidelines
      this.drawLine(verticalGuidelineStartX, verticalGuidelineStartY, verticalGuidelineEndX, verticalGuidelineEndY);
    }
  }

  drawHorizontalAxis() {
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.drawLine(this.horizontalMargin, this.height - this.verticalMargin, this.width - this.horizontalMargin, this.height - this.verticalMargin);
  }

  drawHorizontalLabels() {
    let horizonalLabelX;
    let horizonalLabelY;

    // text specifications
    this.labelFont = `${this.fontStyle} ${this.fontWeight} ${this.verticalFontSize}px ${this.fontFamily}`;
    this.context.font = this.labelFont;
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillStyle = this.fontColor;
  
    // draw labels
    for(let i = 0; i < this.itemsNum; i++) {
      horizonalLabelX = this.horizontalMargin + i * this.horizontalLabelFrequency + this.horizontalLabelFrequency / 2;
      horizonalLabelY = this.height - this.verticalMargin + this.verticalMargin / this.axisRatio;
  
      this.context.fillText(this.labels[i], horizonalLabelX, horizonalLabelY);  
    }
  }

  drawHorizontalGuidelines() {
    // starting point coordinates
    let horizontalGuidelineStartX;
    let horizontalGuidelineStartY;

    // ending point coordinates
    let horizontalGuidelineEndX;
    let horizontalGuidelineEndY;

    // specifications
    this.context.strokeStyle = this.guidelineColor;
    this.context.lineWidth = this.guidelineWidth;
  
    // scale values
    const scaledVerticalLabelFreq = (this.verticalAxisWidth / this.verticalUpperBound) * this.verticalLabelFrequency;
  
    // draw labels
    for(let i = 0; i <= this.itemsNum; i++) {
      // starting point coordinates
      horizontalGuidelineStartX = this.horizontalMargin;
      horizontalGuidelineStartY = this.verticalMargin + i * scaledVerticalLabelFreq;
  
      // ending point coordinates
      horizontalGuidelineEndX = this.horizontalMargin + this.horizontalAxisWidth;
      horizontalGuidelineEndY = this.verticalMargin + i * scaledVerticalLabelFreq;

      this.drawLine(horizontalGuidelineStartX, horizontalGuidelineStartY, horizontalGuidelineEndX, horizontalGuidelineEndY);
    }
  }
}