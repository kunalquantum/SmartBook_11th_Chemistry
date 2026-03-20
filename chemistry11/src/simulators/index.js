import LawsCombination from './ch01_basics/LawsCombination'
import MolarMass from './ch01_basics/MolarMass'
import MoleConcept from './ch01_basics/MoleConcept'
import Stoichiometry from './ch01_basics/Stoichiometry'
import EmpiricalFormula from './ch01_basics/EmpiricalFormula'
import Filtration from './ch03_techniques/Filtration'
import Distillation from './ch03_techniques/Distillation'
import Chromatography from './ch03_techniques/Chromatography'
import SolventExtract from './ch03_techniques/SolventExtract'

export const SIMULATORS = {
    ch01_t0: LawsCombination,
    ch01_t1: MolarMass,
    ch01_t2: MoleConcept,
    ch01_t3: Stoichiometry,
    ch01_t4: EmpiricalFormula,
    ch03_t0: Filtration,
    ch03_t1: Distillation,
    ch03_t2: Chromatography,
    ch03_t3: SolventExtract,
}