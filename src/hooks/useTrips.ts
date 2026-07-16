import { useMemo } from 'react';
import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { TRIPS_SHEET_URL } from '@/config/sheets';
import { mapTripRow, splitTrips, type Trip, type SplitTrips } from '@/types/sheets';

const NO_TRIPS: Trip[] = [];

/** Loads the Trips sheet and splits it into upcoming trips and past trips grouped by year. */
export function useTrips(): SplitTrips {
  const { lang } = useLang();
  const { data: trips } = useSheetData(TRIPS_SHEET_URL, lang, mapTripRow, NO_TRIPS);
  return useMemo(() => splitTrips(trips), [trips]);
}
