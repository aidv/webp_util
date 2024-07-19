module.exports = class img2webp {
    constructor(){

    }

    convert(src, dst){
        return new Promise((resolve, reject)=>{
            const result = webp.cwebp(src, dst, '-q 100')
            result.then((response) => {
                resolve()
            })
        })
    }
}