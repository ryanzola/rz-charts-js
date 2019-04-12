# rz-charts-js
Lightweight bar chart generator using canvas

![GitHub](https://img.shields.io/github/license/ryanzola/rz-charts-js.svg)

## Description
bar.js is a Canvas based simple Javascript bar chart library to provide a configurable lightweight and dependency-free experience.

![](https://github.com/ryanzola/rz-charts-js/blob/master/bar.png)

## Installation
Download the bar.min.js and include it in your project.
```html
<script src="bar.min.js"></script>
```

## Usage
To create the bar chart, you will need a block-level container such as a ```html <div>``` or ```html <p>```
```html
<div id="chart">This will be your bar chart!</div>
```
Then you can create the BarChart in your Javascript file!
```js
let barChart = new BarChart(chartId, chartWidth, chartHeight, data);
```

### Parameters
*  `chartId - containerId (String)`
  *  Defines the id of the container like "chart"
*  `chartWidth - (Integer)`
  *  Defines the width of the chart like 500
*  `chartHeight - (Integer)`
  *  Defines the height of the chart like 500
*  `data - (Objects Array)`
  *  Defines the data objects. The objects should have 2 key-value pairs: label and value.

```js
  var data = [
    {label: 'Jan', value: 100},
    {label: 'Feb', value: 43},
    {label: 'March', value: 58},
    {label: 'April', value: 11},
    {label: 'May', value: 14}
  ];
```

## License
[MIT](LICENSE.md) © [Ryan Zola](https://github.com/ryanzola)
