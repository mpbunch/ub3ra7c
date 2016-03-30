## Uber ATC full­stack developer homework

Project Description: Build Uber pickup and dropoff data visualization tool.

## What is under the hood

angular, bower components, html/5, css/3
ec2 [lamp], api gatway [passthrough]

## ..

I wanted to help make (lat,lon) make sense. In order to do this I wanted to convert all (lat,lon) pairs to addresses.
When viewing a map, you see street names, so you should be able to sort/filter your data based on what you see, street names.
I used 10 google api keys to convert (lat,lon) pairs to address. (The job is still running)

## Approach

I pivoted the dataset so that every other row became the previous rows drop off point.
I added indexes to mysql for each column.
I decided to upgrade my mysql version to 5.6 so I could use ST_CONTAINS() and increase speed.
I deployed an API Gateway API that passes a payload through to a script on EC2.
I wrote a PHP script to run and return queries.
From there angular does all of the work.

## Improvements

Infrastructure: 
Redshift would increase query speed.
Caching smaller result sets and then filtering the cache would increase speed. (Maybe elistaCache)
Converting the PHP script to Lambda Python would help decrease processing time.

UI/UX:
Add date range
Add save filtered table option, csv, xlsx, pdf
Add share this map option
Add day of week filter
Add time range filter
Add pagination
Add multicolumn search
Add deeper insights:
-Avg ride distance
-Avg ride durration
-Find frequent destinations
-Find frequent pickup locations

## Contributors

Matt Bunch | linkedin.com/in/mattbunch

## License
The MIT License (MIT)
Copyright © 2016 Matt Bunch

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
