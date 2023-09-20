import cytoscape from "cytoscape";
import { useRecoilValue } from "recoil"
import { graphRoads } from "../recoil/atom/graphAtom"

function MiniMap() {

    const graph = useRecoilValue(graphRoads)


    var cy = cytoscape({
        container: document.getElementsByClassName('mapContainer')[0],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(name)',
                    'width': 30,
                    'height': 30,
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 30,
                    'line-color': '#ccc',
                    // 'target-arrow-color': '#ccc',
                    // 'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ]
    }, []);

    graph[0].forEach(element => {
        cy.add({
            group: 'nodes',
            data: { id:element[0].toString()+"-"+element[1].toString() },
            position: { x:element[0]*200, y:element[1]*-200 }
        });
    });

    graph[1].forEach(element => {
        cy.add({
            group: 'edges',
            data: { source:element[0][0].toString()+"-"+element[0][1].toString(), target:element[1][0].toString()+"-"+element[1][1].toString() },
        });
    });

    cy.layout({ name: 'preset'}).run();
    cy.fit();

    const refit = (e)=>{
        setTimeout(function(){
            cy.fit();
        }, 800);
    }
    
    return (
     <div className="miniMap" onMouseEnter={refit} onMouseLeave={refit}>
            <div className="mapContainer">

            </div>
        </div>
    )
}

export default MiniMap;