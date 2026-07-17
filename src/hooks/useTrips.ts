import { useMemo } from 'react';
import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { TRIPS_SHEET_URL } from '@/config/sheets';
import { mapTripRow, type Trip } from '@/types/sheets';
import { splitByDate, type SplitByDate } from '@/utils/dateBuckets';

const NO_TRIPS: Trip[] = [];

/** Loads the Trips sheet and splits it into upcoming trips and past trips grouped by year. */
export function useTrips(): SplitByDate<Trip> {
  const { lang } = useLang();
  const { data: trips } = useSheetData(TRIPS_SHEET_URL, lang, mapTripRow, NO_TRIPS);
  return useMemo(() => splitByDate(trips), [trips]);
}
