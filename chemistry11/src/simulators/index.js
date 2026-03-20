import LawsCombination from './ch01_basics/LawsCombination'
import MolarMass from './ch01_basics/MolarMass'
import MoleConcept from './ch01_basics/MoleConcept'
import Stoichiometry from './ch01_basics/Stoichiometry'
import EmpiricalFormula from './ch01_basics/EmpiricalFormula'
import AnalyticalBranches from './ch02_analytical_intro/AnalyticalBranches'
import ErrorAnalysis from './ch02_analytical_intro/ErrorAnalysis'
import SigFigs from './ch02_analytical_intro/SigFigs'
import ConcentrationUnits from './ch02_analytical_intro/ConcentrationUnits'

export const SIMULATORS = {
    ch01_t0: LawsCombination,
    ch01_t1: MolarMass,
    ch01_t2: MoleConcept,
    ch01_t3: Stoichiometry,
    ch01_t4: EmpiricalFormula,
    ch02_t0: AnalyticalBranches,
    ch02_t1: ErrorAnalysis,
    ch02_t2: SigFigs,
    ch02_t3: ConcentrationUnits,
}