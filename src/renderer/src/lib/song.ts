export function averageBPM(bpm: number[][], durationMS: number): number {
  if (bpm.length === 0) {
    return NaN;
  }

  if (bpm.length === 1) {
    return bpm[0][1];
  }

  const lookup = new Map<number, number[]>();
  let highestEntry = [-Infinity, NaN];

  for (let i = 0; i < bpm.length; i++) {
    const end = i + 1 === bpm.length
      ? durationMS
      : bpm[i + 1][0];

    const entry = lookup.get(bpm[i][1]);
    if (entry === undefined) {
      lookup.set(bpm[i][1], [end - bpm[i][0], bpm[i][1]]);
      continue;
    }

    entry[0] += end - bpm[i][0];

    if (entry[0] > highestEntry[0]) {
      highestEntry = entry;
    }
  }

  return highestEntry[1];
}