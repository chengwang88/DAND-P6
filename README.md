

# Data Visualization

## Summary

The United State flight cancellation and delays information in 2008 is analyzed. There are four figures with two for flight cancellation and two for flight delays.
The flight cancellation is also represented in cancellation reasons. The average hourly flight delay time over days by week is shown in heatmap.


## Design

### Initial EDA

> The 2008 flight data set is explored in R. Cancellation and delays in the data set are explored. 

> For flight cancellation, the number of flight cancellation for each month is explored. 
The overall flights for each month are close but not exactly the same.
Considering the different number of days in each month and relative small number of flight cancellation,
the cancellation rate is calculated and uses as a metric to represent the cancellation for each month. 
The reason of flight cancellation is also explored and cancellation rate for each reason is also calculated for each month.
In figure 1, I want to show bar plot with the cancellation rate 
over each month in 2008 and it will be shown in stacking bars with the cancellation reason.

> Months in winter have high cancellation rate as well as the cancellation rate caused by extreme weather.
September also has high cancellation rate caused by extreme weather.
In figure 2, I want to use the calendar to show the total number of cancellation for each day. 
In September, there are 3 days with over 1000 cancellation and 
it is caused by hurricane Ike after I checked the weather history.

> For flight delay time, the average flight delay time is calculated over the hour of the day. 
It will be shown as bar plot with hour as x-axis and average delay time as y-axis in figure 3.
The delays follow the trend of the trafic hour of the day. So I want to see hour the delays over the days in a week.
In figure 4, I want to show the dealy in day/hour heatmap. It shows the long delay in friday night and monday early morning.

### Version 1

> Four figures are shown in a raw format.
Figure 1 and 3 are bar plot and I use dimple to do the plot. It is easy and has examples to do that.
Figure 2 is calendar and it is based on Calendar View in d3.js gallery. 
Figure 4 is day/hour heatmap and it is also based on the Day/Hour heatmap in d3.js gallery.

### Version 2

> Each figure's position, size and colors are adjusted for better visulization. Colorbar are adjusted in figure 4.

### Version 3

> Figure titles are added and description of each figures are added. At this version, I asked for the feedbacks.

### Version 4

> Based on the first feedback, I added the hourly cancellation information in tooltips in figure 2. 
I also add a colorbar in figure 2. In figure 4, tooltips are also added. 
Update the title in figure 3 and 4 based on the feedback 2.

### Final Version

> Final version is version 4.



## Feedbacks

### Feedback 1

> I liked the EDA approach that you used in this project. I found the distribution of the flights cancelation very curious and makes me wonder if it is related to the number of flights per hour. Maybe there is no relationship, but you could encode this information in the tooltips of the chart. Also, would be nice if you insert tooltips in figure 4, showing the average time delay, as you did in your other charts.

### Feedback 2

What do you notice in the visualization?

> At a first glance the figures show flight delays and flight cancellations. I immediate notice with Figure 1 that weather is a dominant factor for flight delays in winter months (December, January and February). I then see flight cancellation due to security issues remains as a rare event throughout the year. I also notice on Figure 4 that flights tend to delay most on Friday after 5pm. The trend is understandable; as commuters leave town from work for a weekend at home flights traffic can easily get jammed.

What questions do you have about the data?

> I would be curious to know the size of data (how many rows, etc.). I am also interested if data in other years follow the same or similar trend as in 2008.

What relationships do you notice?

> Figure 3, for example, illustrates how average delay time builds up during the day, from barely any delays (2 mins) in the early morning to the peak of more than 17 minutes on average in the early evenings before the delay time quickly plunges after 9pm and stays low during the nights as traffic frees up.

What do you think is the main takeaway from this visualization?

> a. Flight cancellations are often caused by weather. b. Flight delays are similar to traffic delays on road. Flight traffic also has "rush hours".

Is there something you don’t understand in the graphic?

> No. The visualization was quite clear, intuitive and self-explanatory.

Here are some questions,

> a. Are figure 3 and 4 based on 2008 only? If so note it. b. What does "NAS" mean in figure 1? What does "carrier" mean? 

### Feedback 3

What do you notice in the visualization?

> There is some relationship between weather and cancellation rate as well as time of a day and the flight delay time.

What questions do you have about the data?

> For some people who’s interested in the flight cancellation rate, these figures are very clear and helpful, but for someone who want to use these figures as a reference for choosing flight to lower the chance of flight cancellation or delay, this might not be that informative, especially for the flight delay. Because there are very few flights taking off between 2-5am, so I think it will be more helpful if you can plot the ratio of flight with delay among all the flights.

What relationships do you notice?

> Firstly, for the months that typically have bad weather, usually have high the cancellation; secondly, the number of flight cancellation is high during the seasons with extreme weather, but there is no real correlation between the day of the week and the number of flight cancellation; lastly, for the flight delay, the average delay time increased in the day from 6am till 8pm and Tuesday is the day with least delay time.

> What do you think is the main takeaway from this visualization?

Weather is an important reason for cancellation of flight; during time of the day, the flight delay time increases from 5am to 8pm.

> Is there something you don’t understand in the graphic?

I don't think the Figure 3 can give much more information that Figure 4.

## Reference

1. http://dimplejs.org/examples_viewer.html?id=bars_vertical
2. http://dimplejs.org/examples_viewer.html?id=bars_vertical_stacked
3. http://bl.ocks.org/mbostock/4063318
4. http://bl.ocks.org/tjdecke/5558084
5. http://www.rita.dot.gov/bts/help/aviation/html/understanding.html
6. http://blog.mongodb.org/post/58919137318/aggregation-options-on-big-data-sets-part-1-basic




