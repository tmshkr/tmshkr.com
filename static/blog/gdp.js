// Acknowledgement:
// @Christian-Paul
// https://codepen.io/freeCodeCamp/pen/GrZVaM
console.log("hello")
const width = 800
const height = 500
var svg = d3
  .select("#gdp")
  .append("div")
  .append("svg")
  .attr("width", width + 60)
  .attr("height", height + 20)

var tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")

var tooltipGDP = tooltip.append("text").text("GDP")

var tooltipDate = tooltip.append("text").text("Date")

function formatDate(date) {
  let quarter
  let month = date.substring(5, 7)

  if (month === "01") {
    quarter = "Q1"
  } else if (month === "04") {
    quarter = "Q2"
  } else if (month === "07") {
    quarter = "Q3"
  } else if (month === "10") {
    quarter = "Q4"
  }

  return `${date.substring(0, 4)} ${quarter}`
}

function formatGDP(GDP) {
  return `$${GDP}B`
}

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(json => {
  var years = json.data.map(d => d[0].substring(0, 4))
  var GDP = json.data.map(d => d[1])
  var gdpMin = d3.min(GDP)
  var gdpMax = d3.max(GDP)

  var xScale = d3
    .scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([0, width])

  var yScale = d3
    .scaleLinear()
    .domain([gdpMin, gdpMax])
    .range([height, 0])

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))

  var dx = width / years.length

  var yAxis = d3.axisLeft(yScale)

  var scaleGDP = d3
    .scaleLinear()
    .domain([gdpMin, gdpMax])
    .range([(gdpMin / gdpMax) * height, height])

  var scaledGDP = GDP.map(item => scaleGDP(item))

  svg
    .append("g")
    .attr("transform", `translate(40, ${height + 3})`)
    .attr("id", "x-axis")
    .call(xAxis)

  svg
    .append("g")
    .attr("transform", "translate(40, 3)") // +3 to prevent cutting off top of tick label
    .attr("id", "y-axis")
    .call(yAxis)

  svg
    .selectAll("rect")
    .data(scaledGDP)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d, i) => json.data[i][0])
    .attr("data-gdp", (d, i) => json.data[i][1])
    .attr("x", (d, i) => 41 + i * dx)
    .attr("y", d => height + 3 - d)
    .attr("width", dx * 0.9)
    .attr("height", d => d)
    .on("mouseover", function() {
      let x = `${d3.event.pageX + 15}px`
      let y = `${d3.event.pageY + 15}px`
      this.style.fill = "#0ff"
      tooltip
        .style("left", x)
        .style("top", y)
        .style("right", "")
        .style("bottom", "")
        .attr("data-date", this.dataset.date)
        .style("visibility", "visible")
        .transition()
        .duration(0)
        .style("opacity", 1)

      let bound = document.getElementById("tooltip").getBoundingClientRect()
      let viewport = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
      if (bound.right > viewport.width) {
        x = `${viewport.width - d3.event.pageX + 15}px`
        tooltip.style("left", "").style("right", x)
      }
      if (bound.bottom > viewport.height) {
        y = `${viewport.height - d3.event.pageY + 15}px`
        tooltip.style("top", "").style("bottom", y)
      }

      tooltipGDP.text(formatGDP(this.dataset.gdp))
      tooltipDate.text(formatDate(this.dataset.date))
    })
    .on("mouseout", function() {
      this.style.fill = null
      tooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
        .transition()
        .duration(100)
        .style("visibility", "hidden")
    })
})
