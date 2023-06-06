import { FilterAction, SelectedValues } from "@/types";

export default function filterParamsReducer(
    state: SelectedValues,
    action: FilterAction
  ): SelectedValues {
    const { type, payload } = action;
    //If type is SELECT_YEAR or SELECT_TYPE, check if payload is being added or removed from filter.
    //On change to the entered name (SELECT_NAME), replace old value with payload.
    //If type is CLEAR_FILTER reset filter to base case.
    if (type === "SELECT_YEAR" && state.selectedYears!.includes(payload)) {
      return {
        selectedYears: state.selectedYears!.filter((year) => year !== payload),
        name: state.name,
        selectedTypes: state.selectedTypes,
      };
    } else if (
      type === "SELECT_YEAR" &&
      !state.selectedYears!.includes(payload)
    ) {
      return {
        selectedYears: [...state.selectedYears!, payload],
        name: state.name,
        selectedTypes: state.selectedTypes,
      };
    }
    if (type === "SELECT_TYPE" && state.selectedTypes!.includes(payload)) {
      return {
        selectedYears: state.selectedYears!,
        name: state.name,
        selectedTypes: state.selectedTypes!.filter((type) => type !== payload),
      };
    } else if (
      type === "SELECT_TYPE" &&
      !state.selectedTypes!.includes(payload)
    ) {
      return {
        selectedYears: state.selectedYears!,
        name: state.name,
        selectedTypes: [...state.selectedTypes!, payload],
      };
    } else if (type === "SELECT_NAME") {
      return {
        selectedYears: state.selectedYears,
        name: payload,
        selectedTypes: state.selectedTypes!,
      };
    } else if (type === "CLEAR_FILTER") {
      return {
        selectedYears: [],
        name: "",
        selectedTypes: [],
      };
    }
    return state;
  };
  