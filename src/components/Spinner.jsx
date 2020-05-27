import React, { Component } from 'react'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  margin: auto;
`;

export default class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="container">
                <HashLoader
                    css={override}
                    size={1024}
                    color={"green"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}
