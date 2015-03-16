var ExperimentFinishedComponent = React.createClass({
    finishHit: function() {
        window.location = "https://larsendt.com";
    },
    render: function() {
        return (
            <div id="experiment-finished">
                <div className="instruction-text">
                    Thanks for doing this HIT!
                </div>
                <div className="button-wrapper">
                    <div id="finish-experiment-button" 
                         className="generic-button"
                         onClick={this.finishHit}>
                        Finish HIT <i className="fa fa-check" />
                    </div>
                </div>
            </div>
        );

    }
});
