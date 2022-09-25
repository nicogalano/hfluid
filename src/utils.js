const IMAX = 10000
const tol = 0.0005
// const INFINITO = 3*Math.pow(10,1)
const INFINITO = 10
const g = 9.806

var A, P, Yg, L, Theta

export function newton(s,Q,B,i,n) {

  if (i <= 0) {
    return B
  }

  B = Number(B)

  let x1 = 0
  let x2 = 0
  x2 = B * (2 / 3) 
  let k = 0
  var test = true
  let f1, f1p

  Q = Q / 3600
  
  while (test) {
    console.log('k',k);
    k = k + 1
    x1 = x2

    getGeometry(s,x1,B)

    // if (condition) {
    //   return B
    // }

    if (s === 'pipe') {

      f1 = Q * n / i ** 0.5 - A ** (5 / 3) / P ** (2 / 3)
      f1p = (1 / 3) * (A / P) ** (2 / 3) * (2 * (A / P) * (2 * B / L) - 5 * L)
    }

    x2 = Math.min(B, x1 - (f1 / f1p))

    if (x2 < 0) {
      x2 = x1 / 2
    } else if ((Math.abs(x2 - x1) / x1) <= tol) {
      test = false
    } else if (k >= IMAX) {
      test = false
      return
    }
  }

  return x2
}

// Agregar variables T1 y T2 para otras formas
export function getGeometry(s,H,B) {
  // var A, P, Yg, L, Theta
  
  // cambiar 
  const T1 = 0
  const T2 = 0
  
  if (s === 'pipe') {
    Theta = Math.acos(1 - 2 * H / B)
    L = 2 * (H * (B - H)) ** 0.5
    A = Theta * B ** 2 / 4 - L / 2 * (B / 2 - H)
    P = Theta * B
    
    // Open Channel Flow - Henderson, 1966, p84
    if (H > 0) {
      Yg = (1 / A) * (B ** 3 / 24) * (3 * Math.sin(Theta) - Math.sin(Theta) ** 3 - 3 * Theta * Math.cos(Theta))
    } else {
      Yg = 0
    }
  }
  if (s === 'rectangular') {
    A = B * H
    P = 2 * H + B
    L = B
    Yg = H / 2
  }
  if (s === 'trapezoid') {
    L = B + H * (T1 + T2)
    A = H * (L + B) / 2
    P = B + H * ((T1 ** 2 + 1) ** 0.5 + (T2 ** 2 + 1) ** 0.5)
    Yg = (B * H ** 2 / 2 + H ** 3 * (T1 + T2) / 6) / A
  }
  if (s === 'ushaped') {
    if (H < B / 2) {
      Theta = Math.acos(1 - 2 * H / B)
      L = 2 * (H * (B - H)) ** 0.5
      A = Theta * B ** 2 / 4 - L / 2 * (B / 2 - H)
      P = Theta * B
      // Open Channel Flow - Henderson, 1966, p84
      Yg = (1 / A) * (B ** 3 / 24) * (3 * Math.sin(Theta) - Math.sin(Theta) ** 3 - 3 * Theta * Math.cos(Theta))
    } else {
      L = B
      A = (Math.PI / 2) * (B / 2) ** 2 + (H - B / 2) * B
      P = Math.PI * (B / 2) + 2 * (H - B / 2)
      Yg = (1 / A) * (B ** 3 / 12 + (H - B / 2) * (Math.PI * B ** 2 / 8) + (H - B / 2) ** 2 * B / 2)
    }
  }

}

export function getWetArea(s,H,B) {
  getGeometry(s,H,B)
  return A
}

export function getHydraulicRadius(s,H,B) {
  getGeometry(s,H,B)
  return A / P
}

export function getFroude(s,Q,H,B) {
  Q = Q / 3600
  getGeometry(s,H,B)
  let Fr = ( Q / A ) / ( g * A / L) ** 0.5  

  return Fr
}

export const numberFormatter = new Intl.NumberFormat()