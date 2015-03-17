var ExperimentComponent = React.createClass({
    getInitialState: function() {
        return {
            exp_state: "in_instructions",
            is_blurred: false, // true if the user does not have the page in focus
            blur_times: [], // array of seconds the page was blurred for
            last_blur_start: 0,
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
    unblur: function() {
        this.setState({is_blurred: false});
    },
    handleBlur: function(event) {
        console.log("BLUR EVENT");
        if(this.state.exp_state == "in_experiment") {
            var t = new Date().getTime() / 1000.0;
            this.setState({is_blurred:true, last_blur_start:t});
        }
    },
    handleFocus: function(event) {
        console.log("FOCUS EVENT");
        if(this.state.exp_state == "in_experiment") {
            var t = new Date().getTime() / 1000.0;
            var diff = t - this.state.last_blur_start;
            var blur_times = this.state.blur_times;
            blur_times.push(diff);
            this.setState({blur_times: blur_times});
            setTimeout(this.unblur, 5000);
            console.log("user was blurred for " + diff + " seconds");
        }
    },
    componentDidMount: function() {
        $(window).blur(this.handleBlur);
        $(window).focus(this.handleFocus);
    },
    render: function() {
        var elem = <span></span>;
        var blur_elem = <span></span>

        if(this.state.exp_state == "in_instructions") {
            elem = <InstructionComponent acceptInstructions={this.acceptInstructions} 
                                         declineInstructions={this.declineInstructions} />
        }
        else if(this.state.exp_state == "in_experiment") {
            elem = <StimulusComponent finishExperiment={this.finishExperiment}
                                      experimentSubmitFailed={this.submitFailed} 
                                      blurTimes={this.state.blur_times} />
        }
        else if(this.state.exp_state == "instructions_declined") {
            elem = <DeclinedComponent resetInstructions={this.resetInstructions} />;
        }
        else if(this.state.exp_state == "experiment_finished") {
            elem = <ExperimentFinishedComponent />
        }
        else if(this.state.exp_state == "submit_failed") {
            console.error("Failed to submit ratings :(");
            elem = <ExperimentFinishedComponent />
        }
        else {
            elem = <div>Unexpected app state: {this.state.exp_state}</div>;
        }

        if(this.state.exp_state == "in_experiment" && this.state.is_blurred) {
            blur_elem = (<div id="blur-warning">Please maintain focus on the task!</div>);
        }

        return (
            <div id="experiment-wrapper">
                {blur_elem}
                {elem}
            </div>
        );
    }
});

React.render(<ExperimentComponent />, document.getElementById("main-component"));
