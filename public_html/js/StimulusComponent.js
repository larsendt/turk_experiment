var StimulusComponent = React.createClass({
    getInitialState: function() {
        return {
            stim_blocks: {},
            cur_stim: "warmup",
            stim_idx: 0,
            rating_blocks: {},
            complete: false,
            error: null,
            remaining: 0,
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
        var word = this.state.stim_blocks[this.state.cur_stim][this.state.stim_idx];
        var rating = $(event.target).text();
        var time = new Date().getTime();
        var obj = {word: word, rating: rating, time: time};
        
        var rating_blocks = this.state.rating_blocks;
        var cur_stim = this.state.cur_stim;
        if(!(cur_stim in rating_blocks)) {
            rating_blocks[cur_stim] = [];
        }

        rating_blocks[cur_stim].push(obj);
        console.log(rating_blocks);

        var cur_stim = this.state.cur_stim;
        var stim_idx = this.state.stim_idx + 1;
        if(stim_idx >= this.state.stim_blocks[cur_stim].length) {
            stim_idx = 0;
            if(cur_stim == "warmup") {
                cur_stim = "block1";
            }
            else if(cur_stim == "block1") {
                cur_stim = "block2";
            }
            else if(cur_stim == "block2") {
                cur_stim = "block3";
            }
            else if(cur_stim == "block3") {
                cur_stim = "block4";
            }
            else if(cur_stim == "block4") {
                cur_stim = "block5";
            }
            else if(cur_stim == "block5") {
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
                       cur_stim:cur_stim,
                       stim_idx:stim_idx,
                       remaining: this.state.remaining-1});
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
        if(this.state.stim_blocks[this.state.cur_stim]) {
            word = this.state.stim_blocks[this.state.cur_stim][this.state.stim_idx];
        }

        var remaining = this.state.remaining;
        if(remaining == 1) {
            remaining = "Last one!";
        }
        else {
            remaining = remaining + " remaining";
        }

        return (
            <div id="stimulus-wrapper">
                <div className="prompt-text">How similar is this word to English?</div>
                <div id="stimulus-word">{word}</div>
                <div id="stimulus-rating">
                    <div className="rating-label">Least Similar</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>1</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>2</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>3</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>4</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>5</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>6</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>7</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>8</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>9</div>
                    <div className="generic-button rating-button" onClick={this.addRating}>10</div>
                    <div className="rating-label">Most Similar</div>
                </div>
                <div id="stimulus-remaining">{remaining}</div>
            </div>
        );
    }
});
