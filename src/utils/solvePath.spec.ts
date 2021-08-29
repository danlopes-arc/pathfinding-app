import { solvePath } from "./solvePath";

interface SoveTestCaseData {
  startingNode: number,
  targetNode: number,
  expectedPath: number[] | null
}

describe('solve', () => {
  const cases3x3: SoveTestCaseData[] = [
    {
      startingNode: 6,
      targetNode: 8,
      expectedPath: [6, 7, 8]
    },
    {
      startingNode: 6,
      targetNode: 1,
      expectedPath: [6, 3, 1]
    },
    {
      startingNode: 1,
      targetNode: 8,
      expectedPath: [1, 5, 8]
    }
  ]

  it.each(cases3x3)('returns right path with 3x3 board %j', ({ expectedPath, startingNode, targetNode }) => {
    const weights = [
      [Infinity, 1, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity],
      [1, Infinity, 1, 1, Infinity, 1, Infinity, Infinity, Infinity],
      [Infinity, 1, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity],
      [1, 1, Infinity, Infinity, Infinity, Infinity, 1, 1, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1],
      [Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, 1, Infinity],
      [Infinity, Infinity, Infinity, 1, Infinity, 1, 1, Infinity, 1],
      [Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, 1, Infinity],
    ];

    const actualPath = solvePath(weights, startingNode, targetNode)

    expect(actualPath).toEqual(expectedPath)
  })

  const cases2x2: SoveTestCaseData[] = [
    {
      startingNode: 0,
      targetNode: 2,
      expectedPath: [0, 2]
    },
    {
      startingNode: 0,
      targetNode: 3,
      expectedPath: [0, 3]
    }
  ]

  it.each(cases2x2)('returns right path with 2x2 board %j', ({ expectedPath, startingNode, targetNode }) => {
    const weights = [
      [Infinity, Infinity, 1, 1],
      [Infinity, Infinity, Infinity, Infinity],
      [1, Infinity, Infinity, 1],
      [1, Infinity, 1, Infinity]
    ];

    const actualPath = solvePath(weights, startingNode, targetNode)

    expect(actualPath).toEqual(expectedPath)
  })

  const casesNoPath = [
    {
      startingNode: 1,
      targetNode: 3
    },
    {
      startingNode: 2,
      targetNode: 1
    }
  ]

  it.each(casesNoPath)('returns null when path is not found', ({ targetNode, startingNode }) => {
    const weights = [
      [Infinity, Infinity, 1, 1],
      [Infinity, Infinity, Infinity, Infinity],
      [1, Infinity, Infinity, 1],
      [1, Infinity, 1, Infinity]
    ];

    const actualPath = solvePath(weights, startingNode, targetNode)

    expect(actualPath).toBeNull()
  })

  const casesInvalid = [
    {
      weights: [
        [Infinity, Infinity, 1, 1],
        [Infinity, Infinity, Infinity, Infinity],
        [1, Infinity, Infinity, 1]
      ]
    },
    {
      weights: [
        [Infinity, Infinity, 1, 1],
        [Infinity, Infinity, Infinity, Infinity],
        [1, Infinity, Infinity],
        [1, Infinity, 1, Infinity]
      ]
    }
  ]

  it.each(casesInvalid)('throw error if the matrix is not square %j', ({ weights }) => {
    const startingNode = 2
    const targetNode = 1

    expect(() => solvePath(weights, startingNode, targetNode)).toThrow('Not a square matrix')
  })
})