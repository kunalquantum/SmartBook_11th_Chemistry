export const ATOM_DATA = [
    { z: 1, sym: 'H', name: 'Hydrogen', mass: 1 },
    { z: 2, sym: 'He', name: 'Helium', mass: 4 },
    { z: 3, sym: 'Li', name: 'Lithium', mass: 7 },
    { z: 4, sym: 'Be', name: 'Beryllium', mass: 9 },
    { z: 5, sym: 'B', name: 'Boron', mass: 11 },
    { z: 6, sym: 'C', name: 'Carbon', mass: 12 },
    { z: 7, sym: 'N', name: 'Nitrogen', mass: 14 },
    { z: 8, sym: 'O', name: 'Oxygen', mass: 16 },
    { z: 9, sym: 'F', name: 'Fluorine', mass: 19 },
    { z: 10, sym: 'Ne', name: 'Neon', mass: 20 },
    { z: 11, sym: 'Na', name: 'Sodium', mass: 23 },
    { z: 12, sym: 'Mg', name: 'Magnesium', mass: 24 },
    { z: 13, sym: 'Al', name: 'Aluminium', mass: 27 },
    { z: 14, sym: 'Si', name: 'Silicon', mass: 28 },
    { z: 15, sym: 'P', name: 'Phosphorus', mass: 31 },
    { z: 16, sym: 'S', name: 'Sulfur', mass: 32 },
    { z: 17, sym: 'Cl', name: 'Chlorine', mass: 35.5 },
    { z: 18, sym: 'Ar', name: 'Argon', mass: 40 },
    { z: 19, sym: 'K', name: 'Potassium', mass: 39 },
    { z: 20, sym: 'Ca', name: 'Calcium', mass: 40 },
]

// Bohr shell capacity lookup (K, L, M, N...)
export const getShells = (z) => {
    const shells = []
    let e = z
    const capacities = [2, 8, 8, 18, 18, 32] // simplified for first 20 elements
    for(let i = 0; i < capacities.length; i++) {
        if (e <= 0) break
        const fill = Math.min(e, capacities[i])
        shells.push(fill)
        e -= fill
    }
    return shells
}
