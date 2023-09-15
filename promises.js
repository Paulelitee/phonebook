export const add = (num) => {
    console.log(num * num) 
}

const param = process.argv[2]
add(param)