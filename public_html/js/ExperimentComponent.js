var ExperimentComponent = React.createClass({
    submitRating: function(rating) {
        console.log(rating);
    },
    finishInstructions: function() {
        console.log("instructions finished");
    },
    render: function() {
        return (
            <div id="experiment-wrapper">
                <InstructionComponent finishInstructions={this.finishInstructions} />
                <StimulusComponent submitRating={this.submitRating} />
            </div>
        );
    }
});

React.render(<ExperimentComponent />, document.getElementById("main-component"));
