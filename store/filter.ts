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
            const nameIncludes = selectedTypes.map(beerType => beer.name.toLowerCase().includes(beerType.toLowerCase()));
            const typeIncludes = selectedTypes.map(beerType => beer.description.toLowerCase().includes(beerType.toLowerCase()));

            return [...nameIncludes, ...typeIncludes].some(isFilterTrue => isFilterTrue);
        })
        .filter(beer => {
            if (selectedYears.length === 0)
                return true;
            // Test if the "first_brewed" date includes any of the year filters
            const yearIncludes = selectedYears.map(year => beer.first_brewed.toLowerCase().includes(year.toLowerCase()));
            return yearIncludes.some(isFilterTrue => isFilterTrue);
        })

    return results;
}