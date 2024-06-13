import Speedy from "speedy-vision";

export const filterGoodMatches = (
  keypointsA,
  keypointsB,
  acceptableRatio = 0.75
) => {
  const matches = [];

  for (let j = 0; j < keypointsA.length; j++) {
    const keypoint = keypointsA[j];

    // validate
    if (!keypoint.matches || keypoint.matches.length == 0)
      throw new Error(`No matches computed for keypoint #${j}`);
    else if (keypoint.matches.length < 2)
      throw new Error(`I need at least 2 matches per keypoint`);

    // filter out invalid matches
    const i1 = keypoint.matches[0].index;
    const i2 = keypoint.matches[1].index;
    if (i1 < 0 || i2 < 0) continue;

    // filter out "bad" matches
    const d1 = keypoint.matches[0].distance;
    const d2 = keypoint.matches[1].distance;
    if (d1 > d2 * acceptableRatio) continue;

    // accept the match
    const matchedKeypoint = keypointsB[keypoint.matches[0].index];
    matches.push([keypoint, matchedKeypoint]);
  }

  return matches;
};

export const matchPipeline = (mediaA, mediaB, k = 1, max = 800) => {
  const pipeline = Speedy.Pipeline();
  const sourceA = Speedy.Image.Source();
  const sourceB = Speedy.Image.Source();
  const greyscaleA = Speedy.Filter.Greyscale();
  const greyscaleB = Speedy.Filter.Greyscale();
  const pyramidA = Speedy.Image.Pyramid();
  const pyramidB = Speedy.Image.Pyramid();
  const detectorA = Speedy.Keypoint.Detector.Harris();
  const detectorB = Speedy.Keypoint.Detector.Harris();
  const clipperA = Speedy.Keypoint.Clipper();
  const clipperB = Speedy.Keypoint.Clipper();
  const blurA = Speedy.Filter.GaussianBlur();
  const blurB = Speedy.Filter.GaussianBlur();
  const descriptorA = Speedy.Keypoint.Descriptor.ORB();
  const descriptorB = Speedy.Keypoint.Descriptor.ORB();
  const matcherA = Speedy.Keypoint.Matcher.BFKNN();
  const matcherB = Speedy.Keypoint.Matcher.BFKNN();
  const sinkA = Speedy.Keypoint.SinkOfMatchedKeypoints("keypointsA");
  const sinkB = Speedy.Keypoint.SinkOfMatchedKeypoints("keypointsB");

  sourceA.media = mediaA;
  sourceB.media = mediaB;
  clipperA.size = max;
  clipperB.size = max;
  matcherA.k = k;
  matcherB.k = k;

  sourceA.output().connectTo(greyscaleA.input());
  greyscaleA.output().connectTo(blurA.input());
  greyscaleA.output().connectTo(pyramidA.input());
  pyramidA.output().connectTo(detectorA.input());
  detectorA.output().connectTo(clipperA.input());
  clipperA.output().connectTo(descriptorA.input("keypoints"));
  blurA.output().connectTo(descriptorA.input("image"));

  sourceB.output().connectTo(greyscaleB.input());
  greyscaleB.output().connectTo(blurB.input());
  greyscaleB.output().connectTo(pyramidB.input());
  pyramidB.output().connectTo(detectorB.input());
  detectorB.output().connectTo(clipperB.input());
  clipperB.output().connectTo(descriptorB.input("keypoints"));
  blurB.output().connectTo(descriptorB.input("image"));

  descriptorA.output().connectTo(matcherA.input("keypoints"));
  descriptorB.output().connectTo(matcherA.input("database"));
  matcherA.output().connectTo(sinkA.input("matches"));
  descriptorA.output().connectTo(sinkA.input("in"));

  descriptorB.output().connectTo(matcherB.input("keypoints"));
  descriptorA.output().connectTo(matcherB.input("database"));
  matcherB.output().connectTo(sinkB.input("matches"));
  descriptorB.output().connectTo(sinkB.input("in"));

  pipeline.init(
    sourceA,
    greyscaleA,
    pyramidA,
    blurA,
    detectorA,
    clipperA,
    descriptorA,
    matcherA,
    sinkA,
    sourceB,
    greyscaleB,
    pyramidB,
    blurB,
    detectorB,
    clipperB,
    descriptorB,
    matcherB,
    sinkB
  );

  return pipeline;
};
