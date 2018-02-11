# React-PDF

A demonstration project to show how to make a custom PDF viewer application with React and
[Mozilla's PDF.js](https://mozilla.github.io/pdf.js/) project.

Extra features include a customized search representation with snippet display of matches. 

## Getting started

1. Clone the repo
2. `yarn install` to install the dependencies
2. `yarn start` to start in dev mode

## Usage

Use a query parameter `&file=https://path/to/document.pdf` if you want a specific file to load.  
Missing parameter will use the default Mozilla Tracemonkey PDF.

## Known bugs and issues

* Application is not very performant because of unnecessary re-rendering occuring with PDF document and search panel.  Fix implementation would require adding `shouldComponentUpdate` and listening for state 
* PDF search is based on the actual non-rendered text from the document.  Sometimes words in match snippets will be missing spaces
* Cannot jump to a specific match and highlight just that match