var ExperimentComponent = React.createClass({
    getInitialState: function() {
        return {
            exp_state: "in_experiment",
        };
    },
    submitRating: function(rating) {
        console.log(rating);
    },
    acceptInstructions: function() {
        console.log("instructions accepted");
        this.setState({exp_state: "in_experiment"});
    },
    declineInstructions: function() {
        console.log("instructions declined");
        this.setState({exp_state: "instructions_declined"});
    },
    resetInstructions: function() {
        console.log("resetting instructions");
        this.setState({exp_state: "in_instructions"});
    },
    finishExperiment: function() {
        console.log("experiment finished");
        this.setState({exp_state: "experiment_finished"});
    },
    submitFailed: function() {
        console.log("experiment submit failed");
        this.setState({exp_state: "submit_failed"});
    },
    render: function() {
        var elem = <span></span>;

        if(this.state.exp_state == "in_instructions") {
            elem = <InstructionComponent acceptInstructions={this.acceptInstructions} 
                                         declineInstructions={this.declineInstructions} />
        }
        else if(this.state.exp_state == "in_experiment") {
            elem = <StimulusComponent finishExperiment={this.finishExperiment}
                                      experimentSubmitFailed={this.submitFailed} />
        }
        else if(this.state.exp_state == "instructions_declined") {
            elem = <DeclinedComponent resetInstructions={this.resetInstructions} />;
        }
        else if(this.state.exp_state == "experiment_finished") {
            elem = <ExperimentFinishedComponent />
        }
        else if(this.state.exp_state == "submit_failed") {
            elem = <div>NOOOOOOOOO</div>;
        }
        else {
            elem = <div>WUT: {this.state.exp_state}</div>;
        }

        return (
            <div id="experiment-wrapper">
                {elem}
            </div>
        );
    }
});

React.render(<ExperimentComponent />, document.getElementById("main-component"));
