var InstructionComponent = React.createClass({
    getInitialState: function() {
        return {
            instructions: [],
            cur_instr: 0,
            error: null,
        };
    },
    componentWillMount: function() {
        $.ajax({
            url: "/api/instructions",
            dataType: "json",
            success: function(data) {
                this.setState({instructions: data});
            }.bind(this),
            error: function(err) {
                this.setState({error: "Failed to fetch instructions!"});
            }.bind(this),
        });
    },
    previousInstruction: function(event) {
        var prev = this.state.cur_instr - 1;
        if(prev >= 0) {
            this.setState({cur_instr: prev});
        }
        event.preventDefault();
    },
    nextInstruction: function(event) {
        var next = this.state.cur_instr + 1;
        if(next < this.state.instructions.length) {
            this.setState({cur_instr: next});
        }
        event.preventDefault();
    },
    accept: function(event) {
        this.props.acceptInstructions();
        event.preventDefault();
    },
    decline: function(event) {
        this.props.declineInstructions();
        event.preventDefault();
    },
    render: function() {
        var err_elem = <span></span>;
        if(this.state.error != null) {
            err_elem = <div className="error">{this.state.error}</div>;
        }

        var instr_elems = [];
        if(this.state.instructions.length > 0) {
            instr = this.state.instructions[this.state.cur_instr];
            lines = instr.split("\n\n");
            for(var i in lines) {
                instr_elems.push(<p key={i}>{lines[i]}</p>);
            }
        }

        var prev_style = {};
        if(this.state.cur_instr <= 0) {
            prev_style.backgroundColor = "#ccc";
            prev_style.border = "1px solid #777";
            prev_style.color = "#777";
        }

        var next_style = {};
        var accept_style = {};
        var decline_style = {};
        if(this.state.instructions.length > 0 && this.state.cur_instr >= this.state.instructions.length-1) {
            next_style.backgroundColor = "#ccc";
            next_style.border = "1px solid #777";
            next_style.color = "#777";
        }
        else {
            accept_style.display = "none";
            decline_style.display = "none";
        }

        var prev_elem = (
            <div className="instruction-button generic-button"
                 onClick={this.previousInstruction} style={prev_style}>
                <span><i className="fa fa-arrow-left" /> Prev</span>
            </div>
        );

        var next_elem = (
            <div className="instruction-button generic-button"
                 onClick={this.nextInstruction} style={next_style}>
                <span>Next <i className="fa fa-arrow-right" /></span>
            </div>
        );

        var decline_elem = (
            <div className="instruction-button generic-button"
                 id="decline-button"
                 onClick={this.decline} style={decline_style}>
                <span>Decline <i className="fa fa-times" /></span>
            </div>
        );

        var accept_elem = (
            <div className="instruction-button generic-button"
                id="accept-button"
                 onClick={this.accept} style={accept_style}>
                <span>Accept <i className="fa fa-check" /></span>
            </div>
        );

        console.log(instr_elems);

        return (
            <div className="instruction-wrapper">
                <div className="instruction-text">
                    <img id="logo" src="img/logo.png" />
                    {err_elem}
                    {instr_elems}
                </div>
                <div className="button-wrapper">
                     {decline_elem}
                     {accept_elem}
                     {prev_elem}
                     {next_elem}
                </div>
            </div>
        );
    },
});
