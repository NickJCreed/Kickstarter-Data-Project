# Kickstarted - A Kickstarter data-dashboard.

An Interactive Frontend Development Project.

Kickstarted is a data dashboard that takes a dataset of projects launched on the platform Kickstarter and represents an abundance of otherwise hidden information in a simple to consume manner using charts, graphs, and number displays.

Since Kickstarters inception, there has been over 430,000 projects launched on the crowdfunding platform.
This data dashboard currently represents <b>21,000+ projects</b> launched from <b>19 countries</b> across <b>15 different categories</b> over <b>16 months</b>. It also allows you to see how over <b>2 Million people</b> engaged in this market with a staggering <b>$195 Million Dollars</b> of their own money.

## UX
Kickstarted was built for project managers who wish to launch their projects on the crowdfunding platform. This dashboard can help them achieve an understanding of many relevant key factors such as how much competition has their category faced in the past, what are the previous success and failure rates, how much has been pledged before and by how many backers as well as when during the year might be the best time to launch their project. 

As the user interacts with the dashboard, each selection acts as a filter causing the site to update it's information. An example of this is when the user clicks on "Games" in the "No. of Submissions per Category" row chart. Some examples of what they will see is an updated timeline for when "Games" projects have been launched, which country launched the most "Games" projects as well as how many were launched in total and how much was pledged. This is just some of what is shown. The user could make a second selection of their choosing and the site will update again to reflect the information represented by their selections.

I've also implemented modals to display important information upon interaction such as the "About" and the other chart/graph descriptions. This helps my attempt at striking a balance between a clean design and informative tool however it is worth noting that ultimately this dashboard was intended to be used on desktops.

###### User Stories
The following user stories are catered for with this data dashboard.
* As a project manager, I want to see when during the year are projects within my category launched,so that I can discover points of saturation in the platform and act accordingly.
* As a project manager, I want to see the funding results of my category as a whole but also throughout the year during different months. This is to identify when is the most promising time to launch.
* As a project manager I want to understand how many projects have been launched in each category but also specifically in my category, as to understand how much competition I may face based on past performances.
* As a project manager I want to see which categories are most popular with each country. This could identify possible foreign markets to target for advertising based on their positive response with projects in my category.
* As a project manager, I would like to see how many people actively pledge towards each of the categories and how much they pledge. This offers me a better understanding of real activity on the platform as opposed to something like "project views".


All the above can be fulfilled by interacting with the dashboard and making relevant selections.

## UI
In terms of User Interface, I've kept to the original design planned in the wireframe which can been seen below aside from moving the row chart to the left. All aspects of the site are touch-friendly (more in the testing section).

 dashboard. ![here](https://raw.githubusercontent.com/ldettorre/Kickstarter-Data-Project/master/images/wireframe.png)
 

## Features
 
### Existing Features
- Simple "Reset Charts" button - Users can interact with the charts as many times as they wish and the Reset Charts button will automatically reset the dashboard back to its default.
- Summary Section - The summary section below the dashboard title will always inform the user of how many projects there are, how many backers were involved and how much was pledged in relation to their chosen filters at any given moment. 
- Crossfiltering Information - As the user interacts with the dashboard, it will automatically cross filter all the information on display in relation to it's current selection. This also stacks with multiple selections.
- Simple design - The dashboard displays its information in a simplisic and efficient manner.

### Features Left to Implement
- A larger dataset  - The original dataset was comprised of over 400,000 projects launched, however it was too large for this current version. Upgrading to Flask and using Python can help me make the most of the original dataset.
- More Charts and Graphs - There is alot more information left to be seen when the full dataset is utilized.
- API integration - I don't believe Kickstarter have a public API however there are sources online offering tutorials on how to query the site using AJAX calls and scraping tutorials. Being able to learn this and create my own API of sorts would give the site a "living" aspect to it constantly showing very recent information.

## Technologies Used
- HTML5
- CSS3
- Javascript and Jquery
- Bootstrap 3.3.7
- [D3.js 3.5.1](https://d3js.org/)
    - D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. Source: https://d3js.org/
- [Dc.css 2.1.8](https://dc-js.github.io/dc.js/)
    - Dc.js is a javascript charting library with native crossfilter support and it leverages d3 to render charts in CSS-friendly SVG format. Source: https://dc-js.github.io/dc.js/
- [Crossfilter.js 1.3.1](http://square.github.io/crossfilter/) 
    - In summary, Crossfilter allows us to group and filter the data with ease based on the users interaction and selections. For more, click on Crossfilter.js above.
- [Balsamiq](https://balsamiq.com/) 
    - Balsamiq is the tool I used to generate a wireframe which the site design was based on.
- [Kaggle](https://www.kaggle.com/)
    - I've used Kaggle to source the dataset that was used in this project.


## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
