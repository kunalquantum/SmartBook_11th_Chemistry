import LawsCombination from './ch01_basics/LawsCombination'
import MolarMass from './ch01_basics/MolarMass'
import MoleConcept from './ch01_basics/MoleConcept'
import Stoichiometry from './ch01_basics/Stoichiometry'
import EmpiricalFormula from './ch01_basics/EmpiricalFormula'
import Filtration from './ch03_techniques/Filtration'
import Distillation from './ch03_techniques/Distillation'
import Chromatography from './ch03_techniques/Chromatography'
import SolventExtract from './ch03_techniques/SolventExtract'
import AtomicModels from './ch04_atomic/AtomicModels'
import QuantumModel from './ch04_atomic/QuantumModel'
import QuantumNumbers from './ch04_atomic/QuantumNumbers'
import ElectronConfig from './ch04_atomic/ElectronConfig'
import DualNature from './ch04_atomic/DualNature'

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
    ch04_t0: AtomicModels,
    ch04_t1: QuantumModel,
    ch04_t2: QuantumNumbers,
    ch04_t3: ElectronConfig,
    ch04_t4: DualNature,
}