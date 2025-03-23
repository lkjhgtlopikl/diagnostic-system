//import { symptoms,diseases,c } from "../data";
import CheckList from "./CheckList";
import { getDiseases,getC } from "../fun";
export default function Tabs(params) {
let diseases = getDiseases()
let c = getC()
  return (
    <div className="row">
      <div className="col-4">
        <div className="list-group" id="list-tab" role="tablist">
          {Object.keys(c).map((s) => (
            <a
              className="list-group-item list-group-item-action"
              id={s}
              data-bs-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="list-home"
            >
              {diseases[s]}
            </a>
          ))}
        </div>
      </div>
      <div className="col-8">
        <div className="tab-content" id="nav-tabContent">
          {Object.entries(c).map(([i,j]) => (
            <div
              className="tab-pane"
              id={"list-" + [i]}
              role="tabpanel"
              aria-labelledby="list-home-list"
            >
              <CheckList col={j}></CheckList>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
