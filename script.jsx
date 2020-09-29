class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = { createType : "" }
        this.btnCreate = React.createRef();
    }

    createClicked(type){
        this.setState( { createType : type } )
    }

    render(){
        let body

        switch (this.state.createType){
            case "":
                body = (
                        <button onClick={ ()=> { this.createClicked("Choose") } }>
                            Create new Character
                        </button>
                )
                break;

            case "Choose":
                body = (
                    <div>
                        <button onClick = { ()=> { this.createClicked("Answers") } } >Create by Answers</button>
                        <button onClick = { ()=> { this.createClicked("Numbers") } } >Create by Numbers</button>
                    </div>
                )
                break;

            case "Numbers":
                body = <CreateCharByNumbers />
                break;
            } 


        return(
            <div>
                {body}
            </div>
        )
    }
}


class CreateCharByNumbers extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            alignment : 0, 
            str : 3,
            agi : 1,
            int : 1,
            bonusStr : 1,
            bonusAgi : 0,
            bonusInt : 0,
            total : 6
        }
    }

    changeAlignment(e){
        this.setState( { alignment : e.target.value  } )
        console.log(e.target.value)
    }

    changeStatus(atr , stat){
        const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

        let val = clampNumber( this.state[atr] + stat , 1 , 16 )

        this.setState( { [atr] : val } )
    }

    render(){
        return(
            <div>
                <div>
                    <label htmlFor="race">Choose a Race:</label>
                    <select name="race" id="race">
                        <option value="human">Human</option>
                        <option value="elf">Elf</option>
                        <option value="dwarf">Dwarf</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="class">Choose a Class:</label>
                    <select name="class" id="class">
                        <option value="warrior">Warrior</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Mage">Mage</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="alignment">Choose Alignment:</label>
                    <div>
                        <span>Evil</span>
                        <span>Neutral</span>
                        <span>Good</span>
                    </div>
                    
                    <input
                    onChange = { (e)=> { this.changeAlignment(e) } } 
                    type="range" id="alignment" name="alignment"
                    value={this.state.alignment} min="-1" max="1" />
                </div>

                <div>
                    { 
                        (this.state.agi + this.state.str + this.state.int) > 16
                        ?
                        <div style={{color : "red"}}>
                            Total Points: { this.state.agi + this.state.str + this.state.int } / 16
                        </div>
                        :
                        <div>
                            Total Points: { this.state.agi + this.state.str + this.state.int } / 16
                        </div>
                    }

                    <label>Strengh</label>
                    <div>
                        <button onClick = { () => { this.changeStatus("str",-1) } }>-</button>
                        
                        <span>{this.state.str}</span>
                        {this.state.bonusStr > 0 && <span>(+{this.state.bonusStr})</span> }
                        <button onClick = { () => { this.changeStatus("str",1) } }>+</button>
                    </div>

                    <label>Agility</label>
                    <div>
                        <button onClick = { () => { this.changeStatus("agi",-1) } }>-</button>

                        <span>{this.state.agi}</span>
                        {this.state.bonusAgi > 0 && <span>(+{this.state.bonusAgi})</span> }
                        <button onClick = { () => { this.changeStatus("agi",1) } }>+</button>
                    </div>

                    <label>Intelligence</label>
                    <div>
                        <button onClick = { () => { this.changeStatus("int",-1) } }>-</button>
                        
                        <span>{this.state.int}</span>
                        {this.state.bonusInt > 0 && <span>(+{this.state.bonusInt})</span> }
                        <button onClick = { () => { this.changeStatus("int",1) } }>+</button>
                    </div>

                </div>
            </div>
        )
    }
}


class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <Main />
    }
}

ReactDOM.render(
    <App /> , document.getElementById("root")
)