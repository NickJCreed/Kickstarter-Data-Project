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
    let lineSpend = dc.lineChart("#timeLineChart");
    lineSpend
        .width(1000)
        .height(250)
        .dimension(launchedDim)

        .group(total)
        .x(d3.time.scale().domain([minDate, maxDate]))







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
        .height(350)
        .width(550)
        .dimension(popularCategoryDim)
        .group(totalAmount)


    let countryDim = ndx.dimension(dc.pluck("country"));
    let totalSubPerCountry = countryDim.group()
    dc.barChart("#submissionsBarChart")
        .height(350)
        .width(550)
        .dimension(countryDim)
        .group(totalSubPerCountry)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)



    let subCatDim = ndx.dimension(dc.pluck("subCategory"));
    let amountPledged = subCatDim.group().reduceSum(dc.pluck("pledged"));
    dc.barChart("#pledgesCategoryChart")
        .height(350)
        .width(550)
        .dimension(subCatDim)
        .group(amountPledged)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        
    
    let all = ndx.groupAll()
        
        
        dc.numberDisplay("#number-box")
        
        .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);
       
       
       
    //     let pledged = ndx.groupAll().reduce(
    //     function(p, v) {
    //       p.total  += +v["pledged"];
    //       return p;
    //   },
    //   function(p, v) {

    //       p.total -= -v["pledged"];
    //       return p;
    //   },
    //   function() {
    //       return { total: 0 };
    //   })
    //         console.log(pledged[0])
        
            
            
    //         dc.numberDisplay("#pledgedBox")
            
    //         .formatNumber(d3.format("d"))
    //       .valueAccessor(function (d) {
    //           return d.total;
    //       })
    //   .group(pledged); // no quotes because its a variable from directly above.


                dc.renderAll();
            }
