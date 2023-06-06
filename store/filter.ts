import { BeerItem, SelectedValues } from "@/types";

export default function filterBeers(filterParameters: SelectedValues, collectionToFilter: BeerItem[]): BeerItem[] {
    const {selectedTypes, selectedYears, name} = filterParameters;
    // Base case
    if (name === "" && selectedTypes.length === 0 && selectedYears.length === 0)
    {
        // Do nothing
        return collectionToFilter;
    }

    // Filter the collection on each possible parameter
    // The base case (no filters added) is to let the data through

    const results = collectionToFilter
        .filter(beer => name !== "" ? beer.name.toLowerCase().includes(name.toLowerCase()) : true)
        .filter(beer => {
            if (selectedTypes.length === 0) 
                return true;
            // Test if any of the selected types are part of the description or the name
            return selectedTypes.some(beerType => beer.name.toLowerCase().includes(beerType.toLowerCase()) || beer.description.toLowerCase().includes(beerType.toLowerCase())) 
        })
        .filter(beer => {
            if (selectedYears.length === 0)
                return true;
            // Test if the "first_brewed" date includes any of the year filters
            return selectedYears.some(year => beer.first_brewed.toLowerCase().includes(year.toLowerCase()));
        })

    return results;
}