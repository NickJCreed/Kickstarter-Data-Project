queue()
    .defer(d3.csv, "ksMainBatch.csv")
    .await(makeCharts);

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);
    let parseDate = d3.time.format("%Y/%m/%d").parse;




    transactionsData.forEach(function(d) {
        d.launched = parseDate(d.launched);
    })

    let launchedDim = ndx.dimension(dc.pluck("launched"));
    let total = launchedDim.group().reduceSum(dc.pluck("backers"));
    let minDate = launchedDim.bottom(1)[0].launched;
    let maxDate = launchedDim.top(1)[0].launched;


    let lineSpend = dc.lineChart("#submissionsTimeLineChart");
    lineSpend
        .width(800)
        .height(300)
        .margins({ top: 10, bottom: 60, right: 20, left: 70 })
        .dimension(launchedDim)
        .group(total)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("September 2016 - January 2018")




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



    let popularCategoryDim = ndx.dimension(dc.pluck("subCategory"));
    let totalAmount = popularCategoryDim.group()
    dc.rowChart("#categoryRowChart")
        .height(340)
        .width(520)
        .margins({ top: 10, bottom: 60, right: 20, left: 40 })
        .dimension(popularCategoryDim)
        .group(totalAmount)
        .elasticX(true)


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



    let all = ndx.groupAll();
    dc.numberDisplay("#number-box")

        .formatNumber(d3.format("d"))
        .valueAccessor(function(d) {
            return d;
        })
        .group(all);


    dc.renderAll();
}


