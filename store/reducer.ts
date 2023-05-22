import { FilterAction, SelectedValues } from "@/types";

export default function filterParamsReducer(
    state: SelectedValues,
    action: FilterAction
  ): SelectedValues {
    const { type, payload } = action;
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
  