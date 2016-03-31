## Uber ATC full­stack developer homework

Project Description: Build Uber pickup and drop off data visualization tool.

## What is under the hood

* AngularJS, Bower Components, HTML/5, CSS/3
* EC2 [LAMP], API Gateway [HTTP Proxy]

## Basic Idea

I wanted to help make (lat,lon) make sense. When viewing a map, you see street names, so you should be able to sort/filter your data based on what you see, street names.

## Technical Approach

* Pivoted the dataset so that every other row became the previous rows drop off point.
* Added indexes to mysql for each column.
* Decided to upgrade my mysql version to 5.6 so I could use ST_CONTAINS() and increase speed.
* Deployed an API Gateway API that passes a payload through to a script on EC2.
* Wrote a PHP script to run and return queries.
* From there angular does all of the work.
## Design Decisions

**Infrastructure: **
* EC2 was an easy choice, I use it frequently at work and on side projects.
* API Gateway was also a quick win, super easy to get up and running
* Database: 
 * MySQL was easy, I had memcached running but it ended up being a time sink trying to get non-unique data cached
 * DynamoDB was also a contender, but once I upgraded MySQL to 5.6 my query time was below 600ms
 * Redshift was another option that I kicked around, but again, because my queries were sub 1s I decided MySQL was good enough for the homework assignment

**UI/UX:**
* AngularJS is familiar; I was able to crank out a fair amount of work in a short time
* Bootstrap is clean and simple, angular-bootstrap makes for easy integration
* Angular google maps, has many tools built out, and allowed for quick prototyping
* I wanted the presentation to be map-centric
 * Putting buttons on top of the map, makes it feel like a unified mapping solution
 * Adding a city search allows you to quickly find a specific area of interest
 * Being able to filter the table by keyword and updating the map markers with only relevant markers keeps the user from being overwhelmed
 

## Improvements

**Infrastructure: **
* Redshift would increase query speed.
* Caching smaller result sets and then filtering the cache would increase speed. (Maybe ElistaCache)
* Converting the PHP script to Lambda Python would help decrease processing time.


**UI/UX:**
* Add date range
* Add save filtered table option, csv, xlsx, pdf
* Add share this map option
* Add day of week filter
* Add time range filter
* Add search by zip code
* Add pagination
* Add multicolumn search
* Add deeper insights:
 * Avg ride distance
 * Avg ride duration
 * Find frequent destinations
 * Find frequent pickup locations

## Contributors

Matt Bunch | linkedin.com/in/mattbunch

## License
The MIT License (MIT)
Copyright © 2016 Matt Bunch

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.