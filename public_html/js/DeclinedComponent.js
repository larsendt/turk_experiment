var DeclinedComponent = React.createClass({
    goToAmazon: function() {
        $.ajax({
            url: "/api/hit/abandon",
            method: "POST",
            success: function(data) {
                window.location = "https://larsendt.com";
            },
            error: function(err) {
                window.location = "https://larsendt.com";
            }
        });
    },
    render: function() {
        return (
            <div id="experiment-declined">
                <div className="instruction-text">
                    Sorry, but you need to accept the agreement to continue with 
                    this HIT! 
                </div>

                <div className="button-wrapper">
                    <div id="return-to-turk" className="generic-button"
                         onClick={this.goToAmazon} >
                        Return to Amazon
                    </div>

                    <div id="reset-instructions" className="generic-button"
                        onClick={this.props.resetInstructions}>
                        Back to Instructions
                    </div>
                </div>
            </div>
        );
    }
});
