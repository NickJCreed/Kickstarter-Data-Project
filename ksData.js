queue()
    .defer(d3.csv, "testBatchEdited.csv")
    .await(makeCharts);

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);





    let parseDate = d3.time.format("%Y/%m/%d").parse;




    transactionsData.forEach(function(d) {
        d.date = parseDate(d.date);
    })

    let dateDim = ndx.dimension(dc.pluck("date"));
    let totalSpendByDate = dateDim.group().reduceSum(dc.pluck("backers"));

    let minDate = dateDim.bottom(1)[0].date;
    let maxDate = dateDim.top(1)[0].date;

    let lineSpend = dc.lineChart("#chart");
    lineSpend
        .width(1000)
        .height(300)
        .dimension(dateDim)

        .group(totalSpendByDate)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Month")














    let resultDim = ndx.dimension(dc.pluck("result"));
    let totalResults = resultDim.group()
    dc.pieChart("#resultPieChart")
        .height(250)
        .radius(250)
        .innerRadius(20)
        .externalLabels(10)
        .externalRadiusPadding(5)
        .dimension(resultDim)
        .group(totalResults)


    let popularCategoryDim = ndx.dimension(dc.pluck("subCategory"));
    let totalAmount = popularCategoryDim.group()
    dc.rowChart("#popularCategoryRowChart")
        .height(250)
        .width(400)
        .dimension(popularCategoryDim)
        .group(totalAmount)


    let countryDim = ndx.dimension(dc.pluck("country"));
    let totalSubPerCountry = countryDim.group()
    dc.barChart("#submissionsBarChart")
        .height(250)
        .width(600)
        .dimension(countryDim)
        .group(totalSubPerCountry)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Submissions per country.")


    let subCatDim = ndx.dimension(dc.pluck("subCategory"));
    let amountPledged = subCatDim.group().reduceSum(dc.pluck("pledged"));
    dc.barChart("#categoryPledgesChart")
        .height(300)
        .width(450)
        .dimension(subCatDim)
        .group(amountPledged)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Pledges per Category")







    // let parseDate = d3.time.format("%Y/%m/%d").parse;

    // transactionsData.forEach(function(d) {
    //     d.launched = parseDate(d.launched);
    // })

    // let launchedDim = ndx.dimension(dc.pluck("launched"));
    // let totalLaunched = launchedDim.group().reduceSum(dc.pluck("pledged"));
    // let minDate = launchedDim.bottom(1)[0].date;
    // let maxDate = launchedDim.top(1)[0].date;
    // dc.lineChart("#chart")
    //     .height(300)
    //     .width(450)
    //     .dimension(launchedDim)
    //     .group(totalLaunched)
    //     .x(d3.time.scale().domain([minDate, maxDate]))
    //     .xUnits(dc.units.ordinal)
    //     .xAxisLabel("")





    dc.renderAll();
}
