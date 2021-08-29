// TODO: rename distance/weight to relative/total cost
const getClosestNode = (nodes: number[], distances: number[]) => {
  return nodes.reduce((previous, current) => {

    if (distances[current] < distances[previous]) {
      return current
    }
    return previous
  }, nodes[0])
}

const getNeigbours = (node: number, nodes: number[], connections: number[][]) => {
  return nodes.filter(n => connections[node][n] !== Infinity)
}

export const solvePath = (connections: number[][], startingNode: number, targetNode: number) => {
  const nodeCount = connections.length

  for (const row of connections) {
    if (row.length !== nodeCount) {
      throw new Error('Not a square matrix')
    }
  }

  const parents = [...Array(nodeCount)].map<number | null>(() => null)
  const distances = [...Array(nodeCount)].map((_, i) => i === startingNode ? 0 : Infinity)
  const unexploredNodes = [...Array(nodeCount)].map((_, i) => i)

  while (unexploredNodes.length) {
    const currentNode = getClosestNode(unexploredNodes, distances)

    if (currentNode === targetNode) {
      break
    }

    unexploredNodes.splice(unexploredNodes.indexOf(currentNode), 1)

    const unexploredNeighbors = getNeigbours(currentNode, unexploredNodes, connections)

    unexploredNeighbors.forEach(neighbor => {
      const totalDistance = distances[currentNode] + connections[currentNode][neighbor]
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance
        parents[neighbor] = currentNode
      }
    })
  }

  if (!unexploredNodes.length || parents[targetNode] === null) {
    return null
  }

  const path: number[] = [targetNode]
  while ([...path].pop() !== startingNode) {
    const lastPathNode = path[path.length - 1]
    path.push(parents[lastPathNode]!)
  }
  return path.reverse()
}