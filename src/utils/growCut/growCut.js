const g = (c1, c2, img_norm) => {
  return (
    1 -
    Math.sqrt(c1.reduce((sum, val, i) => sum + Math.pow(val - c2[i], 2), 0)) /
      img_norm
  );
};

export const growCut = (img, lines) => {
  const img_float = img.map((row) =>
    row.map((pixel) => pixel.map((val) => val / 255))
  );
  const height = img.length;
  const width = img[0].length;

  let label = Array.from({ length: height }, () => Array(width).fill(0));
  // -1 - background (blue), 1 - foreground (red)
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j][0] === 255) {
        label[i][j] = -1;
      } else if (lines[i][j][2] === 255) {
        label[i][j] = 1;
      }
    }
  }

  let strength = label.map((row) => row.map((val) => Math.abs(val)));
  const img_norm = Math.sqrt(
    img_float.reduce(
      (sum, row) =>
        sum +
        row.reduce(
          (rowSum, pixel) =>
            rowSum + pixel.reduce((pixelSum, val) => pixelSum + val * val, 0),
          0
        ),
      0
    )
  );

  let changes = true;
  while (changes) {
    changes = false;
    for (let j = 0; j < width; j++) {
      for (let i = 0; i < height; i++) {
        for (let jj = Math.max(0, j - 1); jj < Math.min(j + 2, width); jj++) {
          for (
            let ii = Math.max(0, i - 1);
            ii < Math.min(i + 2, height);
            ii++
          ) {
            if (ii === i && jj === j) {
              continue;
            }
            const gc = g(img_float[i][j], img_float[ii][jj], img_norm);
            const n_strength = gc * strength[ii][jj];
            if (strength[i][j] < n_strength) {
              changes = true;
              label[i][j] = label[ii][jj];
              strength[i][j] = n_strength;
            }
          }
        }
      }
    }
  }

  return img.map((row, i) =>
    row.map((pixel, j) => (label[i][j] === -1 ? [0, 0, 0] : pixel))
  );
};
