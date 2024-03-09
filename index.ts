const sayHiFromFuntion = (fn: (name:string) => void) => {
    return fn("Wilovy")
}

sayHiFromFuntion((name: string)=>{
    console.log(`Hola ${name}`)
})
