var StimulusComponent = React.createClass({
    submitRating: function(event) {
        console.log(event);
        var word = this.props.word;
        var rating = 5;
        var time = new Date().getTime();
        this.props.submitRating({word: word, rating: rating, time: time});
    },
    render: function() {
        return (
            <div id="stimulus-wrapper">
                <div id="stimulus-word">Potato</div>
                <div id="stimulus-rating">
                    <div className="rating-label">Least Similar</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>1</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>2</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>3</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>4</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>5</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>6</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>7</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>8</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>9</div>
                    <div className="generic-button rating-button" onClick={this.submitRating}>10</div>
                    <div className="rating-label">Most Similar</div>
                </div>
            </div>
        );
    }
});
