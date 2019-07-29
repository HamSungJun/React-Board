let app = require('express')()

app.get('*',(req,res) => {
    res.sendFile('./index.html');
})

app.listen(80,()=>{
    console.log(80);
})