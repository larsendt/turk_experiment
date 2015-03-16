var ExperimentComponent = React.createClass({
    getInitialState: function() {
        return {
            instructions: "TBD",
        };
    },
    submitRating: function(rating) {
        console.log(rating);
    },
    acceptInstructions: function() {
        console.log("instructions accepted");
        this.setState({instructions: "accepted"});
    },
    declineInstructions: function() {
        console.log("instructions declined");
        this.setState({instructions: "declined"});
    },
    resetInstructions: function() {
        console.log("resetting instructions");
        this.setState({instructions: "TBD"});
    },
    render: function() {
        var instr_elem = <span></span>;
        var stim_elem = <span></span>;
        var decline_elem = <span></span>;

        if(this.state.instructions == "TBD") {
            instr_elem = <InstructionComponent acceptInstructions={this.acceptInstructions} 
                                               declineInstructions={this.declineInstructions} />
        }
        else if(this.state.instructions == "accepted") {
            stim_elem = <StimulusComponent submitRating={this.submitRating} />
        }
        else if(this.state.instructions == "declined") {
            decline_elem = <DeclinedComponent resetInstructions={this.resetInstructions} />;
        }

        return (
            <div id="experiment-wrapper">
                {instr_elem}
                {stim_elem}
                {decline_elem}
            </div>
        );
    }
});

React.render(<ExperimentComponent />, document.getElementById("main-component"));
