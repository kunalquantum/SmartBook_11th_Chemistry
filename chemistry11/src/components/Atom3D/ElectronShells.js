export const generateElectrons = (shells, time) => {
    let particles = [];
    let segments = [];
    let labels = [];
    
    shells.forEach((count, sIdx) => {
        const R = 35 + sIdx * 25; // Shell radius
        const speed = 1.5 + (4 - sIdx) * 0.5; // Inner shells spin faster
        
        // Fixed 3D tilt for the shell
        const rx = 65 + (sIdx * 15) * (sIdx % 2 === 0 ? 1 : -1);
        const rz = sIdx * 45;
        
        // Generate electrons
        for (let i = 0; i < count; i++) {
            let angle = (i / count) * Math.PI * 2 + time * speed;
            let ex = Math.cos(angle) * R;
            let ez = Math.sin(angle) * R;
            let ey = 0;
            
            // 1. rot X
            const radX = rx * Math.PI / 180;
            let y1 = ey * Math.cos(radX) - ez * Math.sin(radX);
            let z1 = ey * Math.sin(radX) + ez * Math.cos(radX);
            
            // 2. rot Z
            const radZ = rz * Math.PI / 180;
            let x2 = ex * Math.cos(radZ) - y1 * Math.sin(radZ);
            let y2 = ex * Math.sin(radZ) + y1 * Math.cos(radZ);
            
            particles.push({
                sIdx, // Attach shell index for focus isolating
                id: `e-${sIdx}-${i}`, 
                type: 'e', 
                color: '#1D9E75', // Teal
                r: 2.5,
                x: x2, y: y2, z: z1
            });
        }

        // Generate shell label anchor (at 45 degrees)
        let lAngle = Math.PI / 4;
        let lx = Math.cos(lAngle) * R;
        let lz = Math.sin(lAngle) * R;
        let y1l = -lz * Math.sin(rx * Math.PI / 180);
        let z1l = lz * Math.cos(rx * Math.PI / 180);
        let x2l = lx * Math.cos(rz * Math.PI / 180) - y1l * Math.sin(rz * Math.PI / 180);
        let y2l = lx * Math.sin(rz * Math.PI / 180) + y1l * Math.cos(rz * Math.PI / 180);
        labels.push({ sIdx, text: ['K', 'L', 'M', 'N'][sIdx] + ' Shell', x: x2l, y: y2l, z: z1l });

        // Generate ring path segments for the painter's algorithm
        let prevPt = null;
        for (let i = 0; i <= 40; i++) {
            let angle = (i / 40) * Math.PI * 2;
            let ex = Math.cos(angle) * R;
            let ez = Math.sin(angle) * R;
            let ey = 0;
            
            const radX = rx * Math.PI / 180;
            let y1 = ey * Math.cos(radX) - ez * Math.sin(radX);
            let z1 = ey * Math.sin(radX) + ez * Math.cos(radX);
            
            const radZ = rz * Math.PI / 180;
            let x2 = ex * Math.cos(radZ) - y1 * Math.sin(radZ);
            let y2 = ex * Math.sin(radZ) + y1 * Math.cos(radZ);
            
            let pt = { x: x2, y: y2, z: z1 };
            if (prevPt) {
                segments.push({ sIdx, type: 'ring', a: prevPt, b: pt });
            }
            prevPt = pt;
        }
    });
    
    return { particles, segments, labels };
};
