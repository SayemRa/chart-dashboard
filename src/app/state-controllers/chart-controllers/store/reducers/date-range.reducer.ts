import { Action, createReducer, on } from '@ngrx/store';
import { setDateRange } from '../actions/date-range.action';

export interface DateRangeState {
  startDate: string | null;
  endDate: string | null;
}

export const initialDateRangeState: DateRangeState = {
  startDate: null,
  endDate: null
};

const _dateRangeReducer = createReducer(
  initialDateRangeState,
  on(setDateRange, (state, { startDate, endDate }) => ({
    ...state,
    startDate,
    endDate
  }))
);

export function dateRangeReducer(state: DateRangeState | undefined, action: Action) {
  return _dateRangeReducer(state, action);
}
