
let {createApp}= Vue
const appdos= createApp({

    data(){

        return{
            
            parms : null,
            id : null,
            persona : [],
            change: null
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then((dato)=>{
                this.parms = new URLSearchParams(location.search)
                this.id = this.parms.get("id")
                this.persona = dato.events.find(elemento => elemento._id == this.id)
                this.change= this.persona.assistance ? "assistance" : "estimate"
            })
            
    }
})
appdos.mount("#detalies")