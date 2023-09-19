import { useRecoilValue } from "recoil"
import { graphRoads } from "../recoil/atom/graphAtom"

export function useShortestPath(start, end) {
    let startXY = start
    let endXY = end

    // console.log("Start: "+startXY)
    // console.log("End: "+endXY)

    const graph = useRecoilValue(graphRoads)
    // use a* algorithm to find shortest path


    return ["left", "right", "left", "right"]

}