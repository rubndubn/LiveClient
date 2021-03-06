/**
 * Chart which only gives the value as a number
 *
 * @implements ChartInterface
 * @param element
 * @constructor
 */
function NumberChart(element) {
    // Svg Element in the document
    this.element = element;

    // Mapping the data-types to the chart
    this.chartMap = [];

    // The sampling time of the buffer in ms
    this.samplingTime = 10;

    // Chart svg
    this.svg = null;

    // Container element which displays the value
    this.valueContainer = null;

    /**
     * Returns the chart name in kebab-case
     * @return {string}
     */
    this.getName = function () {
        return 'number-chart';
    };

    /**
     * Initializes the chart
     */
    this.init = function () {
        this.registerEvents();

        // Clear chart element
        this.element.innerHTML = "";

        this.setup();
    };


    /**
     * Register the object events
     */
    this.registerEvents = function () {

    };


    /**
     * Setup the chart with its basic components
     */
    this.setup = function () {
        let me = this;

        // Amount of displayed values
        me.n = 30;

        // Select the svg
        me.svg = d3.select(me.element);

        // Chart props
        let margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 40
        };
        let width = document.getElementsByClassName('media')[0].clientWidth;
        let height = +me.svg.attr("height") - margin.top - margin.bottom;

        // Add basic elements to svg
        me.g = me.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        me.g.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        // Append the container element to display the value
        me.valueContainer = me.g.append("text")
            .attr("class", "chart-number")
            .attr("fill", "black")
            .attr("y", 50)
            .attr("font-size", "50px");

        // Display initial value
        me.valueContainer.text("0");
    };


    /**
     * Adds a value to the chart
     *
     * @param lineId the data-type-id
     * @param value
     */
    this.push = function (lineId, value) {
        let me = this;

        // Update the shown value
        me.valueContainer.text(value);
    };


    /**
     * @param dataType
     */
    this.addDataType = function (dataType) {
        // Append a new data type to chartmap
        this.chartMap.push(dataType);

    };


    /**
     * @param dataType
     */
    this.removeDataType = function (dataType) {
        this.chartMap.splice(this.chartMap.indexOf(dataType), 1);
    };


    /**
     * Returns the sampling time of the chart buffer
     * @return {number}
     */
    this.getSamplingTime = function () {
        return this.samplingTime;
    };


    /**
     * Sets the sampling time of the chart buffer
     * @param samplingTime
     */
    this.setSamplingTime = function (samplingTime) {
        this.samplingTime = samplingTime;
    };


    /**
     * This chart got no time period
     */
    this.hasPeriod = function () {
        return false;
    };


    // Init the chart
    this.init();
}

// Implement the chart interface
NumberChart.prototype = Object.create(ChartInterface);
