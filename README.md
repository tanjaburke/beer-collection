# Technical assignment - Impact Commerce - Tanja Burke Cryer

## Introduction

This is a NextJS project submitted as part of the technical evaluation. 

As part of the assignment, I was asked to create a web app that keeps track of a customer's beer collection.

The project describes a beer collection, and features various methods of interacting with said collection. 

As a point of interpretation, I have assumed that an initial fetch of the beer api features as the user's initial collection (12 beers), such that I immediately can showcase various types of data interactivity with React/Next - filtering, sorting, etc. Usage of the API itself is minimal for this reason, but is featured in the feature for adding beers to the collection. 

Note: due to time constraints there is no functionality to persist state to localStorage, so refreshing or navigating to/from a detail page will reset the collection state. This is obviously not ideal, and would be fixed if more time had been available. 

Optional features that have been touched on: 

- Filtering (name, beer type, year of first brewing)
- Sorting 
- Add new beers by name searching the API
- Labeling API results as part of the collection or not


### Architecture considerations
The project follows the NextJS convention regarding main folders (i.e. a pages folder, public folder etc.)

#### Components
I have decided to split my components into named folders and an UI folder, holding components without any real logic. 

To minimise the need to rerender complete components on state updates, I have decided to split components into smaller chunks matching state needs. 

##### Context
All state logic that is relevant for more than one component is dealt with in a one of three stores, to allow easy access to state across the app. 

To ease readability, filter and reducer functions related to the main store has been relegated to their own file.

#### Hooks
In to this project I needed a custom hook to deal with scrollability on body. 

## How to run

Clone this repository 

From a terminal, run `npm install` 
 

Run `npm run build` 
 

Run `npm run dev` to launch the development server on `localhost:3000`

## Help I did receive 
I have received some help to solve this task - specifically in two places:
    1. To type dispatch functions in context and on event handling.
    2. To Debug sort bug - did not return sorted data on "add Bottle". Added trigger state in store and useEffect listener.




