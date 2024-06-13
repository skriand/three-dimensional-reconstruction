import jsfeatNext from "@webarkit/jsfeat-next";

const jsfeat = jsfeatNext.jsfeatNext;
const data_type = jsfeat.U8_t | jsfeat.C1_t;

export const getAverage = (numbers) =>
  numbers.reduce((acc, number) => acc + number, 0) / numbers.length;

export const normalizePoints = (points) => {
  const x = points.filter((_point, index) => index % 2 === 0);
  const y = points.filter((_point, index) => index % 2 !== 0);

  const meanX = getAverage(x);
  const meanY = getAverage(y);

  let meanDist = 0;
  for (let i = 0; i < points.length(); i++) {
    const shiftedX = x[i] - meanX;
    const shiftedY = y[i] - meanY;

    meanDist += (shiftedX ** 2 + shiftedY ** 2) / points.length();
  }

  const scale = Math.sqrt(2) / Math.sqrt(meanDist);

  let normPoints = [];
  for (let i = 0; i < points.length(); i++) {
    const normX = scale * (x[i] - meanX);
    const normY = scale * (y[i] - meanY);

    normPoints = normPoints.concat([normX, normY]);
  }

  const T = new jsfeat.matrix_t(3, 3, data_type);
  T.data = [scale, 0, -scale * meanX, 0, scale, -scale * meanY, 0, 0, 1];

  return [normPoints, T];
};

export const findCameraMat = (focal_mm = 1, ccdw_mm, width, height) => {
  const K = new jsfeat.matrix_t(3, 3, data_type);
  const focal_pix = (focal_mm * Math.max(width, height)) / ccdw_mm;
  K.data = [focal_pix, 0, width / 2, 0, focal_pix, height / 2, 0, 0, 1];
  return K;
};

export const findFundamentalMat = (points1, points2) => {
  const columns = 9;
  const rows = 8;
  const A = new jsfeat.matrix_t(columns, rows, data_type);
  const [normPoints1, T1] = normalizePoints(points1);
  const [normPoints2, T2] = normalizePoints(points2);

  let dataA = [];
  for (let i = 0; i < rows * 2; i += 2) {
    dataA = dataA.concat([
      normPoints2[i] * normPoints1[i],
      normPoints2[i] * normPoints1[i + 1],
      normPoints2[i],
      normPoints2[i + 1] * normPoints1[i],
      normPoints2[i + 1] * normPoints1[i + 1],
      normPoints2[i + 1],
      normPoints1[i],
      normPoints1[i + 1],
      1,
    ]);
  }
  A.data = dataA;

  let W = new jsfeat.matrix_t(columns, rows, data_type);
  let U = new jsfeat.matrix_t(columns, rows, data_type);
  let V = new jsfeat.matrix_t(columns, rows, data_type);
  jsfeat.linalg.prototype.svd_decompose(A, W, U, V, jsfeat.SVD_V_T);

  let dataF = [];
  for (let i = rows; i < rows * columns; i += columns) {
    dataF = dataF.concat(V.data[i]);
  }
  const F = new jsfeat.matrix_t(3, 3, data_type);
  F.data = dataF;

  W = new jsfeat.matrix_t(3, 1, data_type);
  U = new jsfeat.matrix_t(3, 3, data_type);
  V = new jsfeat.matrix_t(3, 3, data_type);
  jsfeat.linalg.prototype.svd_decompose(F, W, U, V, jsfeat.SVD_V_T);

  let dataW = [];
  for (let i = 2; i < 3 * 3; i += 3) {
    dataW = dataW.concat(W.data[i]);
  }
  W.data = dataW;

  dataW = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === j) dataW = dataW.concat(W.data[i + j]);
    }
  }
  const diagW = new jsfeat.matrix_t(3, 1, data_type);
  diagW.data = dataW;

  jsfeat.matmath.prototype.multiply(F, diagW, V);
  jsfeat.matmath.prototype.multiply_3x3(F, U, F);

  jsfeat.matmath.prototype.multiply_3x3(F, F, T1);
  jsfeat.matmath.prototype.transpose(T2, T2);
  jsfeat.matmath.prototype.multiply_3x3(F, T2, F);

  return F;
};

export const fundamentalMat = () => {
  function fundamentalMat() {
    // empty constructor
  }
  fundamentalMat.prototype.run = findFundamentalMat;
  fundamentalMat.prototype.error = function (from, to, model, err, count) {};
  fundamentalMat.prototype.check_subset = function (from, to, count) {};
  return fundamentalMat;
};

export const findEssentialMat = (points1, points2, K1, K2) => {
  const F = findFundamentalMat(points1, points2);

  const E = F;

  return E;
};

export const decompositionEssentialMat = (E) => {
  const columns = 3;
  const rows = 3;
  const R1 = new jsfeat.matrix_t(columns, rows, data_type);
  const R2 = new jsfeat.matrix_t(columns, rows, data_type);
  const t = new jsfeat.matrix_t(columns, 1, data_type);

  return [R1, R2, t];
};

const triangulatePoint = (projMat1, projMat2, point1, point2) => {
  const columns = 4;
  const rows = 4;
  const A = new jsfeat.matrix_t(columns, rows, data_type);

  A.data = [
    point1[1] * projMat1[2] - projMat1[1],
    point1[1] * projMat1[5] - projMat1[4],
    point1[1] * projMat1[8] - projMat1[7],
    point1[1] * projMat1[11] - projMat1[10],

    point1[0] * projMat1[2] - projMat1[0],
    point1[0] * projMat1[5] - projMat1[3],
    point1[0] * projMat1[8] - projMat1[6],
    point1[0] * projMat1[11] - projMat1[9],

    point2[1] * projMat2[2] - projMat2[1],
    point2[1] * projMat2[5] - projMat2[4],
    point2[1] * projMat2[8] - projMat2[7],
    point2[1] * projMat2[11] - projMat2[10],

    point2[0] * projMat2[2] - projMat2[0],
    point2[0] * projMat2[5] - projMat2[3],
    point2[0] * projMat2[8] - projMat2[6],
    point2[0] * projMat2[11] - projMat2[9],
  ];

  const W = new jsfeat.matrix_t(columns, 1, data_type);
  const U = new jsfeat.matrix_t(columns, rows, data_type);
  const V = new jsfeat.matrix_t(columns, rows, data_type);
  jsfeat.linalg.prototype.svd_decompose(A, W, U, V, jsfeat.SVD_V_T);

  const triangulatedPoint = [
    V.data[12] / V.data[15],
    V.data[13] / V.data[15],
    V.data[14] / V.data[15],
  ];

  return triangulatedPoint;
};

export const triangulatePoints = (P1, P2, points1, points2) => {
  const columns = 4;
  const rows = 4 * (points1.length / 2);
  const A = new jsfeat.matrix_t(columns, rows, data_type);

  for (let i = 0; i < rows; i++) {}

  const x = new jsfeat.matrix_t(3, points1.length / 2, data_type);

  return x;
};

export const recoverPose = (E, points1, points2, K) => {
  const columns = 3;
  const rows = 3;
  const R = new jsfeat.matrix_t(columns, rows, data_type);
  const t = new jsfeat.matrix_t(columns, 1, data_type);

  return [R, t];
};

export const tdrlib = {
  getAverage,
  normalizePoints,
  findCameraMat,
  findFundamentalMat,
  findEssentialMat,
  decompositionEssentialMat,
  triangulatePoints,
  recoverPose,
};
