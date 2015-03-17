TRANSITION_SPEED = 500;

var StimulusComponent = React.createClass({
    getInitialState: function() {
        return {
            stim_blocks: {},
            stim_block: "warmup",
            stim_idx: 0,
            rating_blocks: {},
            complete: false,
            error: null,
            remaining: 0,
            transition: false,
        };
    },
    componentWillMount: function() {
        $.ajax({
            url: "/api/words",
            dataType: "json",
            success: function(data) {
                console.log(data);
                var count = 0;
                for(key in data) {
                    for(i in data[key]) {
                        count += 1;
                    }
                }

                this.setState({stim_blocks: data, remaining: count});
            }.bind(this),
            error: function(err) {
                this.setState({error: "Failed to fetch words!"});
            }.bind(this),
        });
    },
    addRating: function(event) {
        if(this.state.transition) {
            return;
        }

        var word = this.state.stim_blocks[this.state.stim_block][this.state.stim_idx];
        var rating = $(event.target).text();
        var time = new Date().getTime();
        var obj = {word: word, rating: rating, time: time};
        
        var rating_blocks = this.state.rating_blocks;
        var stim_block = this.state.stim_block;
        if(!(stim_block in rating_blocks)) {
            rating_blocks[stim_block] = [];
        }

        rating_blocks[stim_block].push(obj);
        console.log(rating_blocks);

        var stim_block = this.state.stim_block;
        var stim_idx = this.state.stim_idx + 1;
        if(stim_idx >= this.state.stim_blocks[stim_block].length) {
            stim_idx = 0;
            if(stim_block == "warmup") {
                stim_block = "block1";
            }
            else if(stim_block == "block1") {
                stim_block = "block2";
            }
            else if(stim_block == "block2") {
                stim_block = "block3";
            }
            else if(stim_block == "block3") {
                stim_block = "block4";
            }
            else if(stim_block == "block4") {
                stim_block = "block5";
            }
            else if(stim_block == "block5") {
                this.submitRatings(this.state.rating_blocks);
                this.setState({complete: true});
                return;
            }
            else {
                console.error("This shouldn't happen");
                this.setState({error: "Something unexpected happened..."});
            }
        }

        this.setState({rating_blocks:rating_blocks, 
                       remaining: this.state.remaining-1,
                       transition: true,
                       stim_idx: stim_idx,
                       stim_block: stim_block});

        setTimeout(this.finishTransition, TRANSITION_SPEED);
    },
    finishTransition: function() {
        this.setState({transition: false});
    },
    submitRatings: function(ratings) {
        console.log(ratings);
        var obj = {ratings: ratings, blur_times: this.props.blurTimes};
        console.log(obj);
        var data = {data: JSON.stringify(obj)};
        $.ajax({
            url: "/api/words/submit_response",
            method: "POST",
            data: data,
            success: function(data) {
                this.props.finishExperiment();
            }.bind(this),
            error: function(data) {
                this.props.experimentSubmitFailed();
            }
        });
    },
    render: function() {
        var word = "";
        if(this.state.stim_blocks[this.state.stim_block]) {
            word = this.state.stim_blocks[this.state.stim_block][this.state.stim_idx];
        }

        var remaining = this.state.remaining;
        if(remaining == 1) {
            remaining = "Last one!";
        }
        else {
            remaining = remaining + " remaining";
        }
        
        var buttons = [];
        for(var i = 1; i <= 10; i++) {
            var className = "generic-button rating-button";
            if(this.state.transition) {
                className += " rating-disabled";
            }
            buttons.push(<div className={className}
                              onClick={this.addRating}
                              key={i}>{i}</div>);
        }

        return (
            <div id="stimulus-wrapper">
                <div className="prompt-text">How similar is this word to English?</div>
                <div id="stimulus-word">{word}</div>
                <div id="stimulus-rating">
                    <div className="rating-label">Least Similar</div>
                    {buttons}
                    <div className="rating-label">Most Similar</div>
                </div>
                <div id="stimulus-remaining">{remaining}</div>
            </div>
        );
    }
});
