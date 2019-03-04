queue()
    .defer(d3.csv, "data/ksMainBatch.csv")
    .await(makeCharts);

function makeCharts(error, chartsData) {
    let ndx = crossfilter(chartsData);
    let parseDate = d3.time.format("%Y/%m/%d").parse;




    chartsData.forEach(function(d) {
        d.launched = parseDate(d.launched);
    })

    let launchedDim = ndx.dimension(dc.pluck("launched"));
    let total = launchedDim.group().reduceSum(dc.pluck("value"));
    let minDate = launchedDim.bottom(1)[0].launched;
    let maxDate = launchedDim.top(1)[0].launched;

    // Project Submissions Timeline Chart
    let lineSpend = dc.lineChart("#submissionsTimeLineChart");
    lineSpend
        .width(800)
        .height(300)
        .margins({ top: 10, bottom: 60, right: 20, left: 70 })
        .dimension(launchedDim)
        .group(total)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("September 2016 - January 2018")
        .elasticY(true)



    // Project Funding Results Pie Chart
    let resultDim = ndx.dimension(dc.pluck("result"));
    let totalResults = resultDim.group()
    dc.pieChart("#resultPieChart")
        .height(300)
        .radius(300)
        .innerRadius(10)
        .externalLabels(0)
        .externalRadiusPadding(10)
        .dimension(resultDim)
        .group(totalResults)


    // Submissions Per Category Row Chart
    let popularCategoryDim = ndx.dimension(dc.pluck("subCategory"));
    let totalAmount = popularCategoryDim.group()
    dc.rowChart("#categoryRowChart")
        .height(340)
        .width(520)
        .margins({ top: 10, bottom: 60, right: 20, left: 40 })
        .dimension(popularCategoryDim)
        .group(totalAmount)
        .elasticX(true)
        
       

    // Submissions Per Country Bar Chart
    let countryDim = ndx.dimension(dc.pluck("country"));
    let totalSubPerCountry = countryDim.group()
    dc.barChart("#submissionsBarChart")
        .height(300)
        .width(520)
        .margins({ top: 10, bottom: 70, right: 20, left: 50 })
        .dimension(countryDim)
        .group(totalSubPerCountry)
        .x(d3.scale.ordinal())
        .xAxisLabel("Countries")
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .yAxisLabel("Submission Amount")



    // Amount Pledged In Dollars Per Category
    let subCatDim = ndx.dimension(dc.pluck("subCategory"));
    let amountPledged = subCatDim.group().reduceSum(dc.pluck("pledged"));
    dc.barChart("#pledgesCategoryChart")
        .height(300)
        .width(520)
        .margins({ top: 10, bottom: 70, right: 20, left: 70 })
        .dimension(subCatDim)
        .group(amountPledged)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Submission Categories")
        .elasticY(true)
        .yAxisLabel("Amount in Dollars")


//The code below continuously generates a number which represents : how many projects exist based on the users selections.
    let all = ndx.groupAll();
    dc.numberDisplay("#number-box")
        .formatNumber(d3.format(",")) // As this represents the quantity of projects it is being formatted automatically using a comma.
        .valueAccessor(function(d) {
            return d;
        })
        .group(all);

//The code below continuously generates a number which represents : how many people backed the current number of projects. 
    let sumBackers = ndx.groupAll().reduceSum(dc.pluck("backers"));
    dc.numberDisplay('#backers-box')
        .formatNumber(d3.format(".3s"))  //This format allows for the larger numbers to be easily comprehended
        .valueAccessor( function(d) { 
            return d;
        })
        .group(sumBackers);

//The code below continuously generates a number which represents : how much was pledged to all the projects based on the users selections. 
    let sumPledged = ndx.groupAll().reduceSum(dc.pluck("pledged"));
    dc.numberDisplay('#pledged-box')
        .formatNumber(d3.format(".4s")) //This format allows for the larger numbers to be easily comprehended
        .valueAccessor( function(d) { 
            return d;
        })
        .group(sumPledged);
        
    
        


    dc.renderAll();
}


