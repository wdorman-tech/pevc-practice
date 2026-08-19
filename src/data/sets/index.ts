import { buildBank } from './bank'
import { PEVC_ANALYSIS } from './pevcAnalysis'
import { PEVC_GENERAL } from './pevcGeneral'
import { SPECIAL_SITUATIONS } from './specialSituations'
import { TACOPPS } from './tacopps'

export { SET_TRACK } from './bank'

/** The four club-shaped sets, folded into the same deck as the 400 Questions bank. */
export const SET_QUESTIONS = [
  ...buildBank(PEVC_ANALYSIS, 'Wharton PEVC · Investment Analysis'),
  ...buildBank(PEVC_GENERAL, 'PEVC / WITG general knowledge'),
  ...buildBank(TACOPPS, 'Penn WITG · Tactical Opportunities'),
  ...buildBank(SPECIAL_SITUATIONS, 'Penn WITG · Special Situations'),
]
