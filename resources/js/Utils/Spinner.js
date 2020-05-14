import React,{Component} from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    left: 42%;
    position: absolute;
    top: 50%;
`;
 
class Spinner extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className="sweet-loading">
        <BeatLoader
          css={override}
          size={20}
          color={"#145d82"}
          loading={this.props.loading || false}
        />
      </div>
    );
  }
}

export default Spinner;