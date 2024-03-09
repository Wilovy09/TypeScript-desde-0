# TypeScript desde 0

[Documentacón](https://www.typescriptlang.org/) | [Playground](https://www.typescriptlang.org/play#code/Q)

Recomiendo mucho ver el [video de donde se saca la información](https://youtu.be/fUgxxhI_bvc?si=Em3curlWCxzUd7z6), ya que ahi se explica de una forma mas profunda cada cosa.

## ¿Qué es TypeScript?

> [!NOTE]
> TypeScript fue publicado en 2012 por Microsoft.

TypeScript es JavaScript con sintaxys para tipos, incluye todo lo que tiene JavaScript pero añade tipos estáticos.

- Tu código JavaScript deberia funcionar en TypeScript.
- No funciona en tiempo de ejecución.
- Lo que llega a tu navegador es código JavaScript, quiere decir que tu código TypeScript se compilara a JavaScript.

### Ventajas

- Añade un grado de seguridad con los tipos de datos.
- Leguaje de programación de `tipado fuerte` y `estatico`.

### Desventajas

- No te hara escribir menos código.

## Como ejecutar TypeScript

### TypeScrip Playgroud

En el [Playground](https://www.typescriptlang.org/play#code/Q) podemos poner nuestro código TS (TypeScript) y ejecutarlo sin necesidad de intalar nada.

### Deno

- [Deno](https://deno.com/) es una alternativa a [NodeJS](https://nodejs.org/en), con la diferencia de que este te permite compilar código [TypeScript](https://www.typescriptlang.org/).

## Ejemplo #1

1. Creamos nuestro archivo `index.ts`
2. Agregamos la siguiente linea:

```ts
function suma (a, b){ // Suma 2 numeros
    return a + b
}

console.log(suma(1,1))
```

3. Usamos el comando `deno run index.ts`

```bash
deno run index.ts
```

4. Resultado:

```bash
$ deno run index.ts
>> 2
```

Todo parece correcto, ¿verdad?.

Pero ¿que pasa si en vez de pasarle 2 numeros le pasamos un string?

```ts
function suma (a, b){
    return a + b
}

console.log(suma("Hola",1))
```

```bash
$ deno run index.ts
>> Hola1
```

Creo que ya vimos para que sirve TypeScript, pero ¿como lo solucionamos con TS?

¡FACIL! solo tenemos que agregar `: TIPO_DE_DATO` al lado de lo que queremos tipar.

```ts
//             a es number, b es number
function suma (a: number ,  b: number){
    return a + b
}

console.log(suma(1,1))
```

```bash
$ deno run index.ts
>> 2
```

Realmente, el código seguira funcionando igual que antes, pero con la gran diferencia de que ahora en tu editor de código aparecera un error cuando intentes sumar un string con un numero.

```error
No se puede asignar un argumento de tipo "string" al parámetro de tipo "number".
```

## Como añadir tipado

> [!TIP]
> Mientras menos tipado tenga tu código, mejor.

TypeScript agrega tipos de datos en base de inferencia.

Pero tambien podemos agregar el tipo usando `: TIPO_DE_DATO`

```ts
const nombre: string = "Wilovy"
```

### ¿Qué pasa cuando no puede inferir que tipo de dato es?

Si esto pasa, TS le pondra el tipo `any`.

#### Desventajas de tener el tipo `any`

- Pierdes el autocompletado (`ctrl + space` en [VSCode](https://code.visualstudio.com/)).

Basicamente le estamos diciendo que ingnore el tipado de TS. Es decir si es un `string` no lo trates como `string` y asi con cada tipo de dato.

Tambien puede tener el tipo `uknown`.

Basicamente TS dice no se cual es el tipo.

## Funciones

La inferencia de TS tiene un limite, no hace magia

```ts
function saludar(name){
    console.log(`Hola ${name}`)
}
```

El parámetro "name" tiene un tipo "any" de forma implícita, pero se puede inferir un tipo más adecuado a partir del uso.

### Solución

Le decimos el tipo de dato que esperamos.

```ts
function saludar(name: string){
    console.log(`Hola ${name}`)
}
```

## Funciones con objetos

```ts
function saludar({ name, age }){
    console.log(`Hola ${name}, tienes ${age} años`)
}
```

Aqui el problema esta en que entra en colisión con la sintaxis de JS, ya que JS te permite renombrar una propiedad de un objeto usando `:`.

### Forma #1 de solucionarlo

```ts
function saludar({ name, age }: { name:string, age:number }){
    console.log(`Hola ${name}, tienes ${age} años`)
}
```

### Forma #2 de solucionarlo

```ts
function saludar(persona: { name: string, age: number }){
    // Lo malo es que te obliga a sacar name y age de persona para poder usarlos
    const { name, age } = persona
    
    console.log(`Hola ${name}, tienes ${age} años`)
}
```

## Tipar el return

```ts
function saludar({ name, age }: {name: string, age: number}){
    console.log(`Hola ${name}, tienes ${age} años`)
    return age
}
```

Si hacemos `hover` al nombre de nuestra función nos aparecera este recuadro.

```ts
function saludar({ name, age }: {
    name: string;
    age: number;
// : number (esto indica que nos devolvera un numero 
//  ya que es el valor que pedimos retornar)
}): number
```

TS infiere que es un valor de tipo number por nuestro `return age`.

### Pero

Podemos decirle que tipo de datos queremos que regrese usando:

```ts
//                                                           Aqui decimos que tipo de datos queremos devuelta
function saludar( { name, age }: {name: string, age: number}): TIPO_DE_DATO{
    console.log(`Hola ${name}, tienes ${age} años`)
    return age
}
```

## Funciones como parametro

Aqui tenemos 2 errores, tenemos `name` y `fn` con valores `any`.

```ts
const sayHiFromFuntion = (fn) => {
    return fn("Wilovy")
}

sayHiFromFuntion((name)=>{
    console.log(`Hola ${name}`)
})
```

Para solucionarlo tenemos que hacer lo siguiente:

```ts
//                        fn espera una funcion con un parametro name
//                        de tipo string y regresa un void
const sayHiFromFuntion = (fn: (name:string) => void) => {
    return fn("Wilovy")
}

sayHiFromFuntion((name: string)=>{
    console.log(`Hola ${name}`)
})
```

`Void` se usa cuando una función no tiene un `return`, para cuando no devuelve nada.
