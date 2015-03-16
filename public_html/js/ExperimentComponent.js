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
    render: function() {
        var instr_elem = <span></span>;
        var stim_elem = <span></span>

        if(this.state.instructions == "TBD") {
            instr_elem = <InstructionComponent acceptInstructions={this.acceptInstructions} 
                                               declineInstructions={this.declineInstructions} />
        }
        else if(this.state.instructions == "accepted") {
            stim_elem = <StimulusComponent submitRating={this.submitRating} />
        }

        return (
            <div id="experiment-wrapper">
                {instr_elem}
                {stim_elem}
            </div>
        );
    }
});

React.render(<ExperimentComponent />, document.getElementById("main-component"));
